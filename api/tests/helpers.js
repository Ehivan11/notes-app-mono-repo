const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)
const User = require('../models/User')

const initialNotes = [
  {
    content: 'Just a Lemon',
    like: true
  },
  {
    content: 'Just an Anana',
    like: true
  }
]

const getAllContentNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    response,
    contents: response.body.map(note => note.content)
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialNotes,
  getAllContentNotes,
  getUsers
}
