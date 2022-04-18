const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

const userExtractor = require('../middleware/userExtractor')

notesRouter.get('/', async (request, response, next) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    name: note.name,
    content: note.content,
    like: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result).end()
    })
    .catch(err => next(err))
})

notesRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  await Note.findByIdAndDelete(id)
  response.status(204).end()
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const {
    content,
    date = new Date(),
    important = false
  } = request.body

  const { userId } = request

  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'Content required field is missing'
    })
  }

  const newNote = new Note({
    content,
    date,
    important,
    user: user._id
  })

  // Save note with promise

  // newNote.save().then(savedNote => {
  //   response.json(savedNote)
  // })
  //   .catch(err => next(err))

  // Save note with async/await

  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)
  } catch (err) {
    next(err)
  }
})

module.exports = notesRouter
