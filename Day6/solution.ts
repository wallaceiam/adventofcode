const parseGrid = (lines: string[]) => {
  const grid = lines.slice(0, lines.length - 1).map((line) =>
    line.trim().split(/\s+/).map(Number)
  );

  const operators = lines[lines.length - 1].trim().split(/\s+/);

  return { grid, operators };
};

const transformedGrid = (lines: string[]) => {
  const grid: string[][] = [];
  const rows = lines.slice(0, lines.length - 1);
  for (let r = 0; r < rows.length; r++) {
    const cols = rows[r];
    while(grid.length <= cols.length-1) {
      grid.push([]);
    }
    for (let c = 0; c < cols.length; c++) {
      grid[c].push(cols[c]);
    }
  }
  return grid;
};

const text = await Deno.readTextFile("./input.txt");
const lines = text.split("\n").map((line) => line.trim());
const { grid, operators } = parseGrid(lines);
console.log("Grid:", grid);
console.log("Operators:", operators);
const tGrid = transformedGrid(text.split("\n"));
console.log("Transformed Grid:", tGrid);

const result = grid[0].reduce((acc, _col, index) => {
  const operator = operators[index];

  const value = grid.reduce((acc, row) => {
    if (operator === "+") {
      return acc + row[index];
    } else if (operator === "*") {
      return (acc === 0 ? 1 : acc) * row[index];
    } else {
      throw new Error(`Unknown operator: ${operator}`);
    }
  }, 0);
  return acc + value;
}, 0);

console.log("Part 1 Final Result:", result);

let result2 = 0;
while(tGrid.length> 0) {
  const operator = operators.pop();
  
  const nums = [];
  do {
    const numbers = tGrid.pop();
    if(numbers === undefined || operator === undefined) {
      break;
    }
    const next = numbers.join('');
    if(next.trim().length > 0) {
      nums.push(next);
    } else {
      break
    }
  } while(true);
  
  console.log("Processing numbers:", nums, "with operator:", operator);
  const value = nums.reduce((acc, numStr) => {
    const num = parseInt(numStr, 10);
    if (operator === "+") {
      return acc + num;
    } else if (operator === "*") {
      return (acc === 0 ? 1 : acc) * num;
    } else {
      throw new Error(`Unknown operator: ${operator}`);
    }
  }, 0);

  result2 += value;
}

console.log("Part 2 Final Result:", result2);