const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.igjj82v.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    

     const AllJewelryCollection = await client.db('jewelryDB').collection('allJewelry');
     const MyJewelryCollection = await client.db('jewelryDB').collection('myJewelry');

     app.post('/alljewelry',async(req,res)=>{
         const item = req.body;
         const result = await AllJewelryCollection.insertOne(item);
         res.send(result);
     })

     app.get('/alljewelry',async(req,res)=>{
        const item = req.body;
        const result = await AllJewelryCollection.find(item).toArray();
        res.send(result);
    })

    app.post('/myjewelry',async(req,res)=>{
        const item = req.body;
        const result = await MyJewelryCollection.insertOne(item);
        res.send(result);
    })



    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
     res.send('jewelry shop comming');
})

app.listen(port,()=>{
     console.log(`jewelry server running on ${port}`);
})


