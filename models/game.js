const Joi = require('joi');
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    sports: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    player: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    team: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    number: {
        type: Number,
        minlength: 1,
        maxlength: 2
    }
});

const Game = mongoose.model('Game', gameSchema);

function validateGame(game)
{
    const schema = {
        sports: Joi.string().min(5).max(20).required(),
        player: Joi.string().min(5).max(20).required(),
        team: Joi.string().min(3).max(20).required(),
        number: Joi.number().min(1).max(99)
    };

    return Joi.validate(game, schema);
}

module.exports.gameSchema = gameSchema;
module.exports.Game = Game;
module.exports.validateGame = validateGame;