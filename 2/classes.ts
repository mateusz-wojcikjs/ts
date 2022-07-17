class PersonX {
    // constructor(private readonly msg: string) {}
    constructor(private msg: string) {}
    // msg: string;
    speak() {
        this.msg = "mówię: " + this.msg;
        console.log(this.msg);
    }
}

const tom = new PersonX("Czołem!");
// tom.msg = 'Czołem';

tom.speak();