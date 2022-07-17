const empolyees = [
    {name: "Tomek", id: 1},
    {name: "Janusz", id: 1},
    {name: "Jan", id: 1},
];

const elements = empolyees.map(( item, index ) => {
    return `<div>${item.id} - ${item.name}</div>`;
});

console.log(elements);
