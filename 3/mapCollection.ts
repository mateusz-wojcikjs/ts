const mappedEmp = new Map();
mappedEmp.set("Mateo", {fullName: "Mateo Kowalsky", id: 1});
mappedEmp.set("Jan", {fullName: "Jan Paweł", id: 2});
mappedEmp.set("Michał", {fullName: "Michał Górski", id: 4});

console.log(mappedEmp);
console.log('get', mappedEmp.get('Jan'));
console.log('size', mappedEmp.size);

for (let [key, val] of mappedEmp) {
    console.log('iteracja:', key, val);
}