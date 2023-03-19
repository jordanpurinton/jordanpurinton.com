import { useGameStore } from './game.store';

export default function useGame() {
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

	return {
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
	};
}
