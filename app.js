console.log('Task Manager App')

// require('./db/connect');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const tasks = require('./routers/tasks');

// middlewares
app.use(express.static('./public'));
app.use(express.json());


// app.get('/hello',(req,res)=>{
//     res.status(200).send('Hey There...!')
// })

// routes
app.use('/api/v1/tasks',tasks);

// app.get('/api/v1/tasks') - to get all the tasks
// app.post('/api/v1/tasks') - to create a new task
// app.get('/api/v1/tasks/:id') - to get single task
// app.patch('/api/v1/tasks/:id') - to update task 
// app.delete('/api/v1/tasks/:id') - to delete task


app.use(notFound);
app.use(errorHandlerMiddleware)
// So what does it mean if first server spins up, but then suppose if DB won't able to connect, then it doesn't really mean to
// connect with server ryt. so good practice for backend developer is try to connect with DB 1st, and if it successfully connected
// then only start spinning server else don't start server.
// Invoking only if first DB is connected succesfully. bec otherwise it doesn't mean to connect so.
const port = process.env.PORT || 3000;
// app.listen(port, console.log(`Server is listening on port ${port}...`))

const  start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch(error){
        console.log(error);
    }
}

start();

// const express = require('express');
// const app = express();

// app.get('/hello',(req,res)=>{
//     res.status(200).send(`Hello from server`)
// })

// const port = 3000;
// app.listen(port,()=>{console.log(`Server is listening at port ${port}...`)});