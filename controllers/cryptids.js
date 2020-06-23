let express = require('express')
let router = express.Router()
let fs = require('fs')

//get route /cryptids to display all cryptids

router.get('/', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    let crypData = JSON.parse(cryptids);
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        //filtering over dinoData array, only returning values that have matached input in "nameFitler"
        crypData = crypData.filter(cryp => {
            return cryp.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('cryptids/index', {myCryptids: crypData})
})

router.get('/new', (req, res) => {
    res.render('cryptids/new')
})

router.get('/edit/:idx', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids)
    res.render('cryptids/edit', {cryp: cryptids[req.params.idx], crypId: req.params.idx})
})


router.get('/:idx', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    let crypData = JSON.parse(cryptids);
    let crypIndex = parseInt(req.params.idx);
    res.render('cryptids/show', {myCryp: crypData[crypIndex]})
})

router.post('/', (req, res) => {
    //read dino file
    let cryptids = fs.readFileSync('./cryptids.json')
    cryptids = JSON.parse(cryptids)
    //add new content to dino array
    cryptids.push(req.body)
    //save new  array content to dino.json
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
    //redirect to /dinosaurs
    res.redirect('/cryptids')
})

router.delete('/:idx', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids)
    //remove the selected dinos from our "dino" array
    cryptids.splice(req.params.idx, 1)
    //save over our dinosaur.json with the newly formatted dino array
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    //to show user the impact, redirect changes to the dinosaurs page to see all remaining dinos
    res.redirect('/cryptids')

})

router.put('/:idx', (req, res) => {
    //access to dinos 
    let cryptids= fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids)
    //select name and type of dino selected by its ID then reassing name &type
    cryptids[req.params.idx].name = req.body.name;
    cryptids[req.params.idx].type = req.body.type;
    //rewrite the file
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
    //redirect to main page
    res.redirect('/cryptids')
})
module.exports = router


