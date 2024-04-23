# GroceeGo

Welcome to the GroceeGo! This application is designed to help you efficiently create and manage your grocery lists. The app consists of two main parts: the Front-end and the Back-end.

This app seamlessly creates, saves, and updates shopping lists, tracking their associated costs. It simplifies the process of estimating the total cost of your shopping list.
The app integrates the Model-View-Controller (MVC) pattern and leverages the JDBC Template to ensure efficient data management.


## Why?

Why another list app? Well, I go food shopping a lot and thought it would be convenient to have a list that included cost estimates and handled products with cost by weight differently
than products with cost by item. Being able to add the estimates to the list makes it fairly easy to guess how much that trip to the store is going to cost (oops, it looks like I'm spending too much better take the Oreos off the list!). Lists can be updated later with actual costs and saved. Further development of this app will explore estimating costs for recipes and tracking spending trends.


## Front-end (Vue App)

### Features
- Easy to use single page application design
- Intuitive interface for adding and managing grocery items
- Nav bar designed to navigate multiple grocery lists and create/delete grocery lists

### Getting Started
1. Clone the repository
   ```bash
   git clone https://github.com/m-perez33/GroceeGo-vue.git
   ```

2. Project Setup

     ```bash
    npm install
    ```

3. Open a terminal window and run app from the folder by typing:

    ```bash
    npm run dev
    ```

4. Make sure the port location matches the location defined in the api. Currently it is set to http://localhost:5173/. 


If you run the Vue app on another port, you must change the port in the api. 
Please do the following to change the port.

1. Navigate to GroceeGoServer class in the [GroceeGo-api](https://github.com/m-perez33/GroceeGo-api) code.
2. On line 26 change the address on this line to the address the Vue app is running on 


    ```bash
   config.setAllowedOrigins(Collections.singletonList("http://localhost:5173/"));
    ```
3. Run the api and you should be connected! 

## Back-end

Go to the  [GroceeGo-api](https://github.com/m-perez33/GroceeGo-api) repo for instructions on running the back-end. Note that api must be running for the front-end to work.


