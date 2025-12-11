const countNeighbors = (row: number, col: number, grid: string[][]): number => {
  // Check all 8 directions
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 && newRow < grid.length && newCol >= 0 &&
      newCol < grid[row].length
    ) {
      if (grid[newRow][newCol] === "@") {
        count++;
      }
    }
  }
  return count;
};

const iterate = (grid: string[][]): [string[][], number] => {
  const newGrid: string[][] = [];

  let result = 0;
  for (let row = 0; row < grid.length; row++) {
    newGrid.push([]);
    for (let col = 0; col < grid[row].length; col++) {
      const current = grid[row][col];
      if (current === "@" && countNeighbors(row, col, grid) < 4) {
        result++;
        newGrid[row].push(".");
      } else {
        newGrid[row].push(current);
      }
    }
  }
  return [newGrid, result];
};

const text = await Deno.readTextFile("./input.txt");
const lines = text.split("\n").map((line) => line.trim());
const grid: string[][] = lines.map((line) => line.split(""));
let result = 0;
let g = grid;
do {
  const [newGrid, changes] = iterate(g);
  if(changes === 0) {
    break;
  }
  g = newGrid;
  result += changes;
} while (true);

console.log(result);
