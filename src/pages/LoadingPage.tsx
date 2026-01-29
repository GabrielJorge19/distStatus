import { useApp } from "@/contexts/AppContext";
import styles from "@/styles/loadingPage.module.css";

export default function LoadingPage() {
  const { data } = useApp();

  if(data !== null) return;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.spinner} />
        <h1>Sistema de Hidrantes</h1>
        <p>Carregando dados...</p>
      </div>
    </div>
  );
}
