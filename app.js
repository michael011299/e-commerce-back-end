const express = require("express");
const cors = require("cors");
const app = express();
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });

const usersRouter = require("./src/routes/users");
const basketsRouter = require("./src/routes/baskets");
const addressRouter = require("./src/routes/address");
const ordersRouter = require("./src/routes/orders");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/baskets", basketsRouter);
app.use("/orders", ordersRouter);
app.use("/address", addressRouter);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));
app.use(express.json());
app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const money = req.body.totalPrice;
  const final = Math.round(money * 100);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "GBP",
      amount: final,
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const port = 4040;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
