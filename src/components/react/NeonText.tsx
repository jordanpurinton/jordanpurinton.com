import Blinker from './Blinker';
import styles from './NeonText.module.css';

export default function NeonText({ content }: { content: string }) {
	return (
		<span className={styles.neonText}>
			{content}
			<Blinker />
		</span>
	);
}
