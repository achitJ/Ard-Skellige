const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {

    console.log("Connected to the Database.");

})
.catch((error) => {

    console.log("Cannot connect to the Database.");

});