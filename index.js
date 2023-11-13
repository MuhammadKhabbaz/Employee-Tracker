const inquirer = require("inquirer");
const questions = [
    {
        type:"rawlist",
        message:"what action do you wish to perform",
        choices:["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        name: "action"
    }
]
function init () {
    inquirer.prompt(questions).then(data => {
        console.log(data);
    })
}