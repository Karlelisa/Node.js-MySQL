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


// Running this application will first display all of the items available for sale. 

function start() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        console.log("~.~.~.~.~.~.~.~.~.~.~.~.~.~.~ Welcome To Bamazon! ~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~")
        // I'm using console.table() to nicely display the data of all of the items. Using this automatically populates an irrelevant  index column for this assignment.
        console.table(res);
        // console.log('--------------------------------------------------------------------------------------------------')


        // for (let i = 0; i < res.length; i++) {
        //     console.table("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        //     console.log('--------------------------------------------------------------------------------------------------')
        // }



        // The first message should ask them the ID of the product they would like to buy.
        inquirer.prompt([{
                name: "id",
                type: "input",
                message: "What is the item ID number of the product you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                // The second message should ask how many units of the product they would like to buy.
                name: "qty",
                type: "input",
                message: "How much would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (answer) {
            let itemsToPurchase = (answer.id) - 1;
            let howMuchToPurchase = parseInt(answer.qty);
            //Cited for the .toFixed(2) function: https://www.w3schools.com/jsref/jsref_tofixed.asp. Converting a number into a string, keeping only two decimals.
            let grandTotal = parseFloat(((res[itemsToPurchase].price) * howMuchToPurchase).toFixed(2));

            // function to check if quantity is sufficient
            if (res[itemsToPurchase].stock_quantity >= howMuchToPurchase) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE Products SET ? WHERE ?", [{
                        stock_quantity: (res[itemsToPurchase].stock_quantity - howMuchToPurchase)
                    },
                    {
                        item_id: answer.id
                    }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Order Received! Your total is $" + grandTotal.toFixed(2) + ". Thank you for your purchase!");
                    connection.end();
                });

                // connection.query("SELECT * FROM Departments", function (err, deptRes) {
                //     if (err) throw err;
                //     let index;
                //     for (let i = 0; i < deptRes.length; i++) {
                //         if (deptRes[i].department_name === res[whatToBuy].department_name) {
                //             index = i;
                //         }
                //     }

                //     //updates totalSales in departments table
                //     connection.query("UPDATE Departments SET ? WHERE ?", [{
                //             TotalSales: deptRes[index].TotalSales + grandTotal
                //         },
                //         {
                //             department_name: res[whatToBuy].department_name
                //         }
                //     ], function (err, deptRes) {
                //         if (err) throw err;
                //         //console.log("Updated Dept Sales.");
                //     });
                // });

            } else {
                console.log("Sorry, there's not enough in stock!");
                reprompt();
            }
        })
    })
}

//If there is not enough in stock, ask user if they would like to purchase another item
function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (answer) {
        if (answer.reply) {
            start();
        } else {
            console.log("Thanks for stopping by. Come back soon!");
            connection.end();
        }
    });
}

//start();