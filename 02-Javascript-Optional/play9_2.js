const fetchData = callback => {

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });

    return promise;
}

setTimeout(() => {
    console.log('Timer is done!!');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    }).then(text2 => {
        console.log(text2);
    });
}, 2000);

//if time is 1 milisecond is superfast timing, it will running after all code is executed. Hello!, Hi!, Timer is done!! Because timeout is async

console.log('Hello!');
console.log('Hi!');

