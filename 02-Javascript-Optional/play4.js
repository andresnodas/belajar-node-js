const person = {
    name : 'Andres',
    age : 25,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
    
    // greet : function() {
    //     console.log('Hi, I am ' + this.name);
    // }

    // Cannot using this because looking for global variable, do not in the class
    // greet : () => {
    //     console.log('Hi, I am ' + this.name);
    // }
}

person.greet();