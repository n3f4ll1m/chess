import { letters, numbers } from "../board/constants";
import "./Tile.scss";
interface TileProps {
  x: number;
  y: number;
  image: string | undefined;
  figureId: string | undefined;
  isActive: boolean;
  activeFigure: string;
  tileCanMove: boolean;
  tileCanAttack: boolean;
  tileCanSpecialMove: boolean;
}

const Tile: React.FC<TileProps> = ({
  x,
  y,
  image,
  figureId,
  isActive,
  activeFigure,
  tileCanMove,
  tileCanAttack,
  tileCanSpecialMove,
}: TileProps) => {
  return (
    <div
      id={`${letters[x]}${numbers[y]}`}
      className={"tile " + ((x + y) % 2 === 1 ? "black" : "white")}
    >
      {image && (
        <>
          {isActive && figureId === activeFigure && <div className="overlay" />}
          <div
            id={figureId}
            className="figure"
            style={{ backgroundImage: `url(${image})` }}
          />
        </>
      )}
      {tileCanMove ? (
        <div className="moveOverlay" id={`${letters[x]}${numbers[y]}`} />
      ) : null}
      {tileCanAttack ? (
        <div className="attackOverlay" id={`${letters[x]}${numbers[y]}`} />
      ) : null}
      {tileCanSpecialMove ? (
        <div className="specialMoveOverlay" id={`${letters[x]}${numbers[y]}`} />
      ) : null}
    </div>
  );
};
export default Tile;
