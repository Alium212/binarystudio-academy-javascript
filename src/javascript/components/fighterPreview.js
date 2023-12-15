import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    if (!fighter) {
        return true;
    }
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const fighterImage = createFighterImage(fighter);
    const fighterName = createElement({
        tagName: 'div',
        className: 'fighter-preview___name',
        innerText: fighter.name
    });

    fighterElement.append(fighterImage, fighterName);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
