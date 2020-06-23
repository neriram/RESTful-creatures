let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        //filtering over dinoData array, only returning values that have matached input in "nameFitler"
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index', {myDinos: dinoData})
})

router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})


router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit', {dino: dinosaurs[req.params.idx], dinoId: req.params.idx})
})


router.get('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    let dinoIndex = parseInt(req.params.idx);
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

router.post('/', (req, res) => {
    //read dino file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
    //add new content to dino array
    dinosaurs.push(req.body)
    //save new  array content to dino.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs)
    //remove the selected dinos from our "dino" array
    dinosaurs.splice(req.params.idx, 1)
    //save over our dinosaur.json with the newly formatted dino array
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
    //to show user the impact, redirect changes to the dinosaurs page to see all remaining dinos
    res.redirect('/dinosaurs')

})

router.put('/:idx', (req, res) => {
    //access to dinos 
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs)
    //select name and type of dino selected by its ID then reassing name &type
    dinosaurs[req.params.idx].name = req.body.name;
    dinosaurs[req.params.idx].type = req.body.type;
    //rewrite the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
    //redirect to main page
    res.redirect('/dinosaurs')
})
module.exports = router


