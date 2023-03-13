import styles from './Greeting.module.css';
import { useEffect, useState } from 'react';
import Blinker from './Blinker';
import NeonText from './NeonText';

const greetingTextVariants = [
	'Jordan Purinton',
	'a software engineer',
	'a fan of TypeScript',
	'a cereal enjoyer',
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
		<>
			<h3 className={styles.greetingPrefix}>Hi, I&apos;m</h3>
			<h1 className={styles.greetingHeader}>
				<NeonText content={greetingTextVariants[greetingTextIndex]} />
				<Blinker />
			</h1>
		</>
	);
}
