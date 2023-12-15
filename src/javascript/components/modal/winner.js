import showModal from './modal';
import App from '../../app';

export default function showWinnerModal(fighter) {
    const title = fighter ? `${fighter.name} wins!` : 'It\'s a draw!';
    const bodyElement = document.createElement('div');
    bodyElement.innerText = fighter ? `${fighter.name} is the winner!` : 'It\'s a draw!';

    showModal({
        title,
        bodyElement,
        onClose: () => {}
    });
}
