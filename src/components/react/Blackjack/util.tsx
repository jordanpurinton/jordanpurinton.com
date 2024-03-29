import {
	BLACKJACK_SCORE,
	HIGH_ACE_VALUE,
	LOW_ACE_VALUE,
	DECREMENT_ACE_VALUE,
	RESULT_STYLES,
} from './constants';
import gameLog from './gameLog';
import type { TPlayer, TResult, Card, TGameStatus } from './types';

export const getSubtitle = (
	playerOrDealer: TPlayer,
	result: TResult
): JSX.Element => {
	if (result === 'None') {
		if (playerOrDealer.isStanding) {
			return <b style={{ color: 'yellow' }}> (Standing)</b>;
		}
	}
	return <></>;
};

export const getFormattedStatus = (gameStatus: TGameStatus) => {
	if (gameStatus === 'In Progress') {
		return <b style={{ color: 'yellow' }}>{gameStatus}</b>;
	}

	if (gameStatus === 'Game Over!') {
		return <b style={{ color: 'red' }}>{gameStatus}</b>;
	}

	return <b>{gameStatus}</b>;
};

export const getFormattedResult = (result: TResult): JSX.Element => {
	if (result === 'Tie') {
		return <b style={RESULT_STYLES.Tie}>Tie!</b>;
	}

	if (result === 'Player Win!') {
		return <b style={RESULT_STYLES['Player Win!']}>Player wins!</b>;
	}

	if (result === 'Dealer Win!') {
		return <b style={RESULT_STYLES['Dealer Win!']}>Dealer wins!</b>;
	}

	return <b>None</b>;
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
	const aces = newCards.filter((card) => card.value === HIGH_ACE_VALUE);
	for (const ace of aces) {
		if (newScore > BLACKJACK_SCORE) {
			newScore -= DECREMENT_ACE_VALUE;
			// Change the value of the ace to 1 in the newCards array
			const aceIndex = newCards.findIndex(
				(card) => card.name === ace.name && card.suit === ace.suit
			);
			if (aceIndex !== -1) {
				newCards[aceIndex].value = LOW_ACE_VALUE;
			}
		}
	}

	// Add the new card to the score
	newScore += dealtCard.value;

	// Check for aces again if the score is still greater than 21
	while (newScore > BLACKJACK_SCORE && aces.length > 0) {
		newScore -= DECREMENT_ACE_VALUE;
		const aceIndex = newCards.findIndex(
			(card) => card.value === HIGH_ACE_VALUE
		);
		if (aceIndex !== -1) {
			newCards[aceIndex].value = LOW_ACE_VALUE;
			aces.splice(aceIndex, 1);
		}
	}

	gameLog('After:');
	gameLog(JSON.stringify({ newCards }, null, 2));
	gameLog(JSON.stringify({ newScore }, null, 2));

	return { newCards, newScore };
};
