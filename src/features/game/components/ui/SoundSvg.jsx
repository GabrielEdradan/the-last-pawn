import styles from "./UISvg.module.scss";

const SoundSVG = () => {
  return (
    <svg
      className={styles.uiButton}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="4" fill="#8A5C5D" />
      <path
        d="M15 7L10 12H6V18H10L15 23V7Z"
        fill="#FAE6CE"
      />
      <path
        d="M18 11C19.6569 12.6569 19.6569 15.3431 18 17"
        stroke="#FAE6CE"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 9C23.7614 11.7614 23.7614 16.2386 21 19"
        stroke="#FAE6CE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const MuteSVG = () => {
  return (
    <svg
      className={styles.uiButton}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="4" fill="#8A5C5D" />
      <path
        d="M15 7L10 12H6V18H10L15 23V7Z"
        fill="#FAE6CE"
      />
      <path
        d="M17 13L21 17"
        stroke="#FAE6CE"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 13L17 17"
        stroke="#FAE6CE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export { SoundSVG, MuteSVG };
