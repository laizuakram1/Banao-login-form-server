const express = require('express')
const app = express()
const cors = require('cors');


const port = 5000

//middle ware
app.use(cors());
app.use(express());

app.get('/', (req, res) => {
  res.send('welcome to banao server!')
})


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})