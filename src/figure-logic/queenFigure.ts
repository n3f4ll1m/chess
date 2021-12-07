import { pos, setter } from "../components/board/constants";
import { Figure } from "../components/board/useFigure";

export const queenMove = (
  figures: Figure[],
  id: string,
  setCanMove: setter<pos[]>
) => {
  let x: number | undefined;
  let y: number | undefined;
  let isEnd = false;
  for (const piece of figures) {
    if (id === piece.id) {
      x = piece.x;
      y = piece.y;
    }
  }
  const movePositions: pos[][] = [];
  for (let i = 1; i <= 8; ++i) {
    movePositions.push(<pos[]>[]);
  }
  for (let j = 1; j <= 7; ++j) {
    movePositions[0].push({ x: x!, y: y! + j });
    movePositions[1].push({ x: x!, y: y! - j });
    movePositions[2].push({ x: x! + j, y: y! });
    movePositions[3].push({ x: x! - j, y: y! });
    movePositions[4].push({ x: x! + j, y: y! + j });
    movePositions[5].push({ x: x! - j, y: y! - j });
    movePositions[6].push({ x: x! + j, y: y! - j });
    movePositions[7].push({ x: x! - j, y: y! + j });
  }
  const inBoard = (x: number, y: number) => {
    return x > -1 && x < 8 && y > -1 && y < 8;
  };
  const checkCanMove = (queenPosX: number, queenPosY: number) => {
    if (inBoard(queenPosX, queenPosY)) {
      if (
        figures.filter(
          (piece) => queenPosX === piece.x && queenPosY === piece.y
        ).length === 0
      ) {
        setCanMove((prev) => {
          const temp = [...prev];
          temp.push({ x: queenPosX, y: queenPosY });
          return temp;
        });
      } else {
        isEnd = true;
      }
    }
  };
  for (const ray of movePositions) {
    isEnd = false;
    for (const pos of ray) {
      if (!isEnd) {
        checkCanMove(pos.x!, pos.y!);
      }
    }
  }
};

export const queenAttack = (
  figures: Figure[],
  id: string,
  setCanAttack: setter<pos[]>
) => {
  let x: number | undefined;
  let y: number | undefined;
  let isEnd = false;
  const isWhite = id.includes("white");
  for (const piece of figures) {
    if (id === piece.id) {
      x = piece.x;
      y = piece.y;
    }
  }
  const movePositions: pos[][] = [];
  for (let i = 1; i <= 8; ++i) {
    movePositions.push(<pos[]>[]);
  }
  for (let j = 1; j <= 7; ++j) {
    movePositions[0].push({ x: x!, y: y! + j });
    movePositions[1].push({ x: x!, y: y! - j });
    movePositions[2].push({ x: x! + j, y: y! });
    movePositions[3].push({ x: x! - j, y: y! });
    movePositions[4].push({ x: x! + j, y: y! + j });
    movePositions[5].push({ x: x! - j, y: y! - j });
    movePositions[6].push({ x: x! + j, y: y! - j });
    movePositions[7].push({ x: x! - j, y: y! + j });
  }
  const inBoard = (x: number, y: number) => {
    return x > -1 && x < 8 && y > -1 && y < 8;
  };
  for (const ray of movePositions) {
    isEnd = false;
    for (const pos of ray) {
      // console.log("pos", pos);
      if (!isEnd && inBoard(pos.x, pos.y)) {
        const attacked_figure = figures.find(
          (piece) =>
            piece.id.includes(isWhite ? "black" : "white") &&
            pos.x === piece.x &&
            pos.y === piece.y
        );
        const figureOnWay = figures.find(
          (piece) =>
            piece.id.includes(!isWhite ? "black" : "white") &&
            pos.x === piece.x &&
            pos.y === piece.y
        );
        if (figureOnWay) {
          isEnd = true;
          break;
        }
        if (attacked_figure) {
          isEnd = true;
          setCanAttack((prev) => {
            const temp = [...prev];
            temp.push({ x: attacked_figure.x, y: attacked_figure.y });
            return temp;
          });
        }
      }
    }
  }
};
