//Cited: IceCream, GreatBay and PlayListRead class activties

let mysql = require("mysql");
let inquirer = require("inquirer");
require("dotenv").config()


let connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: process.env.db,
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        //console.table(res);
        //connection.end();
        start();
    });
}

function start() {
    inquirer.prompt([{
            name: "managerSelection",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }])
        .then(function (answer) {
            //based on the manager's answer, there are post functions
            if (answer.managerSelection === "View Products for Sale") {
                productsForSale();
            } else if (answer.managerSelection === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.managerSelection === "Add to Inventory") {
                //addToInventory();
            } else if (answer.managerSelection === "Add New Product") {
                //addNewProduct();
            } else {
                connection.end();
            }
        });
}

function productsForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table(res);
        connection.end();

    });
}