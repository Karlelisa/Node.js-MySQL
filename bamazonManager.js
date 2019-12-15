//Cited: IceCream, GreatBay and PlayListRead class activties
//Cited: https://medium.com/javascript-in-plain-english/building-a-point-of-sale-system-with-node-react-c2c0395ccaca and https://docs.microsoft.com/en-us/azure/mysql/connect-nodejs. For more info on functions for node.js and MySQL.

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


//Function of the list of menu options for the manager to choose from
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
                addToInventory();
            } else if (answer.managerSelection === "Add New Product") {
                addNewProduct();
            } else {
                connection.end();
            }
        });
}


// Function of if a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function productsForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table(res);
        //connection.end();
        console.log("--------------------------------------------------------------------")
        console.log("--------------------------------------------------------------------")
        start();

    });
}

// Function of if a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("--------------------------------------------------------------------")
        console.log("--------------------------------------------------------------------")
        start();
    });
}


// Function of if a manager selects Add to Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {

    connection.query("SELECT product_name, stock_quantity FROM products",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("-----------------------------------------------------------------------------")

            inquirer
                .prompt([{
                        name: "product_name",
                        type: "input",
                        message: "From the above current product list, what is the name of the product you want to add more quantity too?",
                    },
                    {
                        name: "stock_quantity",
                        type: "input",
                        message: "What is the amount of quantity would like to add?",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }
                ])
                .then(function (answer) {
                    let currentQty;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.product_name) {
                            currentQty = res[i].stock_quantity;
                        }
                    }
                    connection.query('UPDATE Products SET ? WHERE ?', [{
                            stock_quantity: currentQty + parseInt(answer.stock_quantity)
                        },
                        {
                            product_name: answer.product_name
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log('All set! The quantity was updated. Please view products for sale to see the update.');
                        console.log("--------------------------------------------------------------------")
                        console.log("--------------------------------------------------------------------")
                        start();
                    });
                })

        })
}




// Function of if a manager selects Add New Product, the manager can to add a completely new product to the store.
function addNewProduct() {
    inquirer
        .prompt([{
                name: "product_name",
                type: "input",
                message: "What is the name of the new product you would like to add?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What is the department name of the new product?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the new product?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How much quantity does this product have?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new product information was successfully added to the store!");
                    console.log("--------------------------------------------------------------------")
                    console.log("--------------------------------------------------------------------")
                    start();
                }
            );
        });

}