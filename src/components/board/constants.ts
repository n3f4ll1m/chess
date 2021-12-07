export const letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
export interface pos {
  x: number;
  y: number;
}
export type setter<T> = React.Dispatch<React.SetStateAction<T>>;
