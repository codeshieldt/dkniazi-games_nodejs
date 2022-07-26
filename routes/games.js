const {Game, validateGame} = require('../models/game');
const express = require('express');
const app = express();

app.get('/', async (req,res) => {
    const game = await Game.find();
    res.send(game);
});

app.get('/:id', async (req,res)=> {
    const game = await Game.findOne(req.params._id);

    if(!game)
    {
        return res.status(404).send('No player found with the given id');
    }

    res.send(game);
});

app.post('/', async (req, res) => {
    const { error } = validateGame(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }

    let game = new Game ({ 
        sports: req.body.sports,
        player: req.body.player,
        team: req.body.team,
        number: req.body.number
    });
    game = await game.save();

    res.send(game);
});

app.put('/:id', async (req, res) => {
    const { error } = validateGame(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].messaage);
    }

    const game = await Game.findByIdAndUpdate(req.params.id, 
    { 
        sports: req.body.sports,
        player: req.body.player,
        team: req.body.team
    }, 
    { new: true });

    if(!game) 
    {
        return res.status(404).send('No player found with the given id');
    }

    res.send(game);

});

app.delete('/:id', async (req,res)=> {
    const game = await Game.findByIdAndRemove(req.params.id);

    if(!game)
    {
        return res.status(404).send('No player found with the given id');
    }

    res.send(game);
});

module.exports = app;