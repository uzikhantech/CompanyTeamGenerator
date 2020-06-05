// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Manager extends Employee {

    //this is the class constructor
    constructor(name,id,email,officeNumber) {
        super(name,id,email);
        this.officeNumber = officeNumber;
    }

    //getter method for office number
    getOfficeNumber(){
        return this.officeNumber;
    }

    //getter method for role
    getRole() {
        return 'Manager';
    }

}

module.exports = Manager;