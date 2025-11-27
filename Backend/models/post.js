const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: false,
    maxLength: 255
  },
  photoURL: String,
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  datePosted: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post