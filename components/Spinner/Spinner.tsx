import React from "react";
import styles from"./Spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <div className="preload">
      <div className={styles.loader} id={styles.loader2} />
      <div className={styles.loader} id={styles.loader3} />
      <div className={styles.loader} id={styles.loader4} />
      <div className={styles.loader} id={styles.loader5} />
    </div>
  );
};

export default Spinner;
