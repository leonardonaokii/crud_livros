'use-strict';

const express = require('express');

const app = express();

app.use(express.json())

const books = []

app.get('/books', (request, response) => {
  return response.status(200).json(books)
})

app.post('/books', (request, response) => {
  const { titulo, descricao, edicao, autor, ibsn } = request.body

  const id = books.length + 1

  const book = { id, titulo, descricao, edicao, autor, ibsn }

  books.push(book)

  return response.status(201).json(book)
})

app.put('/books/:id', (request, response) => {
  const { id } = request.params

  const { titulo, descricao, edicao, autor, ibsn } = request.body

  const bookIndex = books.findIndex(books => books.id == id)

  if (bookIndex === -1) {
    return response.status(400).json({ message: 'Livro não encontrado' })
  }

  const book = { id, titulo, descricao, edicao, autor, ibsn }

  books[bookIndex] = book

  return response.status(200).json(book)
})

app.delete('/books/:id', (request, response) => {
  const { id } = request.params

  const bookIndex = books.findIndex(books => books.id == id)

  if (bookIndex === -1) {
    return response.status(400).json({ message: 'Livro não encontrado' })
  }

  books.splice(bookIndex, 1)

  return response.status(200).json({ message: 'Livro removido com sucesso' })
})

app.listen('3333', () => {
  console.log('server listening on port 3333');
});
