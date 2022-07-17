function func(a, ...args) {
    console.log(a, args, args[args.length - 1]);
}

func(1, 2, 3, 4, 5, 6, 7);