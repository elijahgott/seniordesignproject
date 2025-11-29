const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

const getCurrentDate = () => {
  // Source - https://stackoverflow.com/a
  // Posted by Samuel Meddows, modified by community. See post 'Timeline' for change history
  // Retrieved 2025-11-27, License - CC BY-SA 4.0

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '-' + dd + '-' + yyyy;
  return today
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
    dateJoined: getCurrentDate(),
    bio: '',
    posts: [],
    following: [],
    followers: []
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