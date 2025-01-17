import { ChatComponent } from 'features/pos/Pos';
import { Layout } from 'layouts/Layout';
import styles from './index.module.css';

const Home = () => {
  return (
    <Layout
      render={() => (
        <div className={styles.container}>
          <div className={styles.title}>
            「冷蔵庫の写真から簡単に作れるレシピを見つけましょう！」
          </div>
          <ChatComponent />
        </div>
      )}
    />
  );
};

export default Home;
