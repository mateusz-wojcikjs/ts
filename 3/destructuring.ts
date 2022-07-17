function getEmployee(id) {
    return {
        name: 'Jan',
        age: 35,
        address: 'Poznań',
        country: 'Polska'
    }
}

const {name: fullName, age} = getEmployee(22);
console.log('pracownik: ', fullName, age);

function getEmployeeWorkInfo(id) {
    return [id, 'ul. biurowa', 'Poland'];
}

const [id, officeAddress] = getEmployeeWorkInfo(22);
console.log('pracownik:', id, officeAddress);