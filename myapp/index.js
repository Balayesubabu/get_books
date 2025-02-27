const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')

let db = null
const dbPath = path.join(__dirname, 'goodreads.db')

const connectAndIntialize = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB error is ${e.message}`)
    process.exit(1)
  }
}

connectAndIntialize()

app.get('/books/', async (request, respnose) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id;`
  const booksArray = await db.all(getBooksQuery)
  respnose.send(booksArray)
})
