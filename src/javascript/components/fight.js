import controls from '../../constants/controls';

const criticalHitCooldown = 10000;
let lastCriticalHitTime = 0;

export async function fight(firstFighter, secondFighter) {
    firstFighter.initialHealth = firstFighter.health;
    secondFighter.initialHealth = secondFighter.health;

    let playerOneCombo = [];
    let playerTwoCombo = [];

    return new Promise(resolve => {
        document.addEventListener('keydown', handleKeyPress);

        function handleKeyPress(event) {
            const { code } = event;
            const currentTime = new Date().getTime();

            if (currentTime - lastCriticalHitTime >= criticalHitCooldown) {
                if (code === controls.PlayerOneAttack) {
                    console.log('ATTACK')
                    attack(firstFighter, secondFighter);
                } else if (code === controls.PlayerTwoAttack) {
                    attack(secondFighter, firstFighter);
                } else if (code === controls.PlayerOneBlock) {
                    console.log('BLOCK')
                    firstFighter.blocking = true;
                } else if (code === controls.PlayerTwoBlock) {
                    console.log('BLOCK')
                    secondFighter.blocking = true;
                } else if (
                    controls.PlayerOneCriticalHitCombination.includes(code)
                ) {
                    playerOneCombo.push(code);
                    if (playerOneCombo.length === controls.PlayerOneCriticalHitCombination.length) {
                        const comboMatches = playerOneCombo.every((key, index) => key === controls.PlayerOneCriticalHitCombination[index]);
                        if (comboMatches) {
                            executeCriticalHit(firstFighter, secondFighter);
                        }
                        playerOneCombo = [];
                    }
                } else if (
                    controls.PlayerTwoCriticalHitCombination.includes(code)
                ) {
                    playerTwoCombo.push(code);
                    if (playerTwoCombo.length === controls.PlayerTwoCriticalHitCombination.length) {
                        const comboMatches = playerTwoCombo.every((key, index) => key === controls.PlayerTwoCriticalHitCombination[index]);
                        if (comboMatches) {
                            executeCriticalHit(secondFighter, firstFighter);
                        }
                        playerTwoCombo = [];
                    }
                }

                updateHealthBar(firstFighter, 'left');
                updateHealthBar(secondFighter, 'right');

                const firstFighterWins = firstFighter.health > 0 && secondFighter.health <= 0;
                const secondFighterWins = secondFighter.health > 0 && firstFighter.health <= 0;

                if (firstFighterWins || secondFighterWins) {
                    document.removeEventListener('keydown', handleKeyPress);
                    resolve(firstFighterWins ? firstFighter : secondFighter);
                }
            }
        }
    });
}

export function attack(attacker, defender) {
    const damage = getDamage(attacker, defender);
    defender.health -= damage;
}

export function executeCriticalHit(attacker, defender) {
    const damage = attacker.attack * 2;
    defender.health -= damage;
    defender.blocking = false;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    if (defender.blocking) {
        defender.blocking = false;
        return 0;
    }
    return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
    const criticalHitChance = Math.floor(Math.random() * 2) + 1;
    const power = fighter.attack * criticalHitChance * (fighter.critical ? 2 : 1);
    return power;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.floor(Math.random() * 2) + 1;
    const power = fighter.defense * dodgeChance;
    return power;
}

function updateHealthBar(fighter, position) {
    const healthBar = document.getElementById(`${position}-fighter-indicator`);

    if (healthBar) {
        const percentage = (fighter.health / fighter.initialHealth) * 100;
        healthBar.style.width = `${percentage}%`;
    }
}
