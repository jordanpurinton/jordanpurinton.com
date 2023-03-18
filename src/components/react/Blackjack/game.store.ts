import type { TResult, TGameStatus, Card } from './types';
import { create } from 'zustand';

import { Deck } from './Deck';

type GameStore = {
	// game state
	gameStatus: TGameStatus;
	setGameStatus: (newGameStatus: TGameStatus) => void;

	result: TResult;
	setResult: (newResult: TResult) => void;

	// player state
	player: {
		name: string;
		score: number;
		cards: Card[];
		isPendingMove: boolean;
		isStanding: boolean;
		didBust: boolean;
	};
	setPlayer: (newPlayer: {
		name: string;
		score: number;
		cards: Card[];
		isPendingMove: boolean;
		isStanding: boolean;
		didBust: boolean;
	}) => void;

	// dealer state
	dealer: {
		name: string;
		score: number;
		cards: Card[];
		isPendingMove: boolean;
		isStanding: boolean;
		didBust: boolean;
	};
	setDealer: (newDealer: {
		name: string;
		score: number;
		cards: Card[];
		isPendingMove: boolean;
		isStanding: boolean;
		didBust: boolean;
	}) => void;

	// deck state
	deck: Deck;
	setDeck: (newDeck: Deck) => void;
};

export const useGameStore = create<GameStore>((set) => ({
	// game state
	gameStatus: 'In Progress',
	setGameStatus: (newGameStatus: TGameStatus) =>
		set({ gameStatus: newGameStatus }),

	result: 'None',
	setResult: (newResult: TResult) => set({ result: newResult }),

	// player state
	player: {
		name: '',
		score: 0,
		cards: [],
		isPendingMove: false,
		isStanding: false,
		didBust: false,
	},
	setPlayer: (newPlayer: {
		name: string;
		score: number;
		cards: Card[];
		isPendingMove: boolean;
		isStanding: boolean;
		didBust: boolean;
	}) => set({ player: newPlayer }),

	// dealer state
	dealer: {
		name: 'Dealer',
		score: 0,
		cards: [],
		isPendingMove: false,
		isStanding: false,
		didBust: false,
	},
	setDealer: (newDealer: {
		name: string;
		score: number;
		cards: Card[];
		isPendingMove: boolean;
		isStanding: boolean;
		didBust: boolean;
	}) => set({ dealer: newDealer }),

	// deck state
	deck: new Deck(),
	setDeck: (newDeck: Deck) => set({ deck: newDeck }),
}));
