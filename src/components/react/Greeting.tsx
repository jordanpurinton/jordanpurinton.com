import styles from './Greeting.module.css';
import { useEffect, useState } from 'react';

const greetingTextVariants = [
	'Jordan Purinton',
	'a software engineer',
	'a fan of TypeScript',
	'a cereal enjoyer',
	'a Mario Tennis enthusiast',
	'just happy to be here',
] as const;

export default function Greeting() {
	const [greetingTextIndex, setGreetingTextIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setGreetingTextIndex((prev) => (prev + 1) % greetingTextVariants.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.greeting}>
			<h3>Hi, I&apos;m</h3>
			<h1>
				{[...Array(3)].map((_, index) => (
					<span key={index} className={styles.content}>
						{greetingTextVariants[greetingTextIndex]}{' '}
					</span>
				))}
			</h1>
		</div>
	);
}
