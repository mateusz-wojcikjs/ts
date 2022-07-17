// Intersection
const persone: {name: string} & {age: number} = {
    name: "janusz",
    age: 44,
};
console.log(persone);

// Union
const car: {brand: string} | null =  {
    brand: "Mazda"
};
console.log(car);


// Literal types
let literal: "Subaru" | "BMW" | "Mazda" | "Ford" = "Subaru";
literal = "BMW";
// literal = "Opel";

// Aliases
type HorsePower = 150 | 200 | 250 | 300;
let engine: HorsePower = 150;


