import { /*useEffect,*/ useState } from "react";
import { letters, numbers, pos } from "./constants";
import useFigure, { Figure } from "./useFigure";
import { pawnAttack, pawnMove } from "../../figure-logic/pawnFigure";
import { knightAttack, knightMove } from "../../figure-logic/knightFigure";
import {
  kingAttack,
  kingMove,
  kingSpecialMove,
} from "../../figure-logic/kingFigure";
import { bishopAttack, bishopMove } from "../../figure-logic/bishopFigure";
import { rookAttack, rookMove } from "../../figure-logic/rookFigure";
import { queenAttack, queenMove } from "../../figure-logic/queenFigure";

const useBoard = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeFigure, setActiveFigure] = useState("");
  const [steps, setSteps] = useState<Figure[][]>([]);
  const { figures, setFigures } = useFigure();
  const [canMove, setCanMove] = useState<pos[]>([]);
  const [canAttack, setCanAttack] = useState<pos[]>([]);
  const [canSpecialMove, setCanSpecialMove] = useState<pos[]>([]);

  // console.log("canMove", canMove);
  const fillCanMove = (id: string) => {
    const name = id.slice(0, -1);
    switch (name) {
      case "whitePawn":
      case "blackPawn":
        pawnMove(figures, id, setCanMove);
        break;
      case "whiteKnight":
      case "blackKnight":
        knightMove(figures, id, setCanMove);
        break;
      case "blackKing":
      case "whiteKing":
        kingMove(figures, id, setCanMove);
        kingSpecialMove(figures, id, setCanSpecialMove);
        break;
      case "blackBishop":
      case "whiteBishop":
        bishopMove(figures, id, setCanMove);
        break;
      case "blackRook":
      case "whiteRook":
        rookMove(figures, id, setCanMove);
        break;
      case "whiteQueen":
      case "blackQueen":
        queenMove(figures, id, setCanMove);
        break;
      default:
        setCanMove([]);
        setCanSpecialMove([]);
        break;
    }
  };
  const fillCanAttack = (id: string) => {
    const name = id.slice(0, -1);
    switch (name) {
      case "whitePawn":
      case "blackPawn":
        pawnAttack(figures, id, setCanAttack);
        break;
      case "whiteKnight":
      case "blackKnight":
        knightAttack(figures, id, setCanAttack);
        break;
      case "blackKing":
      case "whiteKing":
        kingAttack(figures, id, setCanAttack);
        break;
      case "blackBishop":
      case "whiteBishop":
        bishopAttack(figures, id, setCanAttack);
        break;
      case "blackRook":
      case "whiteRook":
        rookAttack(figures, id, setCanAttack);
        break;
      case "blackQueen":
      case "whiteQueen":
        queenAttack(figures, id, setCanAttack);
        break;
      default:
        setCanAttack([]);
        break;
    }
  };

  const activateFigure = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const isFigure = element.classList.contains("figure");
    const canMoveHere = element.classList.contains("moveOverlay");
    const canAttackHere = element.classList.contains("attackOverlay");
    const canSpecialMoveHere = element.classList.contains("specialMoveOverlay");
    const isWhite = element.id.includes("white");
    const isActiveFigureWhite = activeFigure.includes("white");
    if (isFigure) {
      setIsActive(true);
      setActiveFigure(element.id);
      fillCanMove(element.id);
      fillCanAttack(element.id);
    }
    if (canMoveHere && isActive) {
      moveFigure(activeFigure, element.id);
      setActiveFigure("");
      setIsActive(false);
      fillCanMove("");
      fillCanAttack("");
    }
    if (canAttackHere && isActive) {
      attackFigure(activeFigure, element.id);
      setActiveFigure("");
      setIsActive(false);
      fillCanMove("");
      fillCanAttack("");
    }
    if (
      isFigure &&
      isActive &&
      (activeFigure === element.id ||
        (isWhite && isActiveFigureWhite) ||
        (!isWhite && !isActiveFigureWhite))
    ) {
      setActiveFigure("");
      setIsActive(false);
      fillCanMove("");
      fillCanAttack("");
    }
    if (isActive && canSpecialMoveHere) {
      if (element.id === "g8") {
        moveFigure(activeFigure, element.id);
        moveFigure("whiteRook2", "f8");
      }
      if (element.id === "g1") {
        moveFigure(activeFigure, element.id);
        moveFigure("blackRook2", "f1");
      }
      if (element.id === "b8") {
        moveFigure(activeFigure, element.id);
        moveFigure("whiteRook1", "c8");
      }
      if (element.id === "b1") {
        moveFigure(activeFigure, element.id);
        moveFigure("blackRook1", "c1");
      }
      setActiveFigure("");
      setIsActive(false);
      fillCanMove("");
      fillCanAttack("");
    }
  };

  const moveFigure = (name: string, newPos: string) => {
    const newX = letters.indexOf(newPos[0]);
    const newY = numbers.indexOf(newPos[1]);
    setFigures((prev) => {
      return prev.map((item) => {
        return item.id === name ? { ...item, x: newX, y: newY } : { ...item };
      });
    });
  };

  const attackFigure = (name: string, newPos: string) => {
    const newX = letters.indexOf(newPos[0]);
    const newY = numbers.indexOf(newPos[1]);
    setFigures((prev) => {
      const temp = prev.filter((item) => {
        const canEat = item.x === newX && item.y === newY;
        return !canEat;
      });
      return temp;
    });
    moveFigure(name, newPos);
  };

  const undoLastStep = () => {
    const tempSteps = [...steps];
    tempSteps.pop();
    const lastStep = tempSteps[tempSteps.length - 1];
    lastStep && setFigures(lastStep);
    setSteps(tempSteps);
  };

  // useEffect(() => {
  //   saveStep(figures);
  // }, [figures]);

  return {
    undoLastStep,
    activateFigure,
    figures,
    steps,
    activeFigure,
    isActive,
    canMove,
    canAttack,
    canSpecialMove,
  };
};
export default useBoard;
