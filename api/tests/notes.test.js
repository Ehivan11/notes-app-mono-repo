const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')

const {
  initialNotes,
  api,
  getAllContentNotes
} = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // parellel (no ordered)
  // const notesObjects = initialNotes.map(note => new Note(note))
  // const promises = notesObjects.map(note => note.save())
  // await Promise.all(promises)

  // sequential (ordered)
  for (const fruit of initialNotes) {
    const notesObjects = new Note(fruit)
    await notesObjects.save()
  }
})

describe('GET all notes', () => {
  test('Notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There are two notes', async () => {
    const { response } = await getAllContentNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('Any of the notes is called Lemon', async () => {
    const { contents } = await getAllContentNotes()
    expect(contents).toContain('Just a Lemon')
  })
})

describe('POST notes', () => {
  test('A valid note can be added', async () => {
    const newNote = {
      name: 'Apple',
      content: 'Just an Apple'
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { response, contents } = await getAllContentNotes()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('Notes without required atributes are not added', async () => {
    const newNote = {
      content: 'Just an Apple'
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const { response } = await initialNotes()

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE notes', () => {
  test('A note can be delete', async () => {
    const { response: firstResponse } = await getAllContentNotes()
    const { body: notes } = firstResponse
    const noteToDelete = notes[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const { contents, response: secondResponse } = await getAllContentNotes()
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)

    expect(contents).not.toContain(noteToDelete.content)
  })

  test('A note who does not exist can not be deleted', async () => {
    await api
      .delete('/api/notes/1234')
      .expect(400)

    const { response } = await getAllContentNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
