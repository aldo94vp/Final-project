const { Schema, model} = require('mongoose')


const userSchema = new Schema(
    {
        name:{ type: String, required: true},
        email:{ type: String, required: true},
        password: { type: String, required: true },
        id: { type: String},
        roll: { type: String, required: true }
    } );

module.exports = model('Users', userSchema);