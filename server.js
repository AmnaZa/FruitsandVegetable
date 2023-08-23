require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Fruit = require('./models/fruit.js');
const Vegetable = require('./models/vegetables.js');

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.get('/', (req, res) => {
  res.send('<h1>Hello WISE!</h1>');
});

// Fruit routes
app.get('/fruits', (req, res) => {
  Fruit.find({})
    .then(allFruits => {
      res.render('fruits/Index', { fruits: allFruits });
    })
    .catch(error => {
      console.error(error);
    });
});

app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
});

app.post('/fruits', (req, res) => {
  const { name, color, readyToEat } = req.body;
  const newFruit = new Fruit({
    name,
    color,
    readyToEat: readyToEat === 'on',
  });

  newFruit.save()
    .then(() => {
      res.redirect('/fruits');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error creating fruit');
    });
});

app.get('/fruits/:id', (req, res) => {
  const fruitId = req.params.id;
  Fruit.findById(fruitId)
    .then(foundFruit => {
      res.render('fruits/Show', { fruit: foundFruit });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Fruit not found');
    });
});

// Vegetable routes
app.get('/vegetables', (req, res) => {
  Vegetable.find({})
    .then(allVegetables => {
      res.render('vegetables/Index', { vegetables: allVegetables });
    })
    .catch(error => {
      console.error(error);
    });
});

app.get('/vegetables/new', (req, res) => {
  res.render('vegetables/New');
});

app.post('/vegetables', (req, res) => {
  const { name, color, readyToEat } = req.body;
  const newVegetable = new Vegetable({
    name,
    color,
    readyToEat: readyToEat === 'on',
  });

  newVegetable.save()
    .then(() => {
      res.redirect('/vegetables');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error creating vegetable');
    });
});

app.get('/vegetables/:id', (req, res) => {
  const vegetableId = req.params.id;
  Vegetable.findById(vegetableId)
    .then(foundVegetable => {
      res.render('vegetables/Show', { vegetable: foundVegetable });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Vegetable not found');
    });
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
