import styles from "./PieceSvg.module.scss";

const Pawn = () => {
  return (
    <svg
      className={styles.pawn}
      // width="72"
      // height="104"
      viewBox="0 0 72 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="path-1-outside-1_2_67"
        maskUnits="userSpaceOnUse"
        x="-1"
        y="0.0285645"
        width="74"
        height="103"
        fill="black"
      >
        <rect fill="white" x="-1" y="0.0285645" width="74" height="103" />
        <path d="M64 78.2196C64 95.0286 64 95.0286 36.0499 95.0286C7.63392 95.0286 7.63392 95.0286 8.09974 78.2196C8.09974 63.2024 20.6134 51.0286 36.0499 51.0286C51.4863 51.0286 64 63.2024 64 78.2196Z" />
        <path d="M56 49.5679C56 61.0286 56 61.0286 36.0356 61.0286C15.7385 61.0286 15.7385 61.0286 16.0712 49.5679C16.0712 39.3289 25.0096 31.0286 36.0356 31.0286C47.0616 31.0286 56 39.3289 56 49.5679Z" />
        <path d="M52 24.0286C52 32.8651 44.8366 40.0286 36 40.0286C27.1634 40.0286 20 32.8651 20 24.0286C20 15.192 27.1634 8.02856 36 8.02856C44.8366 8.02856 52 15.192 52 24.0286Z" />
      </mask>
      <path
        d="M64 78.2196C64 95.0286 64 95.0286 36.0499 95.0286C7.63392 95.0286 7.63392 95.0286 8.09974 78.2196C8.09974 63.2024 20.6134 51.0286 36.0499 51.0286C51.4863 51.0286 64 63.2024 64 78.2196Z"
        fill="url(#paint0_linear_2_67)"
      />
      <path
        d="M56 49.5679C56 61.0286 56 61.0286 36.0356 61.0286C15.7385 61.0286 15.7385 61.0286 16.0712 49.5679C16.0712 39.3289 25.0096 31.0286 36.0356 31.0286C47.0616 31.0286 56 39.3289 56 49.5679Z"
        fill="url(#paint1_linear_2_67)"
      />
      <path
        d="M52 24.0286C52 32.8651 44.8366 40.0286 36 40.0286C27.1634 40.0286 20 32.8651 20 24.0286C20 15.192 27.1634 8.02856 36 8.02856C44.8366 8.02856 52 15.192 52 24.0286Z"
        fill="url(#paint2_linear_2_67)"
      />
      <path
        d="M64 78.2196C64 95.0286 64 95.0286 36.0499 95.0286C7.63392 95.0286 7.63392 95.0286 8.09974 78.2196C8.09974 63.2024 20.6134 51.0286 36.0499 51.0286C51.4863 51.0286 64 63.2024 64 78.2196Z"
        stroke="#3D3D3D"
        strokeWidth="16"
        strokeLinejoin="round"
        mask="url(#path-1-outside-1_2_67)"
      />
      <path
        d="M56 49.5679C56 61.0286 56 61.0286 36.0356 61.0286C15.7385 61.0286 15.7385 61.0286 16.0712 49.5679C16.0712 39.3289 25.0096 31.0286 36.0356 31.0286C47.0616 31.0286 56 39.3289 56 49.5679Z"
        stroke="#3D3D3D"
        strokeWidth="16"
        strokeLinejoin="round"
        mask="url(#path-1-outside-1_2_67)"
      />
      <path
        d="M52 24.0286C52 32.8651 44.8366 40.0286 36 40.0286C27.1634 40.0286 20 32.8651 20 24.0286C20 15.192 27.1634 8.02856 36 8.02856C44.8366 8.02856 52 15.192 52 24.0286Z"
        stroke="#3D3D3D"
        strokeWidth="16"
        strokeLinejoin="round"
        mask="url(#path-1-outside-1_2_67)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2_67"
          x1="36"
          y1="8.02856"
          x2="36"
          y2="95.0286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.7" stopColor="#FAE6CE" />
          <stop offset="1" stopColor="#DFC19D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2_67"
          x1="36"
          y1="8.02856"
          x2="36"
          y2="95.0286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.7" stopColor="#FAE6CE" />
          <stop offset="1" stopColor="#DFC19D" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2_67"
          x1="36"
          y1="8.02856"
          x2="36"
          y2="95.0286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.7" stopColor="#FAE6CE" />
          <stop offset="1" stopColor="#DFC19D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Pawn;
