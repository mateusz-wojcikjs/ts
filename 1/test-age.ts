interface User {
    name: string;
    age: number;
}

function canDrive(usr: User) {
    console.log("imię użytkownika: ", usr.name);

    if (usr.age >= 18) {
        console.log("Może prowadzić auto");
    } else {
        console.log("Nie może prowadzić auta")
    }
}

const tom: User = {
    name: "Tomek",
    age: 22
}

canDrive(tom);