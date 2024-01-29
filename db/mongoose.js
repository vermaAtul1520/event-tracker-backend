const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false);
console.log("Url",process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(()=>{
    console.log('connection to db is success');
}).catch((err)=>{
    console.log('connection to db is fail',err);
})