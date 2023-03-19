import { useState } from 'react';
import ActionButton from '../ActionButton';
import GameModal from './GameModal';

export default function StartBlackJackButton() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<ActionButton onClick={() => setIsModalOpen((prev) => !prev)}>
				Bored already? Try Blackjack!
			</ActionButton>
			{isModalOpen ? (
				<GameModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			) : null}
		</div>
	);
}
