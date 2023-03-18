const RESULT = ['None', 'Player Win!', 'Dealer Win!', 'Tie'] as const;

export type TResult = (typeof RESULT)[number];

const GAME_STATUS = ['In Progress', 'Entering Username', 'Game Over!'] as const;

export type TGameStatus = (typeof GAME_STATUS)[number];

export type Suit = '♢' | '♧' | '♡' | '♤';
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export enum Suits {
	Diamonds = '♢',
	Spades = '♤',
	Hearts = '♡',
	Clubs = '♧',
}
const CardName = [
	'Ace',
	'One',
	'Two',
	'Three',
	'Four',
	'Five',
	'Six',
	'Seven',
	'Eight',
	'Nine',
	'Ten',
	'Jack',
	'Queen',
	'King',
] as const;

export type CardName = (typeof CardName)[number];

export class Card {
	name: CardName;
	value: CardValue;
	suit: Suit;
	constructor(name: CardName, value: CardValue, suit: Suit) {
		this.name = name;
		this.value = value;
		this.suit = suit;
	}
}
