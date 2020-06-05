// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {

    //this is the class constructor
    constructor(name,id,email,school) {
        super(name,id,email);
        this.school = school;
    }

    //getter method for office number
    getSchool(){
        return this.school;
    }

    //getter method for role
    getRole() {
        return 'Intern';
    }

}


module.exports = Intern;