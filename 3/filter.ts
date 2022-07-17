const filterItems = [
    { name: "Jan", age: 20},
    { name: "Seagull", age: 25},
    { name: "Me", age: 40},
];

const results = filterItems.filter(( item, index ) => {
    console.log(index);
    return item.age >= 24;
});

console.log(results);