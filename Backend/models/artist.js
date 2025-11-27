const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minLength: 1
  },
  bio: {
    type: String,
    required: false,
    maxLength: 255
  },
  photoURL: String
})

artistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist