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


// gets top 3 rated artists in database
app.get('/topthreeartists', (req, res)=> {
  const sql = "select * from Artist INNER JOIN(SELECT artist, AVG(rating) AS average_rating FROM listenedlist GROUP BY artist ORDER BY average_rating DESC LIMIT 3) as T ON Artist.name = T.artist";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
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