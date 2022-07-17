const allTrucks = [2, 5, 7, 10];

const initialCapacity = 0;
const allTonnage = allTrucks.reduce((totalCapacity, currentValue) => {
    totalCapacity = totalCapacity + currentValue;

    return totalCapacity;
});

console.log(allTonnage);