type Run = (miles: number) => boolean;

let runner: Run = function (miles: number): boolean {
    return miles > 10;
}

console.log(runner(9));
console.log(runner(11));