var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});
//initial connection
connection.connect(function (err) {
    if (err) throw err;
    managerPrompt();
});

//functions
function managerPrompt() {
    inquirer
        .prompt([{
            name: "managerSelection",
            type: "list",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }])
        .then(function (answer) {
            switch (answer.managerSelection) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function viewInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("Inventory for " + res[i].product_name + " looks a little low, see below!");
                console.log(res[i]);
            } else {
                console.log("Inventory for " + res[i].product_name + " looks good!");
            }
        }
        connection.end();
    });
};

function addInventory() {
    inquirer
        .prompt([{
            name: "addId",
            type: "input",
            message: "What is the ID of the item you would like to add inventory to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "addQuantity",
            type: "input",
            message: "What would you like the stock quantity to be for this item?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function (answer) {
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: answer.addQuantity
                    },
                    {
                        item_id: answer.addId
                    }
                ],
                function (err, res) {
                    console.log("Item id: " + answer.addId + "\nStock Quantity: " + answer.addQuantity);
                    connection.end();
                }
            );
        });
};

function newProduct() {
    inquirer
        .prompt([{
            name: "newProduct",
            type: "input",
            message: "What product would you like to add?",
        },
        {
            name: "newDepartment",
            type: "input",
            message: "What department does this product belong to?",
        },
        {
            name: "newPrice",
            type: "input",
            message: "How much does this product cost?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "newStock_quantity",
            type: "input",
            message: "How many units of this product should we stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function (answer) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.newProduct,
                    department_name: answer.newDepartment,
                    price: answer.newPrice,
                    stock_quantity: answer.newStock_quantity
                },
                function (err, res) {
                    console.log("worked");
                    connection.end();
                }
            );
        });
};