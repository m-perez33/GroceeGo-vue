# GroceeGo

Welcome to the GroceeGo! This application is designed to help you efficiently create and manage your grocery lists. The app consists of two main parts: the Front-end and the Back-end.

This app seamlessly creates, saves, and updates shopping lists, tracking their associated costs. It simplifies the process of estimating the total cost of your shopping list.
The app integrates the Model-View-Controller (MVC) pattern and leverages the JDBC Template to ensure efficient data management.


## Why?

Why another list app? Well, I go food shopping a lot and thought it would be convenient to have a list that included cost estimates and handled products with cost by weight differently
than products with cost by item. Being able to add the estimates to the list makes it fairly easy to guess how much that trip to the store is going to cost (oops, it looks like I'm spending too much better take the Oreos off the list!). Lists can be updated later with actual costs and saved. Further development of this app will explore estimating costs for recipes and tracking spending trends.


## Front-end (Vue App)

### Features
- Command-line interface for easy interaction
- Intuitive commands for adding and managing grocery items
- Text-based user interface for simplicity

### Getting Started
1. Clone the repository
   ```bash
   git clone https://github.com/m-perez33/GroceeGo.git
   ```

2. Open the project in IntelliJ IDEA by choosing "Open" or "Import Project."
3. Locate the main class of the console app.
4. Right-click on the main class file and select "Run" to execute the application.

## Back-end (Console App)

Go to the  [GroceeGo-api](https://github.com/m-perez33/GroceeGo-api) repo for instructions on running the backend. Note that api must be running for the Front-end to work.
# latest

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
