const express=require('express')
const Book = require('../model/bookModel.js')

const router=express.Router();


router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})
// get request for single books
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

// Route for Uploading the books
router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (
            !title || !author || !publishYear) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newBook = await Book.create({
            title, author, publishYear
        })

        res.status(200).json({
            success: true,
            message: "BOOK created Successfully",
            newBook
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

// route for UPDAting the books
router.put("/:id", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (
            !title || !author || !publishYear) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        const {id}=req.params;
        const updatebook=await Book.findByIdAndUpdate(id,req.body);
        if(!updatebook){
            return res.status(403).json({
                success:false,
                message:"BOOK NOT FOUND"
            })
        }

        return res.status(200).json({
            success:true,
            message:"BOOK updated successfully"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

// deleting a Book
router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteBook=await Book.findByIdAndDelete(id)
        if(!deleteBook){
            res.status(403).json({
                message:"Book Not found"
            });
        }
        res.status(202).json({
            success:true,
            message:"Book Deleted Successfully"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

module.exports=router;