const postsRouter = require('express').Router()
const Post = require('../models/post')

const User = require('../models/user')
const Album = require('../models/album')

const getTodaysDate = () => {
  const dateObj = new Date()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return `${month}-${day}-${year}`
}

// gets all posts in database
postsRouter.get('/', async (req, res)=> {
  const posts = await Post.find({})

  res.json(posts)
})

// get specific post by id
postsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const post = Post.findById({ _id: id })
  post ? 
    res.json(post) :
    res.status(404).send({ error: `Could not find post with ID: ${id}.`})
})

// handle the creation of a new post
postsRouter.post('/', async (req, res)=> {
    const { postAlbum, postText, userId } = req.body;

    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({Error: 'User ID missing or Invalid.'})
    }

    const album = await Album.findOne({name: postAlbum})
    if(!album){
      return res.status(400).json({Error: `Cannot find album ${postAlbum}.`})
    }

    const post = new Post({
      content: postText,
      album: album._id,
      datePosted: getTodaysDate(),
      user: user._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    res.status(201).json(savedPost)
})

// get all posts for a user (user posts + following posts)
postsRouter.get('/user/:id', async (req, res) => {
  const id = req.params.id

  if(!id){
    return res.status(400).json({Error: 'No User ID provided!'})
  }

  const posts = await Post.find({ user: id }).populate('user', 'username').populate('album', 'name photoURL')

  res.json(posts)
})

module.exports = postsRouter