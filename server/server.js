const express = require('express');
let app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
}); 

app.post('/contact-form', (req, res) => {
    let dataPath = path.join(__dirname, '../info.json');

    let person = {
        name: (req.body.name),
        email: (req.body.email)
    }

    fs.readFile(dataPath, (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        let personInfo = JSON.parse(data);
        personInfo.push(person);

        fs.writeFile(dataPath, JSON.stringify(personInfo), (err) => {
            if (err) throw err;
            console.log('yes');
        })
    })

    res.send('Thank you for submitting your contact form!');
});

app.get("/formsubmissions", (req, res) => {
    
    let dataPath = path.join(__dirname, '../info.json');
    fs.readFile(dataPath, (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        let personInfo = JSON.parse(data);
        personInfo.push(person);
        res.send(data);
       
    })
});

app.use(express.static(path.join(__dirname, '../public')));



app.listen(3000);