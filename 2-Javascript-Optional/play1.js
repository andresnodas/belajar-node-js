var name = "Andres";
var age = 25;
var hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobby){
    return ("Name is " + userName + ", " + userAge + " and the user hobbies: "+ userHasHobby);
}

console.log(summarizeUser(name, age, hasHobbies));