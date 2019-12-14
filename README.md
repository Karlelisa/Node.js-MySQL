# Node.js-MySQL
## BAMAZON
In this homework assignment, I created an Amazon-like storefront with the MySQL and Node.js. The app will take in orders from customers and deplete stock from the store's inventory. The app needs MySQL and Inquirer npm packages for data input and storage.

### Customer View 

* Create a MySQL Database called bamazon.

* Then create a Table inside of that database called products.

* The products table should have each of the following columns:

1. item_id (unique id for each product)
2. product_name (Name of product)
3. department_name
4. price (cost to customer)
5. stock_quantity (how much of the product is available in stores)

* Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

* Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

* The app should then prompt users with two messages:

1. The first should ask them the ID of the product they would like to buy.
2. The second message should ask how many units of the product they would like to buy.

* Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

* However, if your store does have enough of the product, you should fulfill the customer's order.

* This means updating the SQL database to reflect the remaining quantity.

* Once the update goes through, show the customer the total cost of their purchase.



### My terminal screenshot of fulling a customer's order:

![successful customer order screenshot](/images/concert-this.png)


### My terminal screenshot of a customer requesting insufficient quantity:

![insufficient quantity screenshot](/images/spotify-this-song.png)

<!-- 
### My movie-this terminal screenshot:

![movie-this screenshot](/images/movie-this.png)
![movie-this screenshot](/images/movie-this2.png)


### My do-what-it-says terminal screenshot:

![do-what-it-says screenshot](/images/do-what-it-says.png) -->