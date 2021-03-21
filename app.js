const PORT = 8000;

const cors = require('cors');
const bodyParser = require('body-parser')

const express = require('express');
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: String,
    isCheck: Boolean,
});

const uri = "mongodb+srv://TatianaDjan:i5WtR3kenNaB8rG@cluster0.v0ees.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const Task = mongoose.model("tasks", taskSchema)


app.get('/allTasks', (req, res) =>  {
    Task.find().then(result =>{
        res.send({data: result});
        console.log({data: result})
    });
   
});

app.post('/createTask', (req, res) =>  {
   const task = new Task(req.body);
   task.save().then(result =>{
        Task.find().then(result =>{
            res.send({data: result});
            console.log({data: result})
        });

   })
       
});

app.delete('/deleteTask', (req, res) =>  {
    Task.deleteOne({_id: req.query._id}).catch(err => console.log(err));
});


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}....`)
})

