const mongoose = require('mongoose');

async function connectDB(DB_URL) {
    mongoose.connection.on('error', () => console.log('Error while connecting to database.'));
    mongoose.connection.once('open', () => console.log('Connected to database.'));
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = { connectDB };