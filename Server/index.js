const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors())



app.get('/character',(req,res) =>{

})

app.get("/",(req,res) => {
    res.send("Server je aktivnía");
})


app.get('/getClasses',(req,res) =>{
    res.send(['Kolos','Harcovník','Hraničář','Lupič','Čaroděj','Vizír']);
})

const userRouter = require('./routes/routeCharacterCreation.js')
app.use('/character',userRouter);

app.listen(3000)
