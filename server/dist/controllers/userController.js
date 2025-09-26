"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: '2024-01-02T00:00:00Z'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        createdAt: '2024-01-03T00:00:00Z'
    }
];
const getAllUsers = (req, res) => {
    try {
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching user' });
    }
};
exports.getUserById = getUserById;
const createUser = (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        const newUser = {
            id: users.length + 1,
            name,
            email,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating user' });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map