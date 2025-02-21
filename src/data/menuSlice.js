import { createSlice } from "@reduxjs/toolkit";
import { Difficulty, PageName, assert } from "../global/utils";

if (localStorage.getItem("difficulty") === null) {
  localStorage.setItem("difficulty", JSON.stringify(Number(Difficulty.EASY)));
}

if (localStorage.getItem("showIndicators") === null) {
  localStorage.setItem("showIndicators", JSON.stringify(false));
}
if (localStorage.getItem("sound") === null || localStorage.getItem("sound") === "true") {
  localStorage.setItem("sound", JSON.stringify(false));
}

const initialState = {
  page: {
    value: PageName.MAIN_MENU,
    updateValue: 0,
  },
  settings: {
    difficulty: JSON.parse(localStorage.getItem("difficulty")),
    showIndicators: JSON.parse(localStorage.getItem("showIndicators")),
    sound: JSON.parse(localStorage.getItem("sound")),
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    switchPage: {
      reducer(state, action) {
        const { newPage } = action.payload;
        if (state.page.value === newPage) {
          state.page.updateValue += 1;
        } else {
          state.page.value = newPage;
          state.page.updateValue = 0;
        }
      },
      prepare(newPage) {
        return {
          payload: {
            newPage,
          },
        };
      },
    },

    setDifficulty: {
      reducer(state, action) {
        const { difficulty } = action.payload;
        assert(
          difficulty >= 0 && difficulty < Object.keys(Difficulty).length,
          "Invalid difficulty set!"
        );
        localStorage.setItem("difficulty", JSON.stringify(Number(difficulty)));
        state.settings.difficulty = difficulty;
      },
      prepare(difficulty) {
        return { payload: { difficulty } };
      },
    },

    setShowIndicators: {
      reducer(state, action) {
        const { showIndicators } = action.payload;
        localStorage.setItem("showIndicators", JSON.stringify(showIndicators));
        state.settings.showIndicators = showIndicators;
      },
      prepare(showIndicators) {
        return { payload: { showIndicators } };
      },
    },

    setSound: {
      reducer(state, action){
        const { sound } = action.payload;
        localStorage.setItem("sound", JSON.stringify(sound));
        state.settings.sound = sound;
      },
      prepare(sound){
        return { payload: {sound}}
      }
    }
  },
});

export const selectPage = (state) => state.menu.page;
export const selectDifficulty = (state) => state.menu.settings.difficulty;
export const selectShowIndicators = (state) =>
  state.menu.settings.showIndicators;
export const selectSound = (state) => state.menu.settings.sound;
export const { switchPage, setDifficulty, setShowIndicators, setSound } =
  menuSlice.actions;
export default menuSlice.reducer;
