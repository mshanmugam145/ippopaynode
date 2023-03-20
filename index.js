import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import absoluteSchema from './Schema/absoluteSchema.js';
import cors from 'cors';

const app = express();
const port = 3000;

mongoose.connect(
    process.env.DB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const Absolute = mongoose.model('Absolute', absoluteSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    Absolute.find()
    .then(function (models) {
        res.send(models);
    })
    .catch(function (err) {
        res.send(err);
    });
})

app.post('/post-data', (req, res) => {
    const stud = new Absolute({
        questionArray: req.body.question,
        result: req.body.result,
        arrayCollectionOne: req.body.firstArray, 
        arrayCollectionTwo: req.body.secondArray, 
        createdAt: new Date()
    });
    stud
        .save()
        .then(
            () => console.log("One entry added"), 
            (err) => console.log(err)
        );

        res.end(JSON.stringify(stud));  
 })

app.listen(port, () => {
    console.log(`${process.env.DB_URI} Example app listening at http://localhost:${port}`)
})