const mongoose = require('mongoose')

const albumListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minLength: 1
  },
  description: {
    type: String,
    required: false,
    maxLength: 255
  },
  photoURL: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album'
    }
  ]
})

albumListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const AlbumList = mongoose.model('AlbumList', albumListSchema)

module.exports = AlbumList