// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {

    //this is the class constructor
    constructor(name,id,email,github) {
        super(name,id,email);
        this.github = github;
    }

    //getter got github username
    getGithub() {
        return this.github;
    }

    //getter method for role
    getRole() {
        return 'Engineer';
    }

}


module.exports = Engineer;