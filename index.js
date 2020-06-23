let express = require('express');
let layouts = require('express-ejs-layouts');
let fs = require('fs');
// method override allows HTML5 to accept put/delete routes
let methodOverride = require('method-override')

let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(layouts);
//use body parser to take info from form
app.use(express.urlencoded({extended: false}))
//method-override will allow us to use pt & delete routes
app.use(methodOverride('_method'))

//referencing the route that has moved to controller folder
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/cryptids', require('./controllers/cryptids'))

//home route for both dino & cryptid
app.get('/', (req, res) => {
    res.render('home')
})


app.listen(8000)