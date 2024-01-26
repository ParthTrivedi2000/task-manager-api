
const mongoose = require('mongoose');

// const connectionString = ""

// To connect with DB, 1st thing we haev to do is to import mongoose and create it's object. then we have to apply connect method
// by passing the connectionString. Now it will return the promise so we should write .then and .catch to collect the response.
// mongoose.connect(connectionString,{
//     useUnifiedTopology: true,
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false
// })
// .then(()=>{
//     console.log("CONNECTED TO THE DB...");
// })
// .catch((err)=>{
//     console.log(err);
// })

const connectDB = (url) => {
    return mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
}

module.exports = connectDB;