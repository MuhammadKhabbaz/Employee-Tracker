const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
      // MySQL username,
        user: 'root',
      // MySQL password
        password: '',
        database: 'business_db'
    },
    console.log(`Connected to the classlist_db database.`)
);
const questions = [
    {
        type:"rawlist",
        message:"what action do you wish to perform",
        choices:["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        name: "action"
    }
]
const newDepartment = [
    {
        type: "input",
        message: "Enter the name of the new department",
        name: "departmentname"
    }
]
const newRole = [
    {
        type: "input",
        message: "enter the name of the new role",
        name: "rolename"
    },
    {
        type: "number",
        message: "what in the salary of this role?",
        name: "rolesalary"
    },
    {
        type: "input",
        message: "what department is this role part of",
        name: "roledepartment"
    }
]
const newEmployee = [
    {
        type:"input",
        message:"Enter the employee's first name",
        name: "firstname"
    },
    {
        type:"input",
        message:"Enter the employee's last name",
        name: "lastname"
    },
    {
        type:"input",
        message:"Enter the employee's job role",
        name: "jobrole"
    },
    {
        type:"input",
        message:"Enter the employee's department",
        name: "department"
    },
    {
        type:"number",
        message:"Enter the employee's salary",
        name: "salary"
    },
    {
        type:"input",
        message:"Enter the employee's manager",
        name: "manager"
    }
]
function promptUpdateEmployeeRole() {
    db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees", function (err, employees) {
        if (err) {
            console.error("Error fetching employees:", err);
            return;
        }

        inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Select an employee to update their role:",
                choices: employees.map(employee => ({
                    name: employee.name,
                    value: employee.id
                }))
            },
            {
                type: "input",
                name: "newJobRole",
                message: "Enter the new job role for the employee:"
            }
        ]).then(updateData => {
            updateEmployeeRole(updateData);
        });
        
    });
}
function updateEmployeeRole(updateData) {
    const updateQuery = `UPDATE employees SET job_role = ? WHERE id = ?`;

    db.query(updateQuery, [updateData.newJobRole, updateData.employeeId], function (err, results) {
        if (err) {
            console.error("Error updating employee role:", err);
        } else {
            console.log(`Employee's role updated successfully.`);
            db.query("select * from employees", function (err, results){
                console.table(results);
            })
        }
    });
}

function init () {
    inquirer.prompt(questions).then(data => {
        console.log(data);
        console.log(data.action)
        if (data.action==="view all departments"){
            db.query("select * from departments", function (err, results){
                console.table(results);
            })
        }else if (data.action==="view all roles"){
            db.query("select * from roles", function (err, results){
                console.table(results);
            })
        }else if (data.action==="view all employees"){
            db.query("select * from employees", function (err, results){
                console.table(results);
            })
        }else if (data.action==="add a department"){
            inquirer.prompt(newDepartment).then(departmentdata => {
                console.log(departmentdata);
                const query = `INSERT INTO departments (department_name) VALUES (?)`;
                db.query(query, [departmentdata.departmentname], function (err, results) {
                    if (err) {
                        console.error("Error adding new department:", err);
                    } else {
                        console.log(`New department '${departmentdata.departmentname}' added successfully.`)
                        db.query("select * from departments", function (err, results){
                            console.table(results);
                        })
                    }
                });
            })
        }else if (data.action==="add a role"){
            inquirer.prompt(newRole).then(roledata => {
                console.log(roledata);
                const query = `INSERT INTO roles (title, salary, department) VALUES (?)`;
                db.query(query, [roledata.rolename, roledata.rolesalary, roledata.roledepartment], function (err, results) {
                    if (err) {
                        console.error("Error adding new role:", err);
                    } else {
                        console.log(`New role '${roledata.rolename}' added successfully.`)
                        db.query("select * from roles", function (err, results){
                            console.table(results);
                        })
                    }
                });
            })
        }else if (data.action==="add an employee"){
            inquirer.prompt(newEmployee).then(employeedata => {
                console.log(employeedata);
                const query = `INSERT INTO employees (first_name, last_name, job_role, department, salary, manager) VALUES (?)`;
                db.query(query, [employeedata.firstname, employeedata.lastname, employeedata.jobrole, employeedata.department, employeedata.salary, employeedata.manager], function (err, results) {
                    if (err) {
                        console.error("Error adding new employee:", err);
                    } else {
                        console.log(`New role '${employeedata.firstname} ${employeedata.lastname}'  added successfully.`)
                        db.query("select * from employees", function (err, results){
                            console.table(results);
                        })
                    }
                });
            })
        }else if (data.action==="update an employee role"){
            promptUpdateEmployeeRole();
            
        }
    })
}
init();
