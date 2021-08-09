const express = require("express");
const router = express.Router();
const { response } = require("../app");


const CharactersService = require('../service/index');
const charactersApiHandler = new CharactersService();

router.get('/list', (req, res) => {
    charactersApiHandler.getAllCharacters()
        .then((result) => {
            res.render('pages/characters-list', { characters: result.data });
        })
        .catch((err) => {
            console.log("err getting data from the api: ", err)
        });
});


router.get('/create', (req, res) => {
    res.render('pages/new-character-form');
});


router.post('/create', (req, res) => {
    const {name, occupation, weapon} = req.body;

    charactersApiHandler.createCharacter({ name, occupation, weapon })
    .then( () => {
        res.redirect('/characters/list')
    })
    .catch( err => {
        console.log("err saving data to the api: ", err)
    });
});


router.get('/edit/:id', (req, res) => {
    const characterId = req.params.id;
    charactersApiHandler.getOneCharacter(characterId)
        .then( characterFromApi => {
            res.render('pages/edit-character-form', {character: characterFromApi.data});
        })
        .catch( err => {
            console.log("err getting data to the api: ", err)
        });
});


router.post('/edit/:id', (req, res) => {
    const characterId = req.params.id;
    const { name, occupation, weapon } = req.body
    charactersApiHandler.editCharacter(characterId, { name, occupation, weapon })
    .then( responseFromApi => {
        res.redirect('/characters/list');
    })
    .catch( err => {
        console.log("err updating data in the api: ", err)
    });
});


router.get('/delete/:id', (req, res) => {
    const characterId = req.params.id;
    charactersApiHandler.deleteCharacter(characterId)
        .then( responseFromApi => {
            res.redirect('/characters/list');
        })
        .catch( err => {
            console.log("err deleting data from the api: ", err)
        });
});


module.exports = router;