const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');
const {createCustomError} = require('../errors/custom-error')

// const getAllTasks = async (req,res)=>{
//     try {
//         const tasks = await Task.find({}); // will return all the task or the documetns fron a collection in model.
//         res.status(200).json({tasks}) //return as an object. this is short hand type of objects passing in ES6. 
//         // in case of propery name of es6 and variable name is same. else
//         // u would have to write .json({tasks: variable_name i.e. here tasks})
//         // res.status(200).json({tasks, amount:tasks.length});
//         // res.status(200).json({status:'success',data:{tasks, nhits:tasks.length}});
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// };

// // Please make note of that only properties which are mentioned in  the mongoose.Schema() will be passed from server to database. if
// // at server side you are entering so many properties but only 2 properties passed or successfully stored inside the database in our case
// // as we have passed 2 properties only while creating Schema defination.
// const createTask = async (req,res)=>{
//     try{
//         const task = await Task.create(req.body);
//         res.status(201).json({task});
//     }
//     catch(error){
//         res.status(500).json({msg:error});
//     }
// };

// const getSingleTask = async (req,res)=>{
//     try {
//         const {id:taskId} = req.params;
//         const task = await Task.findOne({_id:taskId});
//         if(!task){
//             return res.status(404).json(`No id present with id: ${taskId}`);  // always always make sure to return this. just don't
//             // simply write res.status...
//         }
//         res.status(200).json({task});
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// };

// const updateTask = async (req,res)=>{
//     try {
//         const {id:taskId} = req.params;
//         const newData = req.body;
//         // const task = await Task.findByIdAndUpdate({_id:taskId},data:newData); // without passing options
// // Now why we need to pass the options? bec if we won't pass it then 1st problem is this function by default the old value 
// // (or we can say all the values before updates) hence when I am console.log task then it will show old one only as task holds
// // whatever return by that findOneAndUpdate() function so. And 2nd problem is validators which we have applied on schema properties
// // won't run it means suppose here we kept name must not empty and at the time of updating new value, user has not entered
// // anything it menas with empty string then it will store in db without apply any kind of validations on it. So to remove both the
// // above problems we need to provide it in options.
//         const task = await Task.findOneAndUpdate({_id:taskId},newData,{
//             new:true,
//             runValidators:true
//         })

//         if(!task){
//             return res.status(404).json(`No id present with id: ${taskId}`);
//         }

//         res.status(200).json({task});
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// };

// const deleteTask = async (req,res)=>{
//     try {
//         const {id:taskId} = req.params;
//         const task = Task.findOneAndDelete({_id:taskId})
//         if(!task){
//             res.status(404).json(`No id present with id: ${taskId}`);
//         }
//         // res.status(200).json({task});
//         // res.status(200).send();
//         res.status(200).json({task:null, status:'success'});
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// };

// module.exports = {
//     getAllTasks,
//     createTask,
//     getSingleTask,
//     updateTask,
//     deleteTask
// }

// -------------------------------------------------------------------

const getAllTasks = asyncWrapper( async (req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
}
);


const createTask = asyncWrapper (async (req,res)=>{
        const task = await Task.create(req.body);
        res.status(201).json({task});
}
);

const getSingleTask = asyncWrapper(async (req,res)=>{
        const {id:taskId} = req.params;
        const task = await Task.findOne({_id:taskId});
        if(!task){
            return next(createCustomError(`No id present with id: ${taskId}`,404));
        }
        res.status(200).json({task});
}
);

const updateTask = asyncWrapper(async (req,res)=>{
        const {id:taskId} = req.params;
        const newData = req.body;
        const task = await Task.findOneAndUpdate({_id:taskId},newData,{
            new:true,
            runValidators:true
        })

        if(!task){
            return next(createCustomError(`No id present with id: ${taskId}`,404));
        }
        res.status(200).json({task});
}
);

const deleteTask = asyncWrapper(async (req,res)=>{
        const {id:taskId} = req.params;
        const task = Task.findOneAndDelete({_id:taskId})
        if(!task){
            return next(createCustomError(`No id present with id: ${taskId}`,404));
        }
        res.status(200).json({task:null, status:'success'});
});

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}