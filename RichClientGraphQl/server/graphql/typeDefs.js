const {gql} = require('apollo-server');

const typeDefs = gql`
  # Defines a custom scalar type for Date
  scalar Date

  # Employee Type
  type Employee {
    employee_id: ID!
    first_name: String!
    last_name: String!
    email: String!
    age: Int
    position: String!
    department: String!
    country_support: String!
    contract_type: String!
    gender: String
    hire_date: Date
    salary: String
  }
  
  input EmployeeInput {
    employee_id: Int!
    first_name: String!
    last_name: String!
    email: String!
    age: Int
    position: String!
    department: String!
    country_support: String!
    contract_type: String!
    gender: String
    salary: String
  }
  
  input UpdatedEmployee {
    first_name: String!
    last_name: String!
    email: String!
    position: String!
    department: String!
    country_support: String!
    contract_type: String!
    salary: String
  }
  
  type Query {
    employees(department: String, position: String, employee_id: ID): [Employee]
#    employees: [Employee]
#    employee(employee_id: Int!): Employee
  }

  type Mutation {
    addEmployee(newEmployee: EmployeeInput): Employee
    updateEmployee(employee_id: Int!, updatedEmployee: UpdatedEmployee): Employee
    deleteEmployee(employee_id: Int!): Boolean
  }
`;

module.exports = typeDefs;
