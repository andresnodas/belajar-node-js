const fetchData = callback => {
    setTimeout(() => {
        callback('Done!');
    }, 1500);
}

setTimeout(() => {
    console.log('Timer is done!!');
    fetchData(text => {
        console.log(text);
    });
}, 2000);

//if time is 1 milisecond is superfast timing, it will running after all code is executed. Hello!, Hi!, Timer is done!! Because timeout is async

console.log('Hello!');
console.log('Hi!');

