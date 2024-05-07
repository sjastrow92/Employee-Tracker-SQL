const pool = require("./connection");

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // TODO- Create a query to Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.query(
      `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `
    );
  }

  // TODO- Create a query to Find all employees except the given employee id
findAllEmployees() {
    return this.query(
      `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `
    );
  }
  // TODO- Create a query to Create a new employee
createNewEmployee() {
    return this.query(
    
    );
  }
  // BONUS- Create a query to Remove an employee with the given id

  // TODO- Create a query to Update the given employee's role
updateEmployeeRole() {
    return this.query(
    
    );
  }
  // BONUS- Create a query to Update the given employee's manager

  // TODO- Create a query to Find all roles, join with departments to display the department name
findAllRoles() {
    return this.query(
    
    );
  }
  // TODO- Create a query to Create a new role
createNewRole() {
    return this.query(
   
    );
  }
  // BONUS- Create a query to Remove a role from the db

  // TODO- Create a query to Find all departments
findAllDepartments() {
    return this.query(
   
    );
  }
  // BONUS- Create a query to Find all departments, join with employees and roles and sum up utilized department budget

  // TODO- Create a query to Create a new department
createNewDepartment() {
    return this.query(
    
    );
  }
  // BONUS- Create a query to Remove a department

  // BONUS- Create a query to Find all employees in a given department, join with roles to display role titles

  // BONUS- Create a query to Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB();
