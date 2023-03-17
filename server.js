const express = require('express')

const { sequelize, User, Borrower, Book } = require('./models')

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).send(`<h1> library system </h1>`);
});



// AUTHOR SECTION

app.post('/users', async (req, res) => {
    const { name, email } = req.body

    try {
        const user = await User.create({ name, email })

        res.status(201).json({
            message: "author created successfully",
            data: user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

// get all authors

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()

        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});

// get author by id

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({
            where: { id },
        })

        return res.json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})


// BOOK SECTION
// create a book

app.post('/books', async (req, res) => {
    const { author_id, bookTitle, bookGenre, ISBN } = req.body

    try {
        const user = await User.findOne({ where: { id: author_id } })

        if (!user) {
            return res.status(404).json({
                message: `this user id: ${author_id} was not found`
            });
        }
        const books = await Book.create({ bookTitle, bookGenre, ISBN, author_id: user.id })

        // return res.json(book)
        return res.status(201).json({
            message: "new book created successfully",
            data: books
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

})

// get all books
app.get('/allbooks', async (req, res) => {
    try {
        const books = await Book.findAll()

        return res.json(books)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});

//  get books by id

app.get('/books/:id', async (req, res) => {
    const id = req.params.id
    try {
        const books = await Book.findOne({
            where: { id }
        })

        if (!books) {
            return res.status(404).json({
                message: `Book with id: ${id} was not found`
            });
        }

        return res.json(books);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});

// get books by genre
app.get('/books/:bookGenre', async (req, res) => {
    const bookGenre = req.params.bookGenre
    try {
        const books = await Book.findOne({
            where: { bookGenre }
        })

        if (!books) {
            return res.status(404).json({
                message: `Book with id: ${bookGenre} was not found`
            });
        }

        return res.json(books);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});


// get books added by user id

app.get('/booksbyid/:author_id', async (req, res) => {
    const author_id = req.params.author_id
    try {
        const book = await Book.findAll({
            where: { author_id }
        })

        if (!book) {
            return res.status(404).json({
                message: `user with id: ${author_id} was not found`
            });
        }
        else {
            return res.json(book)
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});


// BORROW A BOOK to one person
app.post('/borrow', async (req, res) => {
    const {user_id, book_isbn } = req.body;
    try {
        const user = await User.findOne({ where: { id: user_id} })

        if (!user) {
            return res.status(404).json({
                message: `this author id: ${user_id} was not found`
            });
        }
        const newborrow = await Borrower.create({ book_isbn, user_id: user.id })
        return res.status(201).json({
            message: " you borrowed a book",
            data: newborrow
        })
    } catch (err) {
        console.log("error " + err);
        return res.status(500).json(err)
    }
});

// get all borrowed books
app.get('/bookborrowed', async (req, res) => {
    try {
        const borrowed = await Borrower.findAll();

        if (!borrowed) {
            return res.status(404).json({
                message: `the book is in library`
            })
        } else {
            return res.json(borrowed);
        }
    }
     catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
        }
    });

    // show all books borrowed by user id
    app.get('/userborrowlist/:user_id', async(req,res) =>{
         const user_id=req.params.user_id
         
         try {
            const userBookBorrowed = await Borrower.findAll({
                where: {user_id}
            })
            if(!userBookBorrowed){
                return res.status(404).json({
                    message:`user with  that id : ${user_id} does not exit `
                   })
            }
            else{
                return res.json(userBookBorrowed)
            }
         } catch (err) {
            console.log("error " + err);
            return res.status(500).json(err)
         }
    })



app.listen({ port: 8080 }, async () => {
    console.log('Server up on http://localhost:8080')
    await sequelize.authenticate()
    console.log('Database Connected!')
})