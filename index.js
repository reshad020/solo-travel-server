const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000;
const cors = require('cors');
const app = express();
const objectId = require('mongodb').ObjectId;

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
        const bookingCollection = database.collection('bookings');

        app.get('/services', async(req,res) =>{
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);

        })
        app.get('/services/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.json(service)

        })
        app.get('/addbooking/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const booking = await bookingCollection.findOne(query);
            res.json(booking);

        })
        app.get('/addbooking', async(req,res) =>{
            const cursor = bookingCollection.find({});
            const bookings = await cursor.toArray();
            res.send(bookings);

        })

        app.post('/services', async(req,res) =>{
                const service = req.body;

                const result = await serviceCollection.insertOne(service);
                console.log(result);
                res.json(result);
                console.log('hit api')
        })
        app.post('/addbooking', async(req,res) =>{
                const booking = req.body;

                const result = await bookingCollection.insertOne(booking);
                console.log(result);
                res.json(result);
                console.log('hit api')
        })

        //Delete api
        app.delete('/addbooking/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await bookingCollection.deleteOne(query)
            res.json(result);
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