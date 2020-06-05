const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees =[];

const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'Hi Manager, what is your name?'
    }, 
    {
        type: 'input',
        name: 'managerId',
        message: 'What is you employee id?'
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your email?'
    },
    {
        type: 'input',
        name: 'managerNumber',
        message: 'What is you office number?'
    }
];

const addEmployeeQuestions = [
    
    {
        type: 'confirm',
        name: 'addEmployee',
        message: 'Do you want to add employee to your team?'
    }, 
    {
        when: (response) => { return response.addEmployee},
        type: 'list',
        name: 'employeeType',
        message: 'What type of employee would you like to add?',
        choices: ['Engineer', 'Intern']
    }
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'What is the engineers name?'
    }, 
    {
        type: 'input',
        name: 'engineerId',
        message: 'what is the engineers id?'
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the engineers email?'
    },
    {
        type: 'input',
        name: 'engineerGitHub',
        message: 'What is the engineers github?'
    }
];

const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: 'What is the interns name?'
    }, 
    {
        type: 'input',
        name: 'engineerId',
        message: 'what is the interns id?'
    },
    {
        type: 'input',
        name: 'internEmail',
        message: 'What is the interns email?'
    },
    {
        type: 'input',
        name: 'internSchool',
        message: 'What is the interns school?'
    }
];

//create a new employee questions
async function promptWantToAddEmployee() {
    await inquirer
    .prompt(addEmployeeQuestions)
    .then(async answers => {
   
        console.log("inside prompt employee" +answers.addEmployee);
        if (answers.addEmployee){
            if (answers.employeeType === "Engineer") {
                await promptEngineer()
            }else {
               await promptIntern();
            }
            await promptEmployee();
        }
    })
    .catch(error => {
        throw error;
    });

}

//ask engineer specific questions
async function promptEngineer() {
    await inquirer
    .prompt(engineerQuestions)
    .then(async answers => {
         //add to employee array
         const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail,answers.engineerGitHub)
         employees.push(engineer);
    })
    .catch(error => {
        throw error;
    });

}

//ask intern questions
async function promptIntern() {

    await inquirer
    .prompt(internQuestions)
    .then(async answers => {
         //add to array
         const intern = new Intern(answers.internName, answers.internId, answers.internEmail,answers.internSchool)
         employees.push(intern);
    })
    .catch(error => {
        throw error;
    });

}

//entry point
async function init() {

    await inquirer
    .prompt(managerQuestions)
    .then( async answers => {
        const manager = new Manager(answers.managerName,answers.managerId,answers.managerEmail, answers.managerNumber)
        employees.push(manager)
        await promptEmployee();
    })
    .catch(error => {
        throw error;
    });

    //sample data
    const softwareEngineer = new Engineer("uzi",2,'uzikhan1985@outlook.com','mariakhantech' );
    const softwareEngineer1 = new Engineer("uzi",2,'uzikhan1985@outlook.com','mariakhantech' );
    const softwareEngineer2= new Engineer("uzi",2,'uzikhan1985@outlook.com','mariakhantech' );
    const softwareEngineer3 = new Engineer("uzi",2,'uzikhan1985@outlook.com','mariakhantech' );
    const softwareEngineer4 = new Engineer("uzi",2,'uzikhan1985@outlook.com','mariakhantech' );
    const mccIntern1 = new Intern("sophia",1,'sophiekhan@outlook.com','MCC' );
    const mccIntern2 = new Intern("elijah",1,'elijahkhan@outlook.com','Memorial High' );

    //console.log(pegaManager.getName());
    console.log (softwareEngineer.getGithub())

    //an array of employees so we can pass it into render function
    employees.push(softwareEngineer,softwareEngineer1,softwareEngineer2,softwareEngineer3,softwareEngineer4,mccIntern1,mccIntern2)

    //return a block of HTML including templated divs for each employee
    let renderedHtml = await render(employees);

    //check id the folder exists, otherwise create it 
    if (!fs.existsSync(OUTPUT_DIR)){
      await  fs.mkdirSync(OUTPUT_DIR);
    }

    //write the content of the renderedHTML to the outpath file [team.html]
    await fs.writeFile(outputPath, renderedHtml, function (err) {
    if (err) throw err;
      console.log('Created team.html');
    });
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
