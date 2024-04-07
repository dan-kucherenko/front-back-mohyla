const Employee = require('../models/Employees');

const resolvers = {
    Query: {
        employees: async () => {
            return Employee.find();
        },
        employee: async (_, {employee_id}) => {
            return Employee.findOne({employee_id: employee_id});
        },
    },
    Mutation: {
        async addEmployee(_, {newEmployee}) {
            return await new Employee(newEmployee).save();
        },

        async updateEmployee(_, {employee_id, updatedEmployee}) {
            return Employee.findOneAndUpdate({employee_id: employee_id}, {$set: updatedEmployee}, {new: false});
        },

        async deleteEmployee(_, {employee_id}) {
            return Employee.findOneAndDelete({employee_id: employee_id});
        },

        async promoteEmployee(_, {employeeId, position}) {
            return Employee.findOneAndUpdate({employee_id: employeeId}, {$set: {position}}, {new: false});
        },
    },
};

module.exports = resolvers
