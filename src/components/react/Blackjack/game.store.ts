import { DEALER_NAME } from './constants';
import type { TResult, TGameStatus, Card, GameStore } from './types';
import { create } from 'zustand';
import { Deck } from './Deck';

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
		isStanding: false,
		didBust: false,
	},
	setPlayer: (newPlayer: {
		name: string;
		score: number;
		cards: Card[];
		isStanding: boolean;
		didBust: boolean;
	}) => set({ player: newPlayer }),

	// dealer state
	dealer: {
		name: DEALER_NAME,
		score: 0,
		cards: [],
		isStanding: false,
		didBust: false,
	},
	setDealer: (newDealer: {
		name: string;
		score: number;
		cards: Card[];
		isStanding: boolean;
		didBust: boolean;
	}) => set({ dealer: newDealer }),

	// deck state
	deck: new Deck(),
	setDeck: (newDeck: Deck) => set({ deck: newDeck }),
}));
