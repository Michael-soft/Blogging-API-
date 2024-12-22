const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI

function connectToMongodb() {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on ('error', (err) => {
        console.log(err);
        console.log('An error occurred while connecting to MongoDB');

    });

}

module.exports = connectToMongodb;