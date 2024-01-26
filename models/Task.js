const mongoose = require('mongoose');

// Structure Creation(same as DDL in SQL) of Schema.
// bec yes that is right ki we can add anything into our collections or any type of data into our collections. but we don't want it to
// be like everything like objects, arrays and anything is stored in our collection. Instead, for our task manager API we want to show
// tasks and weather it is completed or not that property. So that we can setup like only this thing any user will be able to insert into
// our collection.

// const TaskSchema = new mongoose.Schema({
//     name:String, 
//     completed:Boolean
// }
// )

// now as schema (or collection in terms of mongo) is ready. but if my structure for collection is ready then mongoose will also
// provide one wrapper named model to perform CRUD on documents (it means simply add and remove those data and yes documents in terms of mongo)
// we need to pass the name of the collection we want to keep and structure of collection like which kind of data only it should store.

// If you want basic validation before adding data to database, then you can do it by passing validation while creating defination
// of schema.
const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name can not be empty'],
        trim:true,
        maxlength:[20, 'name can not be more than 20 letters']
    }, 
    completed:{
        type:Boolean,
        default:false
    }
}
)

module.exports = mongoose.model('Task',TaskSchema);