const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config()
const port = 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle ware
app.use(cors());
app.use(express.json());

//connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASS}@cluster0.xc0o9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try {
        await client.connect();

        const usersCollection = client.db("banao-login-data").collection("user-data");

        app.post('/login', async(req, res) =>{
            const query = req.body.password;
            const password = await usersCollection.findOne({password: query});
            //console.log(password);
            if(password){
                res.send('succesfully login')
            }
            res.send('please provide correct password')


        });

        //post users data
        app.post('/user', async (req, res) =>{
            let userData = req.body;
            const result = await usersCollection.insertOne();
            res.send(result);
          })
    } finally {
        //await clien.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('welcome to banao server!')
})


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})