const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/interviewCyperox',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connection success');
})
.catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});