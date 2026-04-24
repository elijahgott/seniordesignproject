const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')
const Album = require('../models/album')

const getTodaysDate = () => {
  const dateObj = new Date()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  console.log(`${month}-${day}-${year}`)
  return `${month}-${day}-${year}`
}

// gets all users in database
usersRouter.get('/', async (req, res)=> {
  const users = await User.find({})

  res.json(users)
})

// get specific user by id
usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findById({ _id: id })
  user ? 
    res.json(user) :
    res.status(404).send({ error: `Could not find user with ID: ${id}.`})
})

// create new user
usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if( !username || !password ){
    return res.status(400).json({error: 'Missing credentials'})
  }

  const user = new User({
    username,
    passwordHash,
    dateJoined: getTodaysDate().toString(),
    bio: '',
    posts: [],
    following: [],
    ratings: []
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

// update user
usersRouter.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  User.findById({ _id: id })
  .then(user => {
    if(!user){
      return res.status(404).end()
    }

    console.log(body.username, body.workouts)

    user.username = body.username
    user.bio = body.bio
    user.posts = body.posts
    user.following = body.following

    return user.save().then((updatedUser) => {
      res.json(updatedUser)
    })
  })
  .catch(e => {
    console.log('Error editing user: ', e)
    res.status(404).send({ error: 'Error editing user.' })
  })
})


// delete specific user
usersRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  User.findByIdAndDelete({ _id: id })
    .then(() => res.status(204).end())
    .catch(e => {
      console.log('Error deleting user: ', e)
      res.status(404).send({ error: `Error deleting user: ${e}` })
    })
})

// create rating
usersRouter.post('/:id/ratings', async (req, res) => {
  const userId = req.params.id
  const user = await User.findById({ _id: userId })

  if( !user ){
    res.status(404).send({ error: `Cannot find user with ID: ${userId}!`})
  }

  const albumId = req.body.album

  if( user.ratings.find(r => r.album.equals(albumId)) ){
    console.log('Already rated this album!')
  }

  const album = await Album.findById({ _id: albumId })

  if( !album ){
    res.status(404).send({ error: `Cannot find album with ID: ${albumId}!`})
  }

  const rating = req.body.rating
  const ratingObj = {
      album: album,
      rating: rating
    }

  user.ratings = user.ratings.concat(ratingObj)

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// create rating
usersRouter.put('/:id/ratings', async (req, res) => {
  const userId = req.params.id
  const user = await User.findById({ _id: userId })

  if( !user ){
    res.status(404).send({ error: `Cannot find user with ID: ${userId}!`})
  }

  const albumId = req.body.album
  const rating = user.ratings.find(r => r.album.equals(albumId))

  if( !rating ){
    res.status(404).json({ error: 'Cannot find that rating!'})
  }

  rating.rating = req.body.rating

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// // handle fetching list of listened to albums based on user ID
// usersRouter.get('/:uid/listenedto', (req, res) => {
//   const userId = req.params.uid;
//   const sql = `select * from ListenedList where uid = ?;`;

//   db.query(sql, [userId], (err, results) => {
//     if (err) {
//       console.error('Error executing query: ', err);
//       res.status(500).json({ message: 'Error fetching data' });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

// // handle fetching top 5 artist list based on user ID
// usersRouter.get('/:uid/artistlist', (req, res) => {
//     const userId = req.params.uid;
//     const sql = `select * from TopFiveArtists where uid = ?;`;
  
//     db.query(sql, [userId], (err, results) => {
//       if (err) {
//         console.error('Error executing query: ', err);
//         res.status(500).json({ message: 'Error fetching data' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });

// // handle fetching top 5 album list based on user ID
// usersRouter.get('/:uid/albumlist', (req, res) => {
//     const userId = req.params.uid;
//     const sql = `select * from TopFiveALbums where uid = ?;`;
  
//     db.query(sql, [userId], (err, results) => {
//       if (err) {
//         console.error('Error executing query: ', err);
//         res.status(500).json({ message: 'Error fetching data' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });

module.exports = usersRouter