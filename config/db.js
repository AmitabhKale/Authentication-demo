const mongoose = require('mongoose');

const connectDB = () => {
    const conn = mongoose.connect('mongodb://localhost:27017/AuthDB')
    .then(console.log(`Database Connected `))
    .catch((err) => console.log(err))
}

module.exports = connectDB;





    