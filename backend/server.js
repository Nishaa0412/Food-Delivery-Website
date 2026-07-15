const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb://127.0.0.1:27017/fooddelivery"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Food = mongoose.model(
    "Food",
    new mongoose.Schema({
        name: String,
        price: Number,
        image: String
    })
);

app.get("/api/foods", async (req, res) => {

    const foods = await Food.find();

    res.json(foods);
});

app.post("/api/foods", async (req, res) => {

    const food = new Food(req.body);

    await food.save();

    res.json({
        message: "Food Added"
    });
});

app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});