import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchPage, selectSound } from "../../data/menuSlice";
import { PageName, TRANSITION_HALF_LIFE, sleep } from "../../global/utils";
import styles from "./MainPage.module.scss";

import Logo from "./components/Logo";
import MainPageUI from "../game/components/ui/MainPageUI";


const MainPage = () => {
  const [disabled, setDisabled] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);
  const dispatch = useDispatch();
  
  const hoverAudio = new Audio('/the-last-pawn/sounds/button_hover.mp3')
  const currSound = useSelector(selectSound);

  const handleMouseEnter = () => {
    if(currSound){
      hoverAudio.play();
    }
  }
  
  useEffect(() => {
    (async () => {
      await sleep(TRANSITION_HALF_LIFE);
      setDisabled(false);
    })();
  }, []);

  return (
    <>
      <MainPageUI 
        touchHandlers={()=>{}}
        turnNumber={()=>{}}
        score={()=>{}}
        captureCooldownPercent={
          ()=>{}
        }
        isGameOver={()=>{}}
      />
    <main className={styles.mainMenu}>
      <div>
        <h1 className={styles.logo}>
          <Logo />
          {/* <span className={styles.subtitle}>THE LAST</span>PAWN */}
        </h1>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (hasClicked) return;
            dispatch(switchPage(PageName.GAME));
            setHasClicked(true);
          }}
          disabled={disabled}
          onMouseEnter={handleMouseEnter}
        >
          PLAY
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (hasClicked) return;
            dispatch(switchPage(PageName.HOW_TO_PLAY));
            setHasClicked(true);
          }}
          disabled={disabled}
          onMouseEnter={handleMouseEnter}
        >
          HOW TO PLAY
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (hasClicked) return;
            dispatch(switchPage(PageName.OPTIONS));
            setHasClicked(true);
          }}
          disabled={disabled}
          onMouseEnter={handleMouseEnter}
        >
          OPTIONS
        </button>
        {/* <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (hasClicked) return;
            dispatch(switchPage(PageName.CREDITS));
            setHasClicked(true);
          }}
          disabled={disabled}
        >
          CREDITS
        </button> */}
      </div>
    </main>
    </>
  );
};

export default MainPage;
