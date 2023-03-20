import { useEffect, useState } from 'react';
import styles from './GameModal.module.css';
import Modal from 'react-modal';
import ActionButton from '../ActionButton';
import NeonText from '../NeonText';
import Blackjack from './BlackJack';

const customStyles = {
	content: {
		backgroundColor: 'black',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		height: '100vh',
		width: '100vw',
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

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

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
						Close
					</ActionButton>
					{!showGame ? (
						<div className={styles.inputNameContainer}>
							<div className={styles.enterNameContainer}>
								<NeonText content="Enter your name to play a game of Blackjack!" />
							</div>
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
							</div>
						</div>
					) : null}
				</div>
				{showGame && name ? <Blackjack name={name} /> : null}
			</Modal>
		</div>
	);
}
