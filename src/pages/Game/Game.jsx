import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInputs from "../../hooks/useInputs";
import GameUI from "./GameUI";
import styles from "./Game.module.scss";
import GridCell from "./GridCell";
import {
  movePlayer,
  selectPlayerPosition,
  resetState,
  processPieces,
  addPiece,
  selectAllPieces,
  selectOccupiedCellsMatrix,
  selectCaptureCells,
  selectPlayerCaptureCooldown,
  playerCaptureCooldown,
  selectTurnNumber,
  selectScore,
  selectGameIsOver,
} from "../../data/gameSlice";
import {
  getPieceWithPos,
  getVectorSum,
  isValidCell,
  PieceType,
  sleep,
  getNumberToSpawn,
} from "../../global/utils";
import Piece from "./Piece";
import store from "../../data/store";
import { selectDifficulty } from "../../data/menuSlice";

const Game = () => {
  const dispatch = useDispatch();
  const pieces = useSelector(selectAllPieces);
  const occupiedCellsMatrix = useSelector(selectOccupiedCellsMatrix);
  const captureCells = useSelector(selectCaptureCells);
  const playerPosition = useSelector(selectPlayerPosition);
  const playerCooldownLeft = useSelector(selectPlayerCaptureCooldown);
  const turnNumber = useSelector(selectTurnNumber);
  const score = useSelector(selectScore);
  const gameIsOver = useSelector(selectGameIsOver);
  const difficulty = useSelector(selectDifficulty);

  // Initialize game
  useEffect(() => {
    (async () => {
      dispatch(resetState());
      // await sleep(600);
      // dispatch(addPiece(0, 0, PieceType.PAWN_E));
      // dispatch(addPiece(3, 0, PieceType.PAWN_S));
      // dispatch(addPiece(1, 1, PieceType.KNIGHT));
      // dispatch(addPiece(1, 4, PieceType.QUEEN));
      // dispatch(addPiece(6, 7, PieceType.ROOK));
      // dispatch(addPiece(7, 7, PieceType.BISHOP));
    })();
  }, []);

  // The following three useEffects are for input queueing
  //   Input:
  //       Receives keyboard input, and updates current input when not isProcessingInput,
  //       otherwise queues it in inputQueued
  //   isProcessingInput:
  //       Whenever main logic completes, isProcessing is set to false, which this useEffect
  //       sets back to true if there is an input queued.
  //   currentInput:
  //       The actual main logic only executes when the current input updates.

  const input = useInputs();
  const [currentInput, setCurrentInput] = useState("");
  const inputQueued = useRef("");
  const [isProcessingInput, setIsProcessingInput] = useState(false);

  useEffect(() => {
    if (gameIsOver) {
      setIsProcessingInput(false);
      return;
    }
    if (input === "" || input === undefined) return;
    if (isProcessingInput) {
      inputQueued.current = input;
      return;
    }

    if (inputQueued.current !== "") {
      inputQueued.current = "";
    }
    setCurrentInput(input);
    setIsProcessingInput(true);
  }, [input]);

  useEffect(() => {
    if (gameIsOver) {
      if (isProcessingInput) {
        setIsProcessingInput(false);
      }
      return;
    }
    if (isProcessingInput === false) {
      if (inputQueued.current !== "") {
        setIsProcessingInput(true);
        setCurrentInput(inputQueued.current);
        inputQueued.current = "";
      }
    }
  }, [isProcessingInput]);

  useEffect(() => {
    if (gameIsOver) {
      setIsProcessingInput(false);
      setCurrentInput("");
      return;
    }
    if (currentInput === "") {
      return;
    }
    setCurrentInput("");

    let direction = { x: 0, y: 0 };
    switch (currentInput) {
      case "w":
        direction.y = -1;
        break;
      case "a":
        direction.x = -1;
        break;
      case "s":
        direction.y = 1;
        break;
      case "d":
        direction.x = 1;
        break;
      case " ":
        break;
      default:
        direction = null;
    }
    if (direction === null) {
      setIsProcessingInput(false);
      return;
    }

    const movingTo = getVectorSum(playerPosition, direction);
    if (!isValidCell(movingTo)) {
      setIsProcessingInput(false);
      return;
    }

    let isCapturing = false;
    if (!(playerPosition.x === movingTo.x && playerPosition.y === movingTo.y)) {
      if (occupiedCellsMatrix[movingTo.y][movingTo.x] !== false) {
        if (playerCooldownLeft <= 0) {
          isCapturing = true;
        } else {
          setIsProcessingInput(false);
          return;
        }
      }
    }

    (async () => {
      dispatch(movePlayer(direction.x, direction.y, isCapturing, difficulty));
      await sleep(100);
      dispatch(processPieces());
      await sleep(200);

      if (store.getState().game.gameIsOver) {
        setIsProcessingInput(false);
        return; // Get directly from store to have updated data
      }
      for (let i = 0; i < getNumberToSpawn(difficulty); i++) {
        const { type, pos } = getPieceWithPos(difficulty);

        // Get directly from store to have updated data
        if (store.getState().game.occupiedCellsMatrix[pos.y][pos.x] === false) {
          dispatch(addPiece(pos.x, pos.y, type));
        }
      }
      await sleep(100);
      setIsProcessingInput(false);
    })();
  }, [currentInput]);

  // Renders piece components (visuals)
  const pieceComponents = useMemo(() => {
    return Object.keys(pieces).map((pieceId) => {
      return (
        <Piece
          key={pieceId}
          gridPos={pieces[pieceId].position}
          type={pieces[pieceId].type}
          cooldownLeft={pieces[pieceId].cooldown}
          isCaptured={pieces[pieceId].isCaptured}
          // willMove={pieces[pieceId].cooldown === 0}
        />
      );
    });
  }, [pieces]);

  // Renders grid cells
  const gridCellComponents = useMemo(() => {
    const output = new Array(8).fill(null).map(() => new Array(8).fill(null));
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        output[y][x] = (
          <GridCell key={x + y * 8} pos={{ x, y }} isCapture={false} />
        );
      }
    }
    captureCells.forEach((cell) => {
      const { x, y } = cell;
      output[y][x] = (
        <GridCell
          key={x + y * 8}
          pos={{ x, y }}
          isCapture={true}
          debug={{ occupied: false }}
        />
      );
    });
    return output;
  }, [captureCells, occupiedCellsMatrix]);

  return (
    <main>
      <GameUI
        turnNumber={turnNumber}
        score={score}
        captureCooldownPercent={
          (1 - playerCooldownLeft / playerCaptureCooldown) * 100
        }
      />
      <div className={styles.graphicsGridBorder}></div>
      <div className={styles.graphicsGridTrunk}></div>
      <div className={styles.gridContainer}>{gridCellComponents}</div>
      <div className={styles.piecesContainer}>
        {/* TEST */}
        <Piece
          gridPos={playerPosition}
          type={PieceType.PLAYER}
          isCaptured={gameIsOver}
        />
        {pieceComponents}
      </div>
    </main>
  );
};

export default Game;
