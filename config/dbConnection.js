const mongoose = require('mongoose');

function dbConnection(){
    mongoose.connect('mongodb+srv://oreby:wOFhvtceMrbnrSxn@cluster0.1gr85au.mongodb.net/oreby?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));
}

module.exports = dbConnection