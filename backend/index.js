import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/bookRoutes.js';
import cors from "cors";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to my Book-store Project")
});

app.use(cors());

app.use('/books', booksRoute)

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("App connected to the database");
        app.listen(PORT, () => {
            console.log(`App is running at ${PORT}`);
        });
        
    })
    .catch((error) => {
        console.log(error);
    });

