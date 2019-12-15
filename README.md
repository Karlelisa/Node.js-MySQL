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

* Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. 

* The app should then prompt users with two messages:

1. The first should ask them the ID of the product they would like to buy.
2. The second message should ask how many units of the product they would like to buy.

* Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like "Insufficient quantity!", and then prevent the order from going through.

* However, if your store does have enough of the product, you should fulfill the customer's order.

* This means updating the SQL database to reflect the remaining quantity.

* Once the update goes through, show the customer the total cost of their purchase.



### My terminal screenshot of fulfilling a customer's order:

![successful customer order screenshot](/images/fulfilling-a-customers-purchase.png)


### My terminal screenshot of a customer requesting insufficient quantity and inputs YES to select another item:

![insufficient quantity screenshot](/images/insufficient-quantity-and-YES-to-selecting-another-item.png)

### My terminal screenshot of a customer requesting insufficient quantity and inputs NO to select another item:

![insufficient quantity screenshot](/images/insufficient-quantity-and-NO-to-selecting-another-item.png)


### My terminal screenshot of stock quantity updating after a successful purchase:
In the below screenshot you will see that after a purchase of 2 pairs of shoes which is item ID 3, the stock quantity of this item goes from 100 (in the first table) to 98 (in the second table). The second table reflects the remaining quantity.

![stock quantity update screenshot](/images/my-terminal-screenshot-of-stock-quantity-updating.png)


<!-- ### My mySQL Workbench screenshot of the above shoes stock quantity updating: -->
### My MySQL Workbench screenshot of updating the SQL database to reflect the remaining quantity:
The directly above stock quantity update of the shoes item ID 3 in mySQL databse to a remaining quantity of 98.

![My MySQL database screenshot](/images/mySQL-workbench-screenshot-of-the-above-shoes-item-ID-3-stock-quantity-update-to-98-units.png)


### Manager View 
Create a new Node application called bamazonManager.js. Running this application will:

* List a set of menu options:
1. View Products for Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

* If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

* If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

* If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

* If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


### My terminal screenshot of the prompt questions of the start of bamazonManager.js:

![view products for sale screenshot](/images/fulfilling-a-customers-purchase.png)


### My terminal screenshot of view products for sale:

![view products for sale screenshot](/images/fulfilling-a-customers-purchase.png)


### My terminal screenshot of view low inventory:

![view low inventory screenshot](/images/fulfilling-a-customers-purchase.png)


### My terminal screenshot of add to inventory:

![add to inventory screenshot](/images/fulfilling-a-customers-purchase.png)


### My terminal screenshot of add new product:

![add new product screenshot](/images/fulfilling-a-customers-purchase.png)



