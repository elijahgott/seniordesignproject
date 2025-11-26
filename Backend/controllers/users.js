const usersRouter = require('express').Router()
// const User = require('../models/user')
// const Album = require('../models/album')
// const Artist = require('../models/artists')

//get all users
usersRouter.get('/', (req, res)=> {
    const sql = "SELECT * FROM user";
    db.query(sql, 1 , (err, dataUser) => {
        if(err) return res.json(err);
        return res.json(dataUser);
    })
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
    workouts: [],
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

// get specific user
usersRouter.get('/:uid', (req, res) => {
    const userId = req.params.uid;
    const sql = `select * from user where uid = ?;`;
  
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// handle updating user
usersRouter.put('/:uid', (req, res) => {
  const uid = req.params.uid;
  const { newUsername, bio } = req.body;

  const sql = 'update User set username = ?, bio = ? where uid = ?;';

  db.query(sql, [newUsername, bio, uid], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Error updating user' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
});

// // update user
// usersRouter.put('/:id', (req, res) => {
//   const id = req.params.id
//   const body = req.body

//   User.findById({ _id: id })
//   .then(user => {
//     if(!user){
//       return res.status(404).end()
//     }

//     console.log(body.username, body.workouts)

//     user.username = body.username
//     user.workouts = body.workouts

//     return user.save().then((updatedUser) => {
//       res.json(updatedUser)
//     })
//   })
//   .catch(e => {
//     console.log('Error editing user: ', e)
//     res.status(404).send({ error: 'Error editing user.' })
//   })
// })


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

// handle fetching list of listened to albums based on user ID
usersRouter.get('/:uid/listenedto', (req, res) => {
  const userId = req.params.uid;
  const sql = `select * from ListenedList where uid = ?;`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      res.status(200).json(results);
    }
  });
});

// handle fetching top 5 artist list based on user ID
usersRouter.get('/:uid/artistlist', (req, res) => {
    const userId = req.params.uid;
    const sql = `select * from TopFiveArtists where uid = ?;`;
  
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// handle fetching top 5 album list based on user ID
usersRouter.get('/:uid/albumlist', (req, res) => {
    const userId = req.params.uid;
    const sql = `select * from TopFiveALbums where uid = ?;`;
  
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });

module.exports = usersRouter