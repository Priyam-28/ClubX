const express = require('express')
const app = express();

// const hbs = require('hbs')
const path = require('path')
const LogInCollection = require("./mongo")
const port = process.env.PORT || 4000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', templatePath);
app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('register');
})


app.post('/register', async (req, res) => {
    const data = new LogInCollection({
        registerno: req.body.registerno,
        password: req.body.password
    })
    await data.save()
    const checking = await LogInCollection.findOne({ registerno: req.body.registerno })
    try {
        if (checking.registerno === req.body.registerno) {
            res.send("User details already exists")
        }
        else {
            await LogInCollection.insertMany([data])
            res.send("New Uswer Added")
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
            // res.render("http://localhost:5173/", { naming: `${req.body.registerno}` })
            res.redirect('http://localhost:5173');
        }

        else {
            res.send("Incorrect Password")
        }


    }
    catch (e) {

        res.send("No user Exists")


    }


})



app.listen(port, () => {
    console.log('port connected');
})

