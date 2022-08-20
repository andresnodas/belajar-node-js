const name = "Andres";
let age = 25;
const hasHobbies = true;

age = 30;

function summarizeUser(userName, userAge, userHasHobby){
    return ("Name is " + userName + ", " + userAge + " and the user hobbies: "+ userHasHobby);
}

console.log(summarizeUser(name, age, hasHobbies));