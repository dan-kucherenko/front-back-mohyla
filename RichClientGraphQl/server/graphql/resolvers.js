const Employee = require('../models/Employees');

const resolvers = {
    Query: {
        employees: async (_, args) => {
            let filter = {};

            if (args.department) {
                filter.department = args.department;
            }

            if (args.position) {
                filter.position = args.position;
            }

            if (args.employee_id) {
                const employee = await Employee.findOne({ employee_id: args.employee_id });
                if (!employee) {
                    throw new Error("Employee not found.");
                }
                return [employee]; // Return as an array for consistency
            }
            return await Employee.find(filter);
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
    },
};

module.exports = resolvers
