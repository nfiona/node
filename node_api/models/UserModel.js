var mongoose = require('mongoose');

// Define a Model
// *** Copy below codes from www.npmjs.com/package/mongoose, installation instruction.
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id    : ObjectId,
    first_name     : String,
    last_name     : String,
    email_address     : String,
    career     : String
});


// *** Accesing a Model & Connecting to 'users' collection that we created at MLab.
// ** Code below is also copied from Mongoose installation instruction.
var UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
