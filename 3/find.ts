const items = [
    {name: 'Mateo', age: 25},
    {name: 'Mateo1', age: 24},
    {name: 'Mateo2', age: 23},
];

const mateo = items.find( item => item.name === 'Mateo');

console.log(mateo);