var mongoose = require('mongoose');
// define schema
var Schema = mongoose.Schema;
// followers schema
var FollowersSchema = new Schema({
  FirstName: String,
  LastName: String,
  Place: String,
  Email: String,
  Message: String
});

// we need to create a model using it
var Follower = mongoose.model('Follower', FollowersSchema);

// Export function to create Follower object
module.exports = Follower;
