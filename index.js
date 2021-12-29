const express = require('express');
const app = express();
const port = 5000;
const { MongoClient } = require('mongodb');
// require('dotenv').config();

// Connect mongodb cloud database
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.budis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Check database connection
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log('database connected');
//     client.close();
// });

// Connect mongodb compass community server local database
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

async function run () {
    try {
        await client.connect();
        console.log('database connected successfully');
        // GET method for creating foods API
        app.get('/read-foods', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('food_world_db');
            const foodsCollection = database.collection('foods_collection');
            const result = await foodsCollection.find().toArray();
            res.send(result);
        });     
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('running food-world server app')
})

app.listen(port, () => {
  console.log(`food-world server app listening at http://localhost:${port}`)
})
