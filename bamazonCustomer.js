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

//err is error. res is the result
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table(res);
        connection.end();
    });
}

// The first should ask them the ID of the product they would like to buy.


// The second message should ask how many units of the product they would like to buy.




