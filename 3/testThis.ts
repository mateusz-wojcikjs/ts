function func() {
    console.log(this);
}

func();
let test = new func();