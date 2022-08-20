const name = "Andres";
let age = 25;
const hasHobbies = true;

age = 30;

const summarizeUser = (userName, userAge, userHasHobby) =>{
    return ("Name is " + userName + ", " + userAge + " and the user hobbies: "+ userHasHobby);
}

// const add = (a, b) => a + b;
// const addOne = a => a + 1;
const addRandom = () => 1 + 2;

// console.log(add(1, 2));
// console.log(addOne(1));
console.log(addRandom());

console.log(summarizeUser(name, age, hasHobbies));