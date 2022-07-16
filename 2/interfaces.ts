interface Employee {
    name: string;
    id: number;
    isManager: boolean;
    getUniqueId: () => string;
}

const linda: Employee = {
    name: "Linda",
    id: 2,
    isManager: false,
    getUniqueId: (): string => {
        let uniqueId = linda.id + "-" + linda.name;
        if (!linda.isManager) {
            return "prc-" + uniqueId;
        }
        return uniqueId;
    }
}

const mateo: Employee = {
    name: "Mateo",
    id: 69,
    isManager: true,
    getUniqueId: (): string => {
        let uniqueId = mateo.id + "-" + mateo.name;
        if (mateo.isManager) {
            return "kierownik-" + uniqueId;
        }
        return uniqueId;
    }
}

console.log(linda);
console.log(linda.getUniqueId());
console.log(mateo);
console.log(mateo.getUniqueId());