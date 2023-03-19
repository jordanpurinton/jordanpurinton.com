import { useCallback, useEffect } from 'react';
import styles from './BlackJack.module.css';
import { BLACKJACK_SCORE, DEALER_NAME } from './constants';
import ActionButton from '../ActionButton';
import { Deck } from './Deck';
import { useGameStore } from './game.store';
import { getSubtitle, handleAces } from './util';
import gameLog from './gameLog';

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
			name,
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
		});

		return () => {
			setGameStatus('In Progress');
			setResult('None');
			setPlayer({
				name: '',
				cards: [],
				score: 0,
				isStanding: false,
				didBust: false,
			});
			setDealer({
				name: '',
				cards: [],
				score: 0,
				isStanding: false,
				didBust: false,
			});
			setDeck(new Deck());
		};
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

	const handleUserHit = useCallback(() => {
		const [playerCard, dealerCard] = deck.cards.splice(0, 2);
		const playerIsStanding = player.isStanding;
		const dealerIsStanding = dealer.isStanding;

		/**
		 * Handling player tie
		 */
		if (playerIsStanding && dealerIsStanding && player.score === dealer.score) {
			setGameStatus('Game Over!');
			setResult('Tie');
			return;
		}

		/**
		 * Handling player hitting
		 */
		const { newCards: newPlayerCards, newScore: newPlayerScore } = handleAces(
			player,
			playerCard,
			playerIsStanding
		);

		const SHOULD_PLAYER_STAND =
			newPlayerScore === BLACKJACK_SCORE || playerIsStanding;

		/**
		 * Handling dealer hitting
		 */
		const { newCards: newDealerCards, newScore: newDealerScore } = handleAces(
			dealer,
			dealerCard,
			dealerIsStanding
		);

		const SHOULD_DEALER_STAND =
			(newDealerScore >= 17 &&
				!dealerIsStanding &&
				newPlayerScore <= newDealerScore) ||
			dealerIsStanding;

		setPlayer({
			...player,
			cards: newPlayerCards,
			score: newPlayerScore,
			isStanding: SHOULD_PLAYER_STAND,
		});

		setDealer({
			...dealer,
			cards: newDealerCards,
			score: newDealerScore,
			isStanding: SHOULD_DEALER_STAND,
		});

		/**
		 * Handling player busting
		 */
		if (!playerIsStanding && newPlayerScore > BLACKJACK_SCORE) {
			setPlayer({
				...player,
				cards: newPlayerCards,
				score: newPlayerScore,
				didBust: true,
			});
			setGameStatus('Game Over!');
			setResult('Dealer Win!');
			return;
		}

		/**
		 * Handling dealer busting
		 */
		if (!dealerIsStanding && newDealerScore > BLACKJACK_SCORE) {
			setDealer({
				...dealer,
				cards: newDealerCards,
				score: newDealerScore,
				didBust: true,
			});
			setGameStatus('Game Over!');
			setResult('Player Win!');
			return;
		}

		if (newPlayerScore > newDealerScore && dealerIsStanding) {
			setGameStatus('Game Over!');
			setResult('Player Win!');
			return;
		}

		if (newDealerScore > newPlayerScore && playerIsStanding) {
			setGameStatus('Game Over!');
			setResult('Dealer Win!');
			return;
		}

		if (playerIsStanding && dealerIsStanding) {
			if (newPlayerScore > newDealerScore) {
				setGameStatus('Game Over!');
				setResult('Player Win!');
				return;
			} else if (newPlayerScore < newDealerScore) {
				setGameStatus('Game Over!');
				setResult('Dealer Win!');
				return;
			}
		}

		setDeck({
			...deck,
			cards: deck.cards,
		});
	}, [
		deck,
		player,
		dealer,
		setPlayer,
		setDealer,
		setDeck,
		setGameStatus,
		setResult,
	]);

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

	if (gameStatus === 'In Progress') {
		gameLog(JSON.stringify(player, null, 2));
		gameLog(JSON.stringify(dealer, null, 2));
		gameLog(deck.cards.length.toString());
	}

	return (
		<div className={styles.blackJackContainer}>
			<h2>Blackjack</h2>
			<p>Game Status: {gameStatus}</p>
			<p>Result: {result}</p>
			<h2>
				Player: {name}
				{getSubtitle(player, result)}
			</h2>
			<p style={{ display: 'flex', gap: '1rem' }}>{name} Cards: </p>
			<p>
				{player.cards.map((card) => (
					<span key={`${card.name}${card.suit}${card.value}`}>
						{card.name} of {card.suit} ({card.value}){' '}
					</span>
				))}
			</p>
			<p>
				{name} Score: {player.score}
			</p>

			<h2>
				Dealer: {dealer.name}
				{getSubtitle(dealer, result)}
			</h2>
			<p style={{ display: 'flex', gap: '1rem' }}>{DEALER_NAME} Cards: </p>
			<p>
				{dealer.cards.map((card) => (
					<span key={`${card.name}${card.suit}${card.value}`}>
						{card.name} of {card.suit} ({card.value}){' '}
					</span>
				))}
			</p>
			<p>
				{DEALER_NAME} Score: {dealer.score}
			</p>

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
				<ActionButton
					disabled={gameStatus !== 'Game Over!'}
					className={styles.resetGameButton}
					onClick={handleResetGame}
				>
					Reset
				</ActionButton>
			</div>
		</div>
	);
}
