import { pos, setter } from "../components/board/constants";
import { Figure } from "../components/board/useFigure";

export const rookMove = (
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
  for (let i = 1; i <= 4; ++i) {
    movePositions.push(<pos[]>[]);
  }
  for (let j = 1; j <= 7; ++j) {
    movePositions[0].push({ x: x!, y: y! + j });
    movePositions[1].push({ x: x!, y: y! - j });
    movePositions[2].push({ x: x! + j, y: y! });
    movePositions[3].push({ x: x! - j, y: y! });
  }
  const inBoard = (x: number, y: number) => {
    return x > -1 && x < 8 && y > -1 && y < 8;
  };
  const checkCanMove = (rookPosX: number, rookPosY: number) => {
    if (inBoard(rookPosX, rookPosY)) {
      if (
        figures.filter((piece) => rookPosX === piece.x && rookPosY === piece.y)
          .length === 0
      ) {
        setCanMove((prev) => {
          const temp = [...prev];
          temp.push({ x: rookPosX, y: rookPosY });
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

export const rookAttack = (
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
  for (let i = 1; i <= 4; ++i) {
    movePositions.push(<pos[]>[]);
  }
  for (let j = 1; j <= 7; ++j) {
    movePositions[0].push({ x: x!, y: y! + j });
    movePositions[1].push({ x: x!, y: y! - j });
    movePositions[2].push({ x: x! + j, y: y! });
    movePositions[3].push({ x: x! - j, y: y! });
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
