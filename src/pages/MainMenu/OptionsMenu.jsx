import { useDispatch, useSelector } from "react-redux";
import {
  selectDifficulty,
  selectShowIndicators,
  setDifficulty,
  setShowIndicators,
  switchPage,
} from "../../data/menuSlice";
import {
  Difficulty,
  PageName,
  TRANSITION_HALF_LIFE,
  sleep,
} from "../../global/utils";
import styles from "./OptionsMenu.module.scss";
import { useEffect, useState } from "react";

const OptionsMenu = () => {
  const [disabled, setDisabled] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const currDifficulty = useSelector(selectDifficulty);
  const currShowIndicators = useSelector(selectShowIndicators);

  const dispatch = useDispatch();

  let difficultyStr = "";
  switch (currDifficulty) {
    case Difficulty.EASY:
      difficultyStr = "EASY";
      break;
    case Difficulty.NORMAL:
      difficultyStr = "NORMAL";
      break;
    case Difficulty.HARD:
      difficultyStr = "HARD";
      break;
  }
  const showIndicatorsStr = currShowIndicators ? "ON" : "OFF";

  useEffect(() => {
    (async () => {
      await sleep(TRANSITION_HALF_LIFE);
      setDisabled(false);
    })();
  }, []);

  return (
    <main className={styles.optionsMenu}>
      <div>
        <h1 className={styles.heading}>OPTIONS</h1>
        <p className={styles.optionLabel}>DIFFICULTY</p>
        <button
          className={styles.optionButton}
          onClick={() => {
            if (isExiting) return;
            const newValue =
              currDifficulty === Difficulty.HARD
                ? Difficulty.EASY
                : currDifficulty + 1;
            dispatch(setDifficulty(newValue));
          }}
          disabled={disabled}
        >
          {difficultyStr}
        </button>
        <p className={styles.optionLabel}>SHOW INDICATORS</p>
        <button
          className={styles.optionButton}
          onClick={() => {
            if (isExiting) return;
            dispatch(setShowIndicators(!currShowIndicators));
          }}
          disabled={disabled}
        >
          {showIndicatorsStr}
        </button>
        <button
          className={styles.backButton}
          onClick={() => {
            if (isExiting) return;
            dispatch(switchPage(PageName.MAIN_MENU));
            setIsExiting(true);
          }}
          disabled={disabled}
        >
          BACK
        </button>
      </div>
    </main>
  );
};

export default OptionsMenu;
