import styles from './Blinker.module.css';

export default function Blinker({ className }: { className?: string }) {
  return (
    <span className={`${styles.blinker} ${className ? className : ''}`}>|</span>
  );
}
