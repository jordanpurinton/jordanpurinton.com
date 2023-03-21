import type { Card, CardName, CardValue, Suit } from './types';
import { PLAYING_CARDS, SUITS } from './constants';

export class Deck {
	public cards: Card[] = [];
	private static CARD_TYPES = {
		Two: 2,
		Three: 3,
		Four: 4,
		Five: 5,
		Six: 6,
		Seven: 7,
		Eight: 8,
		Nine: 9,
		Ten: 10,
		Jack: 10,
		Queen: 10,
		King: 10,
		Ace: 11,
	};
	constructor() {
		for (const suit of Object.values(SUITS)) {
			for (const [name, value] of Object.entries(Deck.CARD_TYPES)) {
				const cardName = name as unknown as CardName;
				const cardValue = value as unknown as CardValue;
				const cardSuit = suit as unknown as Suit;
				this.cards.push({
					name: cardName,
					value: cardValue,
					suit: cardSuit,
					unicodeArt: PLAYING_CARDS[`${cardName} of ${cardSuit}`],
					color: cardSuit === '♡' || cardSuit === '♢' ? 'red' : 'white',
				});
			}
		}

		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}
}
