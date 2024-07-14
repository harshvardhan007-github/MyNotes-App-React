const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // defining a foreign key[id of user, as each user will have unique note] 
        ref: 'user' // reference model, where the foreign key is coming from
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('note', NotesSchema);