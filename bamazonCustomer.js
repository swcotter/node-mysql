var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "RoloPolo1",
    database: "bamazon_DB"
});
//initial connection
connection.connect(function (err) {
    if (err) throw err;
    displayOptions();
});

inquirer
  .prompt([
      
    {
        name: 'itemId',
        type:'list',
    message: "What would you like today?",
choices: ["clothing", "sports", "electronics", "swimwear"]} 

    /* Pass your questions in here */
  ])
  .then(answers => {
      console.log(answers);
    // Use user feedback for... whatever!!
  });






//functions
function displayOptions() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        orderInput();
    });
};

function orderInput() {
    inquirer
        .prompt([{
            name: "buyId",
            type: "input",
            message: "What is the ID of the item you would like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "askQuantity",
            type: "input",
            message: "How many units would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function (answer) {
            var query = "SELECT stock_quantity, price FROM products WHERE ?";
            connection.query(query, { item_id: answer.buyId }, function (err, res) {
                if (err) throw err;
                var itemQuantity = res[0].stock_quantity;
                var itemPrice = res[0].price;
                if (itemQuantity >= answer.askQuantity) {
                    processOrder(itemQuantity, answer.askQuantity, answer.buyId, itemPrice);
                } else {
                    console.log("We only have " + itemQuantity + " left. Looks like we can't process your order. Sorry for the inconvenience!")
                    orderInput();
                }
            });
        });
};

function processOrder(databaseQuantity, promptAskQuantity, id, price) {
    var newQuantity = databaseQuantity - promptAskQuantity;
    var priceTotal = price * promptAskQuantity;
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query,
        [{
                stock_quantity: newQuantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log("Order has been placed! Your total is $" + priceTotal);
            connection.end();
        }
    )
};