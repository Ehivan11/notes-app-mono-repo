const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  like: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

// const note = new Note({
//     content: 'A big large banana, only how do you like it',
//     like: false
// })

// note.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })

module.exports = Note
