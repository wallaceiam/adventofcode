const partOne = (lines: string[]): number => {
  let splitCounter = 0;
  let prevCells = lines[0].split("");
  for(let i=1; i<lines.length; i++) {
    const row = lines[i];
    const cells = row.split("");
    for(let j=0; j<cells.length; j++) {
      if(prevCells[j] === "S") {
        cells[j] = "|";
      } else if(prevCells[j] === "|") {
        if(cells[j] === "^") {
          if(j > 0) cells[j-1] = "|";
          if(j < cells.length - 1) cells[j+1] = "|";
          splitCounter++;
        } else if(cells[j] === ".") {
          cells[j] = "|";
        }
      }
    }
    console.log(cells.join(""));
    prevCells = cells;
  }
  return splitCounter;
}



const partTwo = (lines: string[]): number => {
  const grid = lines.map(line => line.split(''));
  const memo: number[][] = new Array(grid.length).fill(0).map(_ => Array(grid[0].length).fill(0));
  const path = (i: number, j: number): number => {
    if(i < 0 || j < 0) return 1;
    if(i >= grid.length || j >= grid[0].length) return 1;
    if(memo[i][j] !== 0) return memo[i][j];
    if(grid[i][j] === '^') {
      memo[i][j] = path(i+1, j-1) + path(i+1, j+1);
    } else if(grid[i][j] === '.') {
      memo[i][j] = path(i+1, j);
    }
    return memo[i][j];
  };
  const start = grid[0].findIndex((cell) => cell === 'S');
  memo[0][start] = 1;
  return path(1, start);
}

const text = await Deno.readTextFile("./input.txt");
const lines = text.split("\n").map((line) => line.trim());


console.log(`Part 1: ${partOne(lines)}`);
console.log(`Part 2: ${partTwo(lines)}`);