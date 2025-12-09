// Function to check if an ID is invalid based on the repeated sequence rule
const isInvalidId = (id: string): boolean => {
    const regex = /^(\d+?)\1+$/; // Matches a sequence of digits repeated twice
    return regex.test(id);
};


const getInvalidIds = (start: number, end: number): number[] => {
    const invalidIds: number[] = [];
    for(let id = start; id <= end; id++) {
        if(isInvalidId(`${id}`)) {
            invalidIds.push(id);
        }
    }
    return invalidIds;
}

const text = await Deno.readTextFile("./input.txt");

const ranges = text.split(",").map((line) => line.trim());
let sumOfInvalidIds = 0;
for (const range of ranges) {
    const [startStr, endStr] = range.split("-");
    const invalidIds = getInvalidIds(parseInt(startStr, 10), parseInt(endStr, 10));
    sumOfInvalidIds += invalidIds.reduce((prev, cur) => prev + cur, 0);
    console.log(`Processing range ${startStr}-${endStr}: ${invalidIds} invalid IDs found.`);
}

console.log(`Sum of invalid IDs: ${sumOfInvalidIds}`);