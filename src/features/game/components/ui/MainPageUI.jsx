import { useDispatch, useSelector } from "react-redux";

import styles from "./UI.module.scss";
import { selectSound, setSound } from "../../../../data/menuSlice";
import { SoundSVG, MuteSVG } from "./SoundSvg";

const MainPageUI = () => {
  const dispatch = useDispatch();
  const currSound = useSelector(selectSound);

  return (
    <div className={styles.hudMainPage}>
      <div className={styles.upperRight}>
        <button
          className={styles.uiButton}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.target.blur();
            dispatch(setSound(!currSound));
          }}
        >
          {currSound ? <SoundSVG /> : <MuteSVG />}
        </button>
      </div>
    </div>
  );
};

export default MainPageUI;
