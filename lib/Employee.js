// TODO: Write code to define and export the Employee class
class Employee {

    //this is the class constructor
    constructor(name,id,email) {
        this.name = name;
        this.id = id;
        this.email = email;
      }

      //name getter
      getName() {
          return this.name;
      }

      //id getter
      getId() {
          return this.id;
      }

      //email getter
      getEmail() {
          return this.email;
      }

      getRole(){
          return 'Employee';
      }

}


module.exports = Employee;