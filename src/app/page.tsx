import styles from "./page.module.scss";
import Board from "./components/Board/Board";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <h1>Task Manager</h1>
      </div>
      <div className={styles.content}>
        <Board />
      </div>
    </div>
  );
}
