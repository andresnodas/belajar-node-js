const person = {
    name : 'Andres',
    age : 25,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
}

const copiedPerson = {...person};
console.log(copiedPerson);

const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies){
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);

// Didnt error because const only reference to address or pointer memory
// hobbies.push('Programming');
// console.log(hobbies);

// slice is method in array cannot using for object
// const copiedArray = hobbies.slice();
const copiedArray = [...hobbies]; // spread syntax
console.log(copiedArray);

const toArray = (...args) => { // rest syntax
    return args;
};

console.log(toArray(1,2,3,4));