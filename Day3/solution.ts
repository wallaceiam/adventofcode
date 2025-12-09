const getLargest = (chars: number[], startIndex: number, remaining: number): [number, number] => {
  let largestNumber = -1;
  let largestIndex = -1;
  for(let i = startIndex; i < chars.length - remaining; i++) {
    if(chars[i] > largestNumber) {
      largestNumber = chars[i];
      largestIndex = i;
    }
  }
  return [largestNumber, largestIndex];
}


const getLargestNumber = (line: string): number => {
  const chars = line.split("").map((c) => parseInt(c, 10));
  const [largestNumber, index] = getLargest(chars, 0, 12);
  let result = largestNumber;
  let currentIndex = index;
  for(let i = 0; i < 11; i++) {
    const [nextLargest, nextIndex] = getLargest(chars, currentIndex + 1, 10 - i);
    result = result * 10 + nextLargest;
    currentIndex = nextIndex;
  }
  return result;
};

const text = await Deno.readTextFile("./input.txt");
let joltage = 0;
const lines = text.split("\n").map((line) => line.trim());
for (const line of lines) {
  const largestNumber = getLargestNumber(line);
  console.log(`Line: ${line}, Largest Number: ${largestNumber}`);
  joltage += largestNumber;
}

console.log(joltage);
