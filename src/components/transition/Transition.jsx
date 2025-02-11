import styles from "./Transition.module.scss";

const Transition = () => {
  return (
    <div className={styles.transition}>
      <div className={styles.topTeeth}></div>
      <div className={styles.transitionBody}></div>
      <div className={styles.bottomTeeth}></div>
    </div>
  );
};

export default Transition;
