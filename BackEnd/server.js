const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://wns8798:ZouelhTbOc3n4wY3@cluster0.cfa5vjm.mongodb.net/test";
const client = new MongoClient(uri);

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(8080, () => {
    console.log('listening on 8080')
});


async function run() {
    try {
        const database = client.db('sampels');
        const category = database.collection('category_info');
        const maps = database.collection('maps_info');
        const pop = database.collection('populations');

        catData = await category.find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
        });

        mapsData = await maps.find({}).toArray(function(err, result) {
          if (err) throw err;
          
          console.log(result);
        });

        popData = await pop.find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);


        });

  } finally {
    await client.close(); 
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(catData)
});

app.get('/maps', (req, res) => {
  res.send(mapsData)
});

app.get('/pop', (req, res) => {
  res.send(popData)
});

app.get(`/:transparam`, (req, res) => {
  paramDecoded = decodeURIComponent(req.params.transparam);
  
});