import { useState } from 'react';
import styles from './GameModal.module.css';
import Modal from 'react-modal';
import ActionButton from '../ActionButton';
import BlackJack from './BlackJack';
import NeonText from '../NeonText';

const customStyles = {
	content: {
		backgroundColor: 'black',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		height: '90vh',
		width: '90vw',
	},
};

export default function GameModal({
	isModalOpen,
	setIsModalOpen,
}: {
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
}) {
	const [name, setName] = useState<string>('');
	const [showGame, setShowGame] = useState<boolean>(false);
	return (
		<div>
			<Modal
				ariaHideApp={false}
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				style={customStyles}
			>
				<div className={styles.modalContent}>
					<ActionButton
						className={styles.closeButton}
						onClick={() => setIsModalOpen(!isModalOpen)}
					>
						X
					</ActionButton>
					<br />
					<NeonText content="Enter your name to play a game of Blackjack!" />
					<br />
					<br />
					<input
						className={styles.nameInput}
						disabled={showGame}
						autoFocus
						type="text"
						placeholder="Please enter a name.."
						onKeyDown={(e) => e.key === 'Enter' && setShowGame(true)}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className={styles.buttonContainer}>
						<ActionButton
							disabled={name === '' || showGame}
							className={styles.startButton}
							onClick={() => setShowGame(true)}
						>
							Start Game
						</ActionButton>
						<ActionButton
							className={styles.closeButton}
							onClick={() => setIsModalOpen(!isModalOpen)}
						>
							X
						</ActionButton>
					</div>
				</div>
				{showGame && name ? <BlackJack name={name} /> : null}
			</Modal>
		</div>
	);
}
