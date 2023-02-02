const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle ware
app.use(cors());
app.use(express.json());

//connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASS}@cluster0.xc0o9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
  
      await client.connect();
      const banaoCollection = client.db("BanaoUsers").collection("users");
   

  app.post('/SignUp', async(req, res) =>{
    const data = req.body;
    const result = await banaoCollection.insertOne(data)

    res.send(result);
  })
  
      
  
        
  
  
  
    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  
  
  
  app.get('/', (req, res) => {
    res.send('welcome to banao server')
  })
  
  app.listen(port, () => {
    console.log(` banao server listening on port ${port}`)
  })