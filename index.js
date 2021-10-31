const express = require('express');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 4000;
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors())
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efzfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

    try{
        await client.connect();
        const database = client.db('soloTraveler');
        const serviceCollection = database.collection('services');

        // app.get('/services', async (req, res)=>{
        //     console.log("get hitted");
        //     res.send("lsjfsjdf");
        // })

        app.post('/services', async(req,res) =>{
                const service = req.body;

                const result = await serviceCollection.insertOne(service);
                console.log(result);
                res.json(result);
                console.log('hit api')
        })
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req,res) =>{
    res.send("running perfectly!");
})

app.listen(port, ()=>{
    console.log("running  server on port ",port);
})