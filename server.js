// ___________ creating server ____________________________
const express = require("express");
const app = express(); // it will create a instance of express server (in our case it is app)

// ___________ connecting server to database ________________
const Sequelize = require("sequelize");

const sequelize = new Sequelize("pre_ragam", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("done");
  })
  .catch(() => {
    console.log("error");
  });


// _________________define modles_____________________

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

sequelize.sync({ forced: true }).then(() => {
  console.log("databases synced !");

  // Product.create({
  //   id: 1,
  //   name: "product 1",
  //   description: "this is the product 1",
  //   cost: 5000
  // }),

  // Product.bulkCreate([
  //   {
  //     id: 2,
  //     name: "prduct 2",
  //     description: "this is product 2",
  //     cost: 4000
  //   }, {
  //     id: 3,
  //     name: "product 3",
  //     description: "this is a new brand mobile phone ",
  //     cost: 40000
  //   }
  // ])
});

// ___________ making route for server __________________

// making route for the home page
app.get("/home", (req, res) => {
  // console.log()
  res.status(200).send({
    message: "welcome to pre_ragam ecoom home page",
  });
});

// making route to get all prodoucts

app.get("/products", (req, res) => {
  let promise;

  promise = Product.findAll();

  promise.then((products) => {
    res.status(200).send(products);
  });

  // sequelize.findALl

  // res.status(200).send(products);
});

// making route to get a product on the basis of given product id

app.get("/product/:id", (req, res) => {
  let productId = req.params.id;
  let prmoise;
  prmoise = Product.findByPk(productId);

  prmoise
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send("error while fetching data from product table");
    });
});

// ___________ starting server ____________________

app.listen(4000, () => {
  console.log("server started at port 4000");
});
