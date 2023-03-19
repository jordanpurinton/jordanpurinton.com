import { useCallback } from 'react';
import styles from './BlackJack.module.css';
import { BLACKJACK_SCORE, DEALER_NAME, SUBTITLE_COLOR_MAP } from './constants';
import ActionButton from '../ActionButton';
import { Deck } from './Deck';
import { getSubtitle, handleAces } from './util';
import gameLog from './gameLog';
import useInitializeGame from './useInitializeGame';
import useGame from './useGame';

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
	} = useGame();

	// initializes game
	useInitializeGame(name);

	const disableHitButton =
		gameStatus !== 'In Progress' || player.didBust || player.isStanding;

	const disableStandButton =
		gameStatus !== 'In Progress' ||
		player.didBust ||
		player.isStanding ||
		(dealer.isStanding && dealer.score > player.score) ||
		player.score < dealer.score;

	const disableNextButton = gameStatus === 'In Progress' && player.isStanding;

	const disableResetButton = gameStatus !== 'Game Over!';

	/**
	 * Handling user hitting
	 */
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

		/**
		 * Handling player and dealer standing
		 */
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

	const [playerSubtitle, playerSubtitleColor] = getSubtitle(player, result);
	const [dealerSubtitle, dealerSubtitleColor] = getSubtitle(dealer, result);

	return (
		<div className={styles.blackJackContainer}>
			<h3>Blackjack</h3>
			<p>Game Status: {gameStatus}</p>
			<p>Result: {result}</p>
			<br />
			<h3>
				Player {playerSubtitle ? ' - ' : ''}
				<span
					className={[
						styles.subtitle,
						styles[
							SUBTITLE_COLOR_MAP[
								playerSubtitleColor as keyof typeof SUBTITLE_COLOR_MAP
							]
						],
					].join(' ')}
				>
					{playerSubtitle}
				</span>
			</h3>
			<p>
				{player.cards.map((card) => (
					<span key={`${card.name}${card.suit}${card.value}`}>
						{card.name} of {card.suit} ({card.value}){' '}
					</span>
				))}
			</p>
			<h3>
				Dealer {dealerSubtitle ? ' - ' : ''}
				<span
					className={[
						styles.subtitle,
						styles[
							SUBTITLE_COLOR_MAP[
								dealerSubtitleColor as keyof typeof SUBTITLE_COLOR_MAP
							]
						],
					].join(' ')}
				>
					{dealerSubtitle}
				</span>
			</h3>
			<p>
				{dealer.cards.map((card) => (
					<span key={`${card.name}${card.suit}${card.value}`}>
						{card.name} of {card.suit} ({card.value}){' '}
					</span>
				))}
			</p>
			<br />
			<br />
			<h3>
				{name} Score: {player.score}
			</h3>
			<h3>
				{DEALER_NAME} Score: {dealer.score}
			</h3>

			<div className={styles.gameButtonContainer}>
				<ActionButton
					disabled={disableHitButton}
					onClick={handleUserHit}
					className={styles.gameControlButton}
				>
					Hit
				</ActionButton>
				<ActionButton
					disabled={disableStandButton}
					onClick={handlePlayerStand}
					className={styles.gameControlButton}
				>
					Stand
				</ActionButton>
				<ActionButton
					disabled={!disableNextButton}
					onClick={handleUserHit}
					className={styles.gameControlButton}
				>
					Next
				</ActionButton>
				<ActionButton
					disabled={disableResetButton}
					className={styles.resetGameButton}
					onClick={handleResetGame}
				>
					Reset
				</ActionButton>
			</div>
		</div>
	);
}
