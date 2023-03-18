import { useEffect } from 'react';
import styles from './BlackJack.module.css';
import { useGameStore } from './game.store';
import { BLACKJACK_SCORE } from './constants';
import ActionButton from '../ActionButton';
import { Deck } from './Deck';

export default function BlackJack({ name }: { name: string }) {
	const {
		gameStatus,
		result,
		player,
		dealer,
		deck,
		setGameStatus,
		setResult,
		setPlayer,
		setDealer,
		setDeck,
	} = useGameStore((state) => ({
		gameStatus: state.gameStatus,
		result: state.result,
		player: state.player,
		dealer: state.dealer,
		deck: state.deck,
		setGameStatus: state.setGameStatus,
		setResult: state.setResult,
		setPlayer: state.setPlayer,
		setDealer: state.setDealer,
		setDeck: state.setDeck,
	}));

	useEffect(() => {
		const [first, second] = deck.cards.splice(0, 2);
		setPlayer({
			...player,
			cards: [first],
			score: first.value,
		});
		setDealer({
			...dealer,
			cards: [second],
			score: second.value,
		});
		setDeck({
			...deck,
			cards: deck.cards.splice(2),
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const shouldUserHitButtonDisable =
		gameStatus !== 'In Progress' || player.didBust || player.isStanding;

	const shouldUserStandButtonDisable =
		gameStatus !== 'In Progress' ||
		player.didBust ||
		player.isStanding ||
		(dealer.isStanding && dealer.score > player.score) ||
		player.score < dealer.score;

	const shouldUserNextButtonEnable =
		gameStatus === 'In Progress' && player.isStanding;

	console.log(gameStatus !== 'In Progress');
	console.log(player.isStanding);

	const handleUserHit = () => {
		const [playerCard, dealerCard] = deck.cards.splice(0, 2);
		const playerIsStanding = player.isStanding;
		const dealerIsStanding = dealer.isStanding;

		/**
		 * Handling player busting
		 */
		if (
			!playerIsStanding &&
			player.score + playerCard.value > BLACKJACK_SCORE
		) {
			setPlayer({
				...player,
				cards: [...player.cards, playerCard],
				score: player.score + playerCard.value,
				didBust: true,
			});

			setGameStatus('Game Over!');
			setResult('Dealer Win!');
			return;
		}

		/**
		 * Handling dealer busting
		 */
		if (
			!dealerIsStanding &&
			dealer.score + dealerCard.value > BLACKJACK_SCORE
		) {
			setDealer({
				...dealer,
				cards: [...dealer.cards, dealerCard],
				score: dealer.score + dealerCard.value,
				didBust: true,
			});
			setGameStatus('Game Over!');
			setResult('Player Win!');
			return;
		}

		/**
		 * Handling player hitting
		 */
		if (!playerIsStanding && player.score < BLACKJACK_SCORE) {
			const IS_STAND_SCORE = player.score + playerCard.value === 21;
			const newPlayerScore = player.score + playerCard.value;
			setPlayer({
				...player,
				cards: [...player.cards, playerCard],
				score: newPlayerScore,
				isStanding: IS_STAND_SCORE,
			});

			if (newPlayerScore > dealer.score && dealerIsStanding) {
				setGameStatus('Game Over!');
				setResult('Player Win!');
				return;
			}
		}

		/**
		 * Handling dealer hitting
		 */
		if (!dealerIsStanding && dealer.score < BLACKJACK_SCORE) {
			const newDealerScore = dealer.score + dealerCard.value;
			const IS_STAND_SCORE = newDealerScore >= 17 && !playerIsStanding;
			setDealer({
				...dealer,
				cards: [...dealer.cards, dealerCard],
				score: dealer.score + dealerCard.value,
				isStanding: IS_STAND_SCORE,
			});

			if (newDealerScore > player.score && playerIsStanding) {
				setGameStatus('Game Over!');
				setResult('Dealer Win!');
				return;
			}
		}

		if (playerIsStanding && dealerIsStanding) {
			if (player.score > dealer.score) {
				setGameStatus('Game Over!');
				setResult('Player Win!');
				return;
			} else if (player.score < dealer.score) {
				setGameStatus('Game Over!');
				setResult('Dealer Win!');
				return;
			}
		}

		/**
		 * Handling player tie
		 */
		if (playerIsStanding && dealerIsStanding && player.score === dealer.score) {
			setGameStatus('Game Over!');
			setResult('Tie');
		}

		setDeck({
			...deck,
			cards: deck.cards,
		});
	};

	const handlePlayerStand = () => {
		setPlayer({
			...player,
			isStanding: true,
		});
	};

	const handleResetGame = () => {
		setGameStatus('In Progress');
		setResult('None');
		const newDeck = new Deck();
		const [first, second] = newDeck.cards.splice(0, 2);
		setDeck(newDeck);
		setPlayer({
			...player,
			cards: [first],
			score: first.value,
			isStanding: false,
			didBust: false,
		});
		setDealer({
			...dealer,
			cards: [second],
			score: second.value,
			isStanding: false,
			didBust: false,
		});
	};

	return (
		<div className={styles.blackJackContainer}>
			<h2>Blackjack</h2>
			<p>Game Status: {gameStatus}</p>
			<p>Result: {result}</p>
			<h2>
				Player: {name}
				{player.isStanding ? ' (Standing)' : null}
			</h2>
			<p style={{ display: 'flex', gap: '1rem' }}>
				{name} Cards:{' '}
				{player.cards.map((card) => (
					<span key={`${card.name}${card.suit}${card.value}`}>
						{card.value} of {card.suit}
					</span>
				))}
			</p>
			<p>
				{name} Score: {player.score}
			</p>

			<h2>
				Dealer: Deadeye Duncan
				{dealer.isStanding ? ' (Standing)' : null}
			</h2>
			<p style={{ display: 'flex', gap: '1rem' }}>
				Dealer Cards:{' '}
				{dealer.cards.map((card) => (
					<span key={`${card.name}${card.suit}${card.value}`}>
						{card.value} of {card.suit}
					</span>
				))}
			</p>
			<p>Dealer Score: {dealer.score}</p>

			<div className={styles.gameButtonContainer}>
				<ActionButton
					disabled={shouldUserHitButtonDisable}
					onClick={handleUserHit}
				>
					Hit
				</ActionButton>
				<ActionButton
					disabled={shouldUserStandButtonDisable}
					onClick={handlePlayerStand}
				>
					Stand
				</ActionButton>
				<ActionButton
					disabled={!shouldUserNextButtonEnable}
					onClick={handleUserHit}
				>
					Next
				</ActionButton>
				{gameStatus === 'Game Over!' ? (
					<ActionButton
						className={styles.resetGameButton}
						onClick={handleResetGame}
					>
						Reset
					</ActionButton>
				) : null}
			</div>
		</div>
	);
}
