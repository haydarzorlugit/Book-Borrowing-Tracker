import React, { useEffect, useState } from "react";

function App() {
    const [books, setBooks] = useState([]);
    const [borrowers, setBorrowers] = useState([]);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const [borrowerName, setBorrowerName] = useState("");
    const [bookId, setBookId] = useState("");

    useEffect(() => {
        fetchBooks();
        fetchBorrowers();
    }, []);

    const fetchBooks = async () => {
        const res = await fetch("http://localhost:3000/books");
        const data = await res.json();
        setBooks(data);
    };

    const fetchBorrowers = async () => {
        const res = await fetch("http://localhost:3000/borrowers");
        const data = await res.json();
        setBorrowers(data);
    };

    const addBook = async () => {
        await fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, author }),
        });

        setTitle("");
        setAuthor("");

        fetchBooks();
    };

    const addBorrower = async () => {
        await fetch("http://localhost:3000/borrowers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: borrowerName,
                borrowDate: "2026-05-16",
                returnDate: null,
                bookId: Number(bookId),
            }),
        });

        setBorrowerName("");
        setBookId("");

        fetchBorrowers();
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>📚 Book Borrowing Tracker</h1>

            <hr />

            <h2>Add Book</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <button onClick={addBook}>Add Book</button>

            <h2>Books</h2>

            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} - {book.author} (ID: {book.id})
                    </li>
                ))}
            </ul>

            <hr />

            <h2>Add Borrower</h2>

            <input
                placeholder="Borrower Name"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
            />

            <input
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
            />

            <button onClick={addBorrower}>Add Borrower</button>

            <h2>Borrowers</h2>

            <ul>
                {borrowers.map((b) => (
                    <li key={b.id}>
                        {b.name} borrowed book ID {b.bookId}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;