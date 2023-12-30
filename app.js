const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const LogInCollection = require("./mongo")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 4000;


app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.use(express.json())

mongoose.connect('mongodb://localhost:27017/clubInfo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('register');
})
app.get('/home', (req, res) => {
    res.render('home');
})
app.get('/home2', (req, res) => {
    res.render('home2');
})


app.post('/register', async (req, res) => {
    const data = new LogInCollection({
        registerno: req.body.registerno,
        password: req.body.password
    })
    const checking = await LogInCollection.findOne({ registerno: req.body.registerno })
    try {
        if (checking.registerno === req.body.registerno) {
            res.send("User details already exists")
        }
        else {
            await data.save()
            LogInCollection.insertMany([data])
            res.send("New User Added")
        }
    }
    catch {
        res.send("wrong inputs")
    }

    res.status(201).render("home", {
        naming: req.body.registerno
    })
})
app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ registerno: req.body.registerno })

        if (check.password === req.body.password) {
            res.render('home',{ naming: `${req.body.registerno}` })
        }

        else {
            const errorMessage = 'Incorrect password. Please try again.';
            res.render('login', { error: errorMessage });
            console.log(errorMessage)
        }


    }
    catch (e) {

        res.send("No user Exists")


    }


})



// Create a Mongoose model
const Club = mongoose.model('Club', {
    name: String,
    departmentHead: String,
    isRecruiting: Boolean,
    description: String,
    imageUrl: String,
    googleFormLink: String
});

const NonTechnicalClub = mongoose.model('NonTechnicalClub', {
    name: String,
    departmentHead: String,
    isRecruiting: Boolean,
    description: String,
    imageUrl: String,
    googleFormLink: String,
    
});
const Chapters = mongoose.model('Chapter', {
    name: String,
    departmentHead: String,
    isRecruiting: Boolean,
    description: String,
    imageUrl: String,
    googleFormLink: String,
    
});



// app.get('/', (req, res) => {
//     res.send('Welcome to My Club Website');
// });

app.get('/clubs', async (req, res) => {
    try {
        const clubs = await Club.find({}).exec();
        const nontech=await NonTechnicalClub.find({}).exec();
        const chap = await Chapters.find({}).exec();


        res.render('clubs', { clubs,nontech,chap }   );
    } catch (error) {
        console.error(error);
        res.send('Error fetching data');
    }
});
app.get('/clubs', async (req, res) => {
    try {
      const nonTechnicalClubs = await NonTechnicalClub.find({}).exec();
      res.render('clubs', { clubs: nonTechnicalClubs });
    } catch (error) {
      console.error(error);
      res.send('Error fetching non-technical clubs');
    }
  });
  app.get('/clubs', async (req, res) => {
    try {
      const chap = await Chapters.find({}).exec();
      res.render('clubs', { clubs: chap });
    } catch (error) {
      console.error(error);
      res.send('Error fetching non-technical clubs');
    }
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
  });
  
  app.get('/images', (req, res) => {
    // Scan the "public/images/gallery" directory for image files
    const imageDirectory = path.join(__dirname, 'public/images/gallery');
    fs.readdir(imageDirectory, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        // Filter for image files (e.g., only display .jpg, .jpeg, .png, .gif, etc.)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
      }
    });
  });
  
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/login`);
});
