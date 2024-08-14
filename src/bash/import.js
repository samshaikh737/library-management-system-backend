const fs = require('fs');
const path = require('path');


const dotenv = require("dotenv");
dotenv.config({ path: 'src/config/config.env' });


const db = require('../config/database');
db.sync({ alter: true }).then(() => {
    const sequelize = db;


    //----------------------------------------------------
    const Branch = require("../models/branch");
    const Book = require("../models/books");
    const User = require("../models/user");
    const Checkout = require("../models/checkout");
    const Transfer = require("../models/transfer");



    // Function to import data
    const importData = async () => {
        try {
            // Connect to the database
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            // Read and parse the JSON file
            const branchPath = path.join(__dirname, 'branch.json');
            const branchData = JSON.parse(fs.readFileSync(branchPath, 'utf8'));

            // Insert data into the database
            await Branch.bulkCreate(branchData);
            console.log('Branch has been imported successfully.');

            // Read and parse the JSON file
            const bookPath = path.join(__dirname, 'books.json');
            const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf8'));

            // Insert data into the database
            await Book.bulkCreate(bookData);
            console.log('Book has been imported successfully.');

            // Read and parse the JSON file
            const userPath = path.join(__dirname, 'user.json');
            const userData = JSON.parse(fs.readFileSync(userPath, 'utf8'));

            // Insert data into the database
            await User.bulkCreate(userData);
            console.log('User has been imported successfully.');


            // Read and parse the JSON file
            const checkoutPath = path.join(__dirname, 'checkouts.json');
            const checkoutData = JSON.parse(fs.readFileSync(checkoutPath, 'utf8'));

            // Insert data into the database
            await Checkout.bulkCreate(checkoutData);
            console.log('Checkout has been imported successfully.');


            // Read and parse the JSON file
            const transferPath = path.join(__dirname, 'transfer.json');
            const transferData = JSON.parse(fs.readFileSync(transferPath, 'utf8'));

            // Insert data into the database
            await Transfer.bulkCreate(transferData);
            console.log('Transfer has been imported successfully.');

        } catch (error) {
            console.error('Error importing data:', error);
        } finally {
            await sequelize.close();
        }
    };

    importData();

})

