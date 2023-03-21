import type { PLAYING_CARDS, SUITS } from './constants';
import type { Deck } from './Deck';

const RESULT = ['None', 'Player Win!', 'Dealer Win!', 'Tie'] as const;

export type TResult = (typeof RESULT)[number];

const GAME_STATUS = ['In Progress', 'Entering Username', 'Game Over!'] as const;

export type TGameStatus = (typeof GAME_STATUS)[number];

export type Suit = (typeof SUITS)[number];
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
const CardName = [
	'Ace',
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

export type TPlayer = {
	name: string;
	score: number;
	cards: Card[];
	isStanding: boolean;
	didBust: boolean;
};

export type GameStore = {
	gameStatus: TGameStatus;
	setGameStatus: (newGameStatus: TGameStatus) => void;

	result: TResult;
	setResult: (newResult: TResult) => void;

	player: TPlayer;
	setPlayer: (newPlayer: TPlayer) => void;

	dealer: TPlayer;
	setDealer: (newDealer: TPlayer) => void;

	deck: Deck;
	setDeck: (newDeck: Deck) => void;
};

export type TUnicodeArtKey = keyof typeof PLAYING_CARDS;
export type TUnicodeArt = (typeof PLAYING_CARDS)[TUnicodeArtKey];

export class Card {
	name: CardName;
	value: CardValue;
	suit: Suit;
	unicodeArt: TUnicodeArt;
	color: 'red' | 'white';
	constructor(
		name: CardName,
		value: CardValue,
		suit: Suit,
		unicodeArt: TUnicodeArt,
		color: 'red' | 'white'
	) {
		this.name = name;
		this.value = value;
		this.suit = suit;
		this.unicodeArt = unicodeArt;
		this.color = color;
	}
}
