export const BLACKJACK_SCORE = 21;
export const DEALER_NAME = 'Dealer';
export const LOW_ACE_VALUE = 1;
export const HIGH_ACE_VALUE = 11;
export const DEALER_STAND_THRESHOLD = 17;
export const DECREMENT_ACE_VALUE = 10;
export const RESULT_STYLES = {
	Tie: { color: 'yellow' },
	'Player Win!': { color: 'green' },
	'Dealer Win!': { color: 'red' },
};

export const SUITS = ['♢', '♧', '♡', '♤'] as const;

export const PLAYING_CARDS = {
	'Two of ♤': '🂢',
	'Three of ♤': '🂣',
	'Four of ♤': '🂤',
	'Five of ♤': '🂥',
	'Six of ♤': '🂦',
	'Seven of ♤': '🂧',
	'Eight of ♤': '🂨',
	'Nine of ♤': '🂩',
	'Ten of ♤': '🂪',
	'Jack of ♤': '🂫',
	'Queen of ♤': '🂭',
	'King of ♤': '🂮',
	'Ace of ♤': '🂡',
	'Two of ♡': '🂲',
	'Three of ♡': '🂳',
	'Four of ♡': '🂴',
	'Five of ♡': '🂵',
	'Six of ♡': '🂶',
	'Seven of ♡': '🂷',
	'Eight of ♡': '🂸',
	'Nine of ♡': '🂹',
	'Ten of ♡': '🂺',
	'Jack of ♡': '🂻',
	'Queen of ♡': '🂽',
	'King of ♡': '🂾',
	'Ace of ♡': '🂱',
	'Two of ♢': '🃂',
	'Three of ♢': '🃃',
	'Four of ♢': '🃄',
	'Five of ♢': '🃅',
	'Six of ♢': '🃆',
	'Seven of ♢': '🃇',
	'Eight of ♢': '🃈',
	'Nine of ♢': '🃉',
	'Ten of ♢': '🃊',
	'Jack of ♢': '🃋',
	'Queen of ♢': '🃍',
	'King of ♢': '🃎',
	'Ace of ♢': '🃁',
	'Two of ♧': '🃒',
	'Three of ♧': '🃓',
	'Four of ♧': '🃔',
	'Five of ♧': '🃕',
	'Six of ♧': '🃖',
	'Seven of ♧': '🃗',
	'Eight of ♧': '🃘',
	'Nine of ♧': '🃙',
	'Ten of ♧': '🃚',
	'Jack of ♧': '🃛',
	'Queen of ♧': '🃝',
	'King of ♧': '🃞',
	'Ace of ♧': '🃑',
} as const;
