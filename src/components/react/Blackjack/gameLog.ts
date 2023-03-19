export default function gameLog(msg: string) {
	if (window.location.search.includes('debug=blackjack')) {
		console.log(msg);
	}
}
