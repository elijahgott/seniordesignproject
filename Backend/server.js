const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '', 
    database: 'sdp'
}) 

// handle fetching user posts based on user ID
app.get('/posts/:uid', (req, res) => {
    const userId = req.params.uid;
    const sql = `select * from UserPost where uid = ? OR uid IN ((select friendID from UserFriend where uid = ?)) ORDER BY date DESC;`;
  
    db.query(sql, [userId, userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// handle the creation of a new post
app.post('/submitpost', (req, res)=> {
    //get data from forms and add to userposts table
    const { uid, username, content, photo, song_name, album_name, date, time } = req.body;
    const sql = `insert into UserPost (uid, username, content, photo, song_name, album_name, date, time)
                values (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [uid, username, content, photo, song_name, album_name, date, time], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Post into Database!");
            res.status(200).send("Data inserted successfully")
        }
    })
})

//handle searches done in the navbar
app.post('/search', (req, res) => {
    const { search } = req.body;
    const sql = `
      SELECT username as name, bio FROM user WHERE username LIKE '%${search}%'
      UNION
      SELECT name, bio FROM artist WHERE name LIKE '%${search}%'
      UNION
      SELECT name, description as bio FROM album WHERE name LIKE '%${search}%'
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error searching' });
      } else {
        res.status(200).json(results);
        console.log("Successfully Searched Database!");
      }
    });
  });


//gets list of all users
app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM user";
    db.query(sql, 1 , (err, dataUser) => {
        if(err) return res.json(err);
        return res.json(dataUser);
    })
})

// handle fetching profile based on user ID
app.get('/users/:uid', (req, res) => {
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
app.put('/updateuser/:uid', (req, res) => {
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

  // handle fetching friends based on user ID
app.get('/friends/:uid', (req, res) => {
  const userId = req.params.uid;
  const sql = `select * from User where uid IN (select ALL friendID from UserFriend where uid = ?);`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      res.status(200).json(results);
    }
  });
});

  // handle fetching all other users based on user ID
  app.get('/addFriend/:uid', (req, res) => {
    const userId = req.params.uid;
    const sql = `select * from User where NOT uid = ? AND uid NOT IN(select friendID from UserFriend where uid = ?);`;
  
    db.query(sql, [userId, userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// handles the insertion of a new friend relationship into the database
app.post('/addFriend', (req, res)=> {
  //get data from forms and add to userfriend table
  var { uid, friendUID} = req.body;
  const sql = `insert into UserFriend (uid, friendID)
              values (?, ?)`;
  db.query(sql, [uid, friendUID], (err, results)=> {
      if(err){
          console.error("Error inserting data: ", err);
          res.status(500).send("Error inserting data")
      }
      else{
          console.log("Successfully Added Friendship into Database!");
          res.status(200).send("Friend added successfully")
      }
  }) 
})

// handles the insertion of a new friend relationship into the database
app.post('/removeFriend', (req, res)=> {
  //get data from forms and remove from userfriend table
  var { uid, removeFriendUID} = req.body;
  const sql = `delete from UserFriend where uid = ? and friendID = ?`;
  db.query(sql, [uid, removeFriendUID], (err, results)=> {
      if(err){
          console.error("Error deleting data: ", err);
          res.status(500).send("Error deleting data")
      }
      else{
          console.log("Successfully Erased Friendship From Database!");
          res.status(200).send("Friend added successfully")
      }
  }) 
})

//handles the deletion of a friend relationship from the database
app.delete('/removeFriend/:userId/:friendId', (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  const sql = 'DELETE FROM UserFriend WHERE uid = ? AND friendId = ?';

  db.query(sql, [userId, friendId], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Error removing friendship' });
    } else {
      res.status(200).json({ message: 'Successfully removed friendship! :D' });
    }
  });
});

  // handle fetching top 5 artist list based on user ID
app.get('/userlistartist/:uid', (req, res) => {
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
app.get('/userlistalbum/:uid', (req, res) => {
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

    // handle fetching top 5 album list based on user ID
    app.get('/userlist/:uid', (req, res) => {
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

// get all albums in database
app.get('/albums', (req, res)=> {
    const sql = "SELECT * FROM album";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// get top 3 highest rated albums (on average)
app.get('/topthreealbums', (req, res)=> {
  const sql = "select * from Album INNER JOIN(SELECT album, AVG(rating) AS average_rating FROM listenedlist GROUP BY album ORDER BY average_rating DESC LIMIT 3) as T ON Album.name = T.album";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

// get 3 most recently released albums
app.get('/newalbums', (req, res)=> {
  const sql = "select * from Album ORDER BY releaseDate DESC LIMIT 3;";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

// handles the insertion of a new album into the database
app.post('/submitalbum', (req, res)=> {
    //get data from forms and add to artists table
    var { name, artist, description, photo, releaseDate } = req.body;
    if(!photo){
        photo = 'default.jpg'
    }
    const sql = `insert into Album (name, artist, description, photo, releaseDate)
                values (?, ?, ?, ?, ?)`;
    db.query(sql, [name, artist, description, photo, releaseDate], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Album into Database!");
            res.status(200).send("Album inserted successfully")
        }
    }) 
})

// gets all artists in database
app.get('/artists', (req, res)=> {
    const sql = "SELECT * FROM artist";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// gets top 3 rated artists in database
app.get('/topthreeartists', (req, res)=> {
  const sql = "select * from Artist INNER JOIN(SELECT artist, AVG(rating) AS average_rating FROM listenedlist GROUP BY artist ORDER BY average_rating DESC LIMIT 3) as T ON Artist.name = T.artist";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

// handles the insertion of a new artist into the database
app.post('/submitartist', (req, res)=> {
    //get data from forms and add to artists table
    var { name, bio, photo } = req.body;
    if(!photo){
        photo = 'default.jpg'
    }
    const sql = `insert into Artist (name, bio, photo)
                values (?, ?, ?)`;
    db.query(sql, [name, bio, photo], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Artist into Database!");
            res.status(200).send("Artist inserted successfully")
        }
    })
})

/*
// gets all songs in database
app.get('/songs', (req, res)=> {
    const sql = "SELECT * FROM song";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})
*/

// gets newest album in database (would like to get top 3 newest)
app.get('/new', (req, res)=> {
    const sql = "select * from album where releaseDate = (select MAX(releaseDate) from album);"; //newest album
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// handles the addition of an album into a user's Listened List
app.post('/submitlist', (req, res)=> {
    //get data from forms and add to listenedlist table
    const { uid, album, artist, dateAdded, rating } = req.body;
    const sql = `insert into ListenedList (uid, album, artist, dateAdded, rating)
                values (?, ?, ?, ?, ?)`;
    db.query(sql, [uid, album, artist, dateAdded, rating], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Album into Listened List!");
            res.status(200).send("Data inserted successfully")
        }
    })
})

// handles updating an album's rating in a user's Listened List
app.post('/updatelist', (req, res)=> {
  //get data from forms and update listenedlist table
  const { uid, albumUpdate, artistUpdate, dateUpdated, ratingUpdate } = req.body;
  const sql = `update ListenedList set rating = ?, dateAdded = ? where uid = ? AND album = ? AND artist = ?`;
  db.query(sql, [ratingUpdate, dateUpdated, uid, albumUpdate, artistUpdate], (err, results)=> {
      if(err){
          console.error("Error inserting data: ", err);
          res.status(500).send("Error inserting data")
      }
      else{
          console.log("Successfully Updated Album Rating in Listened List!");
          res.status(200).send("Data updated successfully")
      }
  })
})

// handles the addition of an artist into a user's Top 5 List
app.post('/submittopfiveartists', (req, res)=> {
  //get data from forms and add to topfiveartists table
  const { uid, artistPosition, artistSelection } = req.body;
  const sql = `insert into TopFiveArtists (uid, position, name)
              values (?, ?, ?)`;
  db.query(sql, [uid, artistPosition, artistSelection], (err, results)=> {
      if(err){
          console.error("Error inserting data: ", err);
          res.status(500).send("Error inserting data")
      }
      else{
          console.log("Successfully Inserted Artist into Top 5 List!");
          res.status(200).send("Data inserted successfully")
      }
  })
})

// handles the updating a position of a user's Top 5 List
app.post('/updatetopfiveartists', (req, res)=> {
  //get data from forms and add to topfiveartists table
  const { uid, artistUpdatePosition, artistUpdateSelection } = req.body;
  const sql = `update TopFiveArtists set name = ? where uid = ? and position = ?`;
  db.query(sql, [artistUpdateSelection, uid, artistUpdatePosition], (err, results)=> {
      if(err){
          console.error("Error updating data: ", err);
          res.status(500).send("Error updating data")
      }
      else{
          console.log("Successfully Updated Position on Top 5 List!");
          res.status(200).send("Data updated successfully")
      }
  })
})

// handles the addition of an album into a user's Top 5 List
app.post('/submittopfivealbums', (req, res)=> {
  //get data from forms and add to topfiveartists table
  const { uid, albumPosition, album, artist} = req.body;
  const sql = `insert into TopFiveAlbums (uid, position, name, artistName)
              values (?, ?, ?, ?)`;
  db.query(sql, [uid, albumPosition, album, artist], (err, results)=> {
      if(err){
          console.error("Error inserting data: ", err);
          res.status(500).send("Error inserting data")
      }
      else{
          console.log("Successfully Inserted Album into Top 5 List!");
          res.status(200).send("Data inserted successfully")
      }
  })
})

// handles updating a position on a user's Top 5 List
app.post('/updatetopfivealbums', (req, res)=> {
  //get data from forms and add to topfiveartists table
  const { uid, albumUpdatePosition, album, artist} = req.body;
  const sql = `update TopFiveAlbums set name = ?, artistName = ? where uid = ? and position = ?`;
  db.query(sql, [album, artist, uid, albumUpdatePosition], (err, results)=> {
      if(err){
          console.error("Error inserting data: ", err);
          res.status(500).send("Error inserting data")
      }
      else{
          console.log("Successfully Updated Position of Top 5 List!");
          res.status(200).send("Data updated successfully")
      }
  })
})

// handles signing user in
app.post('/signin', (req, res) => {
    const {username, password} = req.body;
    const sql = "select * from user where username = ? and password = ?";

    db.query(sql, [username, password], (err, results) => {
        if(err){
            console.error('Error executing query: ', err);
            res.status(500).json({message: 'Error signing in'});
        }
        else {
            if(results.length > 0){
                const token = jwt.sign({ username }, 'testing_key', { expiresIn: '1h' });
                res.status(200).json({message: 'Sign in successful', token, user: results[0]});
            }
            else {
                res.status(401).json({message: 'Invalid username or password'})
            }
        }
    }); 
});

// gets maximum value of UID in database for creation of a new account
app.get('/signupuser', (req, res)=> {
    const sql = "select MAX(uid) from User;"; 
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// handles the creation of a new account
app.post('/signup', (req, res)=> {
    //get data from forms and add to userposts table
    const { uid, username, password, dateJoined } = req.body;
    const sql = `insert into User (uid, username, password, date_joined, bio)
                values (?, ?, ?, ?, ?)`;
    db.query(sql, [uid, username, password, dateJoined, null], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Created New User!");
            res.status(200).send("New User Created!") 
        }
    })
})

app.listen(8081, ()=> {
    console.log("Server Running on Port 8081"); 
})

{/*  cd seniordesignproject/Backend -> npm start */}