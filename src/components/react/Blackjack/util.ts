import { DEALER_NAME, BLACKJACK_SCORE } from './constants';
import gameLog from './gameLog';
import type { TPlayer, TResult, Card } from './types';

export const getSubtitle = (playerOrDealer: TPlayer, result: TResult) => {
	if (result === 'None') {
		if (playerOrDealer.didBust) {
			return ' – Bust!';
		} else if (playerOrDealer.isStanding) {
			return ' – Standing';
		}
	}

	if (playerOrDealer.name === DEALER_NAME) {
		if (result === 'Player Win!') {
			return ' – Dealer Loses!';
		} else if (result === 'Dealer Win!') {
			return ' – Dealer Wins!';
		}
	}

	if (playerOrDealer.name !== DEALER_NAME) {
		if (result === 'Player Win!') {
			return ' – You Win!';
		} else if (result === 'Dealer Win!') {
			return ' – You Lose!';
		}
	}

	if (result === 'Tie') {
		return ' – Tie!';
	}
};

export const handleAces = (
	playerOrDealer: TPlayer,
	dealtCard: Card,
	isStanding: boolean
) => {
	const newCards: Card[] = [...playerOrDealer.cards, dealtCard];
	let newScore = playerOrDealer.score;

	if (isStanding) {
		gameLog(`Player is standing, so we're not handling aces`);
		return {
			newCards: playerOrDealer.cards,
			newScore: playerOrDealer.score,
		};
	}

	// Check for aces in the current hand and the newly dealt card
	const aces = newCards.filter((card) => card.value === 11);
	for (const ace of aces) {
		if (newScore > BLACKJACK_SCORE) {
			newScore -= 10;
			// Change the value of the ace to 1 in the newCards array
			const aceIndex = newCards.findIndex(
				(card) => card.name === ace.name && card.suit === ace.suit
			);
			if (aceIndex !== -1) {
				newCards[aceIndex].value = 1;
			}
		}
	}

	// Add the new card to the score
	newScore += dealtCard.value;

	// Check for aces again if the score is still greater than 21
	while (newScore > BLACKJACK_SCORE && aces.length > 0) {
		newScore -= 10;
		const aceIndex = newCards.findIndex((card) => card.value === 11);
		if (aceIndex !== -1) {
			newCards[aceIndex].value = 1;
			aces.splice(aceIndex, 1);
		}
	}

	gameLog('After:');
	gameLog(JSON.stringify({ newCards }, null, 2));
	gameLog(JSON.stringify({ newScore }, null, 2));

	return { newCards, newScore };
};
