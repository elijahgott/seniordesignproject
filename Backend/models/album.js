const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minLength: 1
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  description: {
    type: String,
    required: false,
    maxLength: 255
  },
  photoURL: String,
  releaseDate: Date
})

albumSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album