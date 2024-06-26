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
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;
    `
    );
  }

  // TODO- Create a query to Find all employees except the given employee id
/*findAllEmployees() {
    return this.query(
     
    );
  }*/
  // TODO- Create a query to Create a new employee
createNewEmployee(first_name, last_name, role_id, manager_id) {
    return this.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]
    );
  }

  // TODO- Create a query to Update the given employee's role
updateEmployeeRole(name) {
    return this.query(
    'INSERT INTO role (name) VALUES ($2)', [name]
    );
  }

  // TODO- Create a query to Find all roles, join with departments to display the department name
findAllRoles() {
    return this.query(
      'SELECT role.id, role.title, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
    );
  }
  // TODO- Create a query to Create a new role
createNewRole(title, salary, department_id) {
    return this.query(
   'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]
    );
  }

  // TODO- Create a query to Find all departments
findAllDepartments() {
    return this.query(
      'SELECT * from department;'
    );
  }

  // TODO- Create a query to Create a new department
createNewDepartment(name) {
    return this.query(
      'INSERT INTO department (name) VALUES ($1)', [name]
    );
  }
  

}

module.exports = new DB();
