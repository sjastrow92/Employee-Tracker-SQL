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
  db.findAllDepartments().then(({rows})=>{
    const departments = rows.map(({id, name})=>({
      name: name,
      value: id
    }))
inquirer
    .prompt([
      {
      type: "input",
      name: "title",
      message: "Enter the name of the new role"
    },
 {
      type: "input",
      name: "salary",
      message: "Enter the salary of the new role"
    },
     {
      type: "list",
      name: "department_id",
      message: "Choose the department",
      choices: departments
    }
    
    ])
    .then(({title, salary, department_id}) => {
      db.createNewRole(title, salary, department_id).then(()=>{
console.log(`Added role ${title} to the database!`);
        // restart the application
        loadMainPrompts();
      })
      });
  })
  
    }
// TODO- Create a function to View all deparments
function viewAllDepartments() {
  db.findAllDepartments().then(({rows}) => {
    //if (err) throw err;
    let dept = rows;
    console.table(rows);
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
     
      db.createNewDepartment(answer.name)
      .then(() => {
        console.log("Department Added");
        loadMainPrompts();
      })
    });
}
// TODO- Create a function to Add an employee
function addEmployee() {
  // cody example code
   db.findAllEmployees().then(({ rows }) => { // gets all employees
    const managers = rows; // stores full return of employees to the managers variable
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({ // takes the managers array and maps through it to create the choices for prompt
      
      name: `${first_name} ${last_name}`, //sets the employees first_name and last_name as what displays in the choice
      value: id // sets the employees id as the value that gets sent when selected
   }));// ends the maping of array


  inquirer
    .prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the new employee:",
    },
    // last name
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the new employee:",
    },
    //role id. list. look at cody example
    {
      type: "list",
      name: "role_id",
      message: "Enter the role of the new employee:",

    },
    // manager id. list. look at cody example
    {
      type: "list",
      name: "manager_id",
      message: "Enter the manager of the new employee:",
      choices: managerChoices
    }
    ])
    .then((answer) => {
      db.createNewEmployee(answer.first_name, answer.last_name, answer.role_id, answer,manager_id)
      .then(()=> {
        console.log(`Added employee ${answer.first_name} ${answer.first_last} to the database!`);
        // restart the application
        loadMainPrompts();
      });
    });
   })}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
