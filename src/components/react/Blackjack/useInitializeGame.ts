import { useEffect } from 'react';
import { Deck } from './Deck';
import { useGameStore } from './game.store';

export default function useInitializeGame(name: string) {
	const {
		player,
		dealer,
		deck,
		setGameStatus,
		setResult,
		setPlayer,
		setDealer,
		setDeck,
	} = useGameStore((state) => ({
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
}
