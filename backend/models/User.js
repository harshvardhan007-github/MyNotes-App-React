const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);
// mongoose inherently creates unique indices for each entry in the _id field in database
// But the below command will create another index field, for an element which is unique in the database, email in this case.
// User.createIndexes(); 
module.exports = User; 