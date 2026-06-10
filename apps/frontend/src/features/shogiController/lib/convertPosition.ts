import { Coordinate } from "../types/position.type";

export const coordinateToPosition = (coordinate: Coordinate) => {
  return {
    x: 9 - coordinate[0],
    y: coordinate[1] - 1
  }
}
