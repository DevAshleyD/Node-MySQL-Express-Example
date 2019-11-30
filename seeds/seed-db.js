// Import Database Models
// =============================================================
const db = require('../models');

// Syncing our sequelize models 
        // KEEP IN MIND that mySQL uses double quotes for strings

// =============================================================

const items = [
    {
        product_name: "Dell Notebook",
        department_name: 'Computers',
        price: 499.99,
        stock_quantity: 10
    }, {
        product_name: "SanDisk Flash Drive",
        department_name: 'Computers',
        price: 69.99,
        stock_quantity: 100
    }, {
        product_name: "Samsonite Messenger Bag",
        department_name: 'Accessories',
        price: 79.99,
        stock_quantity: 15
    }, {
        product_name: "Apple Airpods",
        department_name: 'Electronics',
        price: 129.99,
        stock_quantity: 20
    }, {
        product_name: "Apple MacBook",
        department_name: 'Computers',
        price: 1499.99,
        stock_quantity: 18
    }, {
        product_name: "JBL Headphones",
        department_name: 'Electronics',
        price: 299.99,
        stock_quantity: 25
    }, {
        product_name: "LG Tablet",
        department_name: 'Electronics',
        price: 299.99,
        stock_quantity: 25
    }, {
        product_name: "Canon Camera",
        department_name: "Imaging Devices",
        price: 129.99,
        stock_quantity: 50
    }, {
        product_name: 'Apple iPad',
        department_name: 'Electronics',
        price: 399.99,
        stock_quantity: 10
    }, {
        product_name: "Apple iPhone",
        department_name: "Mobile Phones",
        price: 899.99,
        stock_quantity: 35
    },
];

db.sequelize.sync({ force: true }).then(function () {
    db.Product.bulkCreate(items)
        .then(function (rows) {
            console.log("\n\nINSERTED\n\n");
            db.sequelize.close();
        })
        .catch(function(err) {
            console.log("\n\nError:", err);
            db.sequelize.close();
        });
});