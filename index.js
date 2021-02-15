const express = require('express');
const Joi = require('joi');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

var students = [
    {id : 1, name : "student1"},
    {id : 2, name : "student2"},
    {id : 3, name : "student3"}
]
app.get('/api/students', (req,res) => {
    res.send(students);
})

app.get('/api/students/:id', (req,res) => {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(400).send('Student with this id is not found');
    res.send(student);
})

const student_schema = {
    name : Joi.string().min(3).max(50).required()
};
app.post('/api/students', (req,res) => {
    //if(!req.body.name || req.body.name.length < 3)
    //    return res.status(400).send('Student name is Required and must be al least 3 charcters long');
    let validation_result = Joi.validate(req.body, student_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
    let student = {
        id : students.length + 1,
        name : req.body.name
    };
    students.push(student);
    res.send(student);
})

// update student
app.put('/api/students/:id', (req,res) => {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Student with this id is not found');
    let validation_result = Joi.validate(req.body, student_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
    student.name =  req.body.name;
    res.send(student);
})
app.listen(port,() => console.log(`Server starts on ${port}...`));
