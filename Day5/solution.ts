const countFreshInRange = (ranges: [number, number][], fresh: number[]): number => {
  let count = 0;
  for (const num of fresh) {
    for (const [start, end] of ranges) {
      if (num >= start && num <= end) {
        count++;
        break;
      }
    }
  }
  return count;
}

const countFreshIngredients = (ranges: [number, number][]): number => {
  const sortRanges = ranges.sort((a, b) => a[0] - b[0]);
  const unifiedRanges: [number, number][] = sortRanges.reduce((acc, curr) => {
    if (acc.length === 0) {
      acc.push(curr);
    } else {
      const lastRange = acc[acc.length - 1];
      if (curr[0] <= lastRange[1] + 1) {
        lastRange[1] = Math.max(lastRange[1], curr[1]);
      } else {
        acc.push(curr);
      }
    }
    return acc;
  }, [] as [number, number][]);

  for (const [start, end] of unifiedRanges) {
    console.log(`Unified Range: ${start}-${end}`);
  }

  let total = 0;
  for (const [start, end] of unifiedRanges) {
    total += (end - start + 1);
  }
  return total; 
}

const text = await Deno.readTextFile("./input.txt");
const lines = text.split("\n").map((line) => line.trim());
const ranges: [number, number][] = [];
let inRanges = true;
const fresh: number[] = [];
for (let row = 0; row < lines.length; row++) {
  if (lines[row].trim() === "") {
    inRanges = false;
  } else if (inRanges) {
    const [startStr, endStr] = lines[row].split("-");
    ranges.push([parseInt(startStr, 10), parseInt(endStr, 10)]);
  } else {
    fresh.push(parseInt(lines[row], 10));
  }
}

const result = countFreshInRange(ranges, fresh);
const part2 = countFreshIngredients(ranges);
console.log(`Number of fresh items overall: ${part2}`);

console.log(`Number of fresh items in range: ${result}`);
