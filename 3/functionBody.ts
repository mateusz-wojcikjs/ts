if (true) {
    var val1 = 1;
    const val3 = 3;
}

function go() {
    var val2 = 2;
    console.log(this)
}

go();
console.log(val1);
// console.log(val2);
// console.log(val3);