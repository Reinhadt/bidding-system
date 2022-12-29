const express = require("express");
const app = express();
const PORT = 4000;
const fs = require("fs");
const { findProduct } = require("./utils/utils");

const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const rawData = fs.readFileSync("data.json");
const productData = JSON.parse(rawData);

app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);
  socket.on("disconnect", () => {
    console.log("user has disconnected");
  });

  socket.on("addProduct", (data) => {
    productData["products"].push(data);
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile("data.json", stringData, (err) => {
      console.log(err);
    });

    socket.broadcast.emit('addProductResponse', data)
  });

  socket.on("bidProduct", (data) => {
    console.log(data)
    findProduct(
      data.name,
      productData["products"],
      data.last_bidder,
      data.amount,
      productData
    );

    socket.broadcast.emit('bidProductResponse', data)
  });
});

app.get("/api", (req, res) => {
  res.json(productData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
