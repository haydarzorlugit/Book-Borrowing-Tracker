const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());

let books = [];
let borrowers = [];
app.use(cors());

// BOOKS

app.post("/books", (req, res) => {
    const book = { id: Date.now(), ...req.body };
    books.push(book);
    res.json(book);
});

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    res.json(book);
});

app.put("/books/:id", (req, res) => {
    let book = books.find(b => b.id == req.params.id);
    Object.assign(book, req.body);
    res.json(book);
});

app.delete("/books/:id", (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.json({ message: "Deleted" });
});


// BORROWERS

app.post("/borrowers", (req, res) => {
    const borrower = { id: Date.now(), ...req.body };
    borrowers.push(borrower);
    res.json(borrower);
});

app.get("/borrowers", (req, res) => {
    res.json(borrowers);
});

app.get("/borrowers/:id", (req, res) => {
    const borrower = borrowers.find(b => b.id == req.params.id);
    res.json(borrower);
});

app.put("/borrowers/:id", (req, res) => {
    let borrower = borrowers.find(b => b.id == req.params.id);
    Object.assign(borrower, req.body);
    res.json(borrower);
});

app.delete("/borrowers/:id", (req, res) => {
    borrowers = borrowers.filter(b => b.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running"));