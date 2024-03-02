import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for Saving
router.post('/', async (req,res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.log(err.messsage)
        res.status(500).send({message:err.message})
    }
});

//Route for getting all the books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).send({messsage:err.message})
    }

});

//Routes for getting a certain book with an ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const books = await Book.findById(id);
        res.status(200).json(books);

    } catch (err) {
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
}); 

//Routes for updating a certain book with an ID
router.put('/:id', async(req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        
        if(!result) {
            return res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).send({message: 'Book updated successfully'});

    } catch(err){
        console.log(err.message)
        res.status(200).send({message: err.message})
    }
});

//Routes for deleting a certain book with an ID
router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({message:"Book not found"});
        }

        return res.status(200).send({message:'Book deleted sucessfully'});

    } catch(err) {
        console.log(err.message)
        res.status(200).send({message:err.message})
    }
});

export default router;