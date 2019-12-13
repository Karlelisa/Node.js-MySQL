//Cited: IceCream and GreatBay class activties

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
    start();
});


//err is error. res is the result
// function afterConnection() {
//     connection.query("SELECT * FROM products", function (err, res) {
//             if (err) throw err;
//             console.log(res);
//             console.table(res);
//             connection.end();

//             // for (var i = 0; i < res.length; i++) {
//             //     console.log("ID: " + res[i].item_ID + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
//             //     console.log('--------------------------------------------------------------------------------------------------')

//             // }

//         }
//     }
// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

function start() {
    //prints the items for sale and their details
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        console.log("~ Welcome To Bamazon! ~")
        console.table(res);

        // console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._')
        // console.log('----------------------------------------------------------------------------------------------------')

        //for (let i = 0; i < res.length; i++) {
        //console.table(res[i].item_id + res[i].product_name + res[i].department_name + res[i].price);
        //     console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        //     console.log('--------------------------------------------------------------------------------------------------')
        //}

        // console.log(' ');
        inquirer.prompt([{
                type: "input",
                name: "id",
                message: "What is the item ID number of the product you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "qty",
                message: "How much would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (ans) {
            var whatToBuy = (ans.id) - 1;
            var howMuchToBuy = parseInt(ans.qty);
            var grandTotal = parseFloat(((res[whatToBuy].price) * howMuchToBuy).toFixed(2));

            //check if quantity is sufficient
            if (res[whatToBuy].stock_quantity >= howMuchToBuy) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE Products SET ? WHERE ?", [{
                        stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)
                    },
                    {
                        item_id: ans.id
                    }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                });

                connection.query("SELECT * FROM Departments", function (err, deptRes) {
                    if (err) throw err;
                    var index;
                    for (var i = 0; i < deptRes.length; i++) {
                        if (deptRes[i].department_name === res[whatToBuy].department_name) {
                            index = i;
                        }
                    }

                    //updates totalSales in departments table
                    connection.query("UPDATE Departments SET ? WHERE ?", [{
                            TotalSales: deptRes[index].TotalSales + grandTotal
                        },
                        {
                            department_name: res[whatToBuy].department_name
                        }
                    ], function (err, deptRes) {
                        if (err) throw err;
                        //console.log("Updated Dept Sales.");
                    });
                });

            } else {
                console.log("Sorry, there's not enough in stock!");
            }

            reprompt();
        })
    })
}

//If there is not enough in stock, ask user if they would like to purchase another item
function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (ans) {
        if (ans.reply) {
            start();
        } else {
            console.log("See you soon!");
            connection.end();
        }
    });
}

start();