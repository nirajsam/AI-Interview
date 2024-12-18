'use client';

import { useRouter } from 'next/navigation';
import styles from './StartButton.module.scss';

const StartButton: React.FC = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/home');
  };

  return (
    <div className={styles.container}>
      <button className={styles.startButton} onClick={handleStartClick}>
        Start
      </button>
    </div>
  );
};

export default StartButton;
