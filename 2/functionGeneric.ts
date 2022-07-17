interface HasLength {
    length: number;
}

function getLength<T extends HasLength>(arg: T): number {
    if (arg.hasOwnProperty("length")) {
        return arg["length"];
    }
    return 0;
}

function getLengthShorter<T extends HasLength>(arg: T): number {
    return arg.length;
}

// console.log(getLength<number>(22));
console.log(getLength("witaj świecie"));
console.log(getLengthShorter("witaj świecie"));
// console.log(getLengthShorter(2));