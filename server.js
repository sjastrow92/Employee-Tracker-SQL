const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "City of Pawnee" }).render();

  console.log(logoText);

  loadMainPrompts();
}
// TODO- Create first question user will see- "What would you like to do?"
function loadMainPrompts() {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Add a Manager",
        "Update an employee role",
        "View Employees by Manager",
        "View Employees by Department",
        "Exit",
      ],
    },
  ]).then((res) => {
    switch (res.action) {
      case "View all departments":
        viewAllDepartments();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Add a Manager":
        addManager();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
      case "View Employees by Manager":
        viewEmployeesByManager();
        break;
      case "View Employees by Department":
        viewEmployeesByDepartment();
        break;
      case "Delete Departments | Roles | Employees":
        deleteDepartmentsRolesEmployees();
        break;
      case "View the total utilized budget of a department":
        viewTotalUtilizedBudgetOfDepartment();
        break;
      case "Exit":
        connection.end();
        console.log("Goodbye!");
        break;
    }
    // TODO- Create a variable to store the user's choice
    // TODO- Create a switch statement to call the appropriate function depending on what the user chose
  });
}

// TODO- Create a function to View all employees

function viewAllEmployees() {
 /* db.findAllEmployees().then((err, res) => {
    if (err) throw err;
    console.table(res);
    // restart the application
    loadMainPrompts();
  });*/

  db.findAllEmployees().then(({ rows }) => {
    let emp = rows;
    console.table(emp);
  })
  .then(() => loadMainPrompts());
}

// BONUS- Create a function to View all employees that belong to a department

// BONUS- Create a function to View all employees that report to a specific manager

// BONUS- Create a function to Delete an employee

// TODO- Create a function to Update an employee's role
function updateEmployeeRole() {
  db.updateEmployeeRole().then(({rows}) => {
    // if (err) throw err;
    console.table(roles);
    // restart the application
    loadMainPrompts();
  });
}

// BONUS- Create a function to Update an employee's manager

// TODO- Create a function to View all roles
function viewAllRoles() {
  db.findAllRoles().then(({rows}) => {
    //if (err) throw err;
    let roles = rows;
    console.table(roles);
    // restart the application
    loadMainPrompts();
  });
}
// TODO- Create a function to Add a role
function addRole() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the new department:",
    })
    .then((answer) => {
      console.log(answer.name);
      const query = `INSERT INTO  (role_name) VALUES ("${answer.name}")`;
      db.query(query, (err, res) => {
        if (err) throw err;
        console.log(`Added role ${answer.name} to the database!`);
        // restart the application
        loadMainPrompts();
        console.log(answer.name);
      });
    });
}
// BONUS- Create a function to Delete a role

// TODO- Create a function to View all deparments
function viewAllDepartments() {
  db.findAllDepartments().then(({rows}) => {
    //if (err) throw err;
    let dept = rows;
    console.table(dept);
    // restart the application
    loadMainPrompts();
  });
}
// TODO- Create a function to Add a department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the new department:",
    })
    .then((answer) => {
      /*console.log(answer.name);
      const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
      db.query(query, (err, res) => {
        if (err) throw err;
        console.log(`Added department ${answer.name} to the database!`);
        // restart the application
        loadMainPrompts();
        console.log(answer.name);
      });*/
      db.createNewDepartment(answer.name)
      .then(() => {
        console.log("Department Added");
        loadMainPrompts();
      })
    });
}

// BONUS- Create a function to Delete a department

// BONUS- Create a function to View all departments and show their total utilized department budget

// TODO- Create a function to Add an employee
function addEmployee() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the new employee:",
    })
    .then((answer) => {
      console.log(answer.name);
      const query = `INSERT INTO employee (employee_name) VALUES ("${answer.name}")`;
      db.query(query, (err, res) => {
        if (err) throw err;
        console.log(`Added employee ${answer.name} to the database!`);
        // restart the application
        loadMainPrompts();
        console.log(answer.name);
      });
    });
}
// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
