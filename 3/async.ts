async function delayedResult() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("Done!");
        }, 1500);
    });
}

(async () => {
    return await delayedResult();
})();