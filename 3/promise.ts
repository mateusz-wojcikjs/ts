const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("ok");
        reject("nie ok");
    }, 1000);
}).then( done => console.log(done)).catch(err => console.log(err));