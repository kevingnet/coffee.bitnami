const express = require("express");
const cors = require("cors");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
const PORT = process.env.PORT || 8081;
console.log('using port: ' + PORT);

// parse requests of content-type - application/json
app.use(cors({
  origin: '*'
}));

app.use(express.json());

// simple route test
app.get("/", (req, res) => {
  console.log('server.js using port: ' + PORT);
  res.json({ message: "Welcome to the virtual machine application" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

class Machine {
  constructor(water, beans) {
    this.water = water;
    this.beans = beans;
  }
  static MAX_WATER = 480; 
  static MAX_BEANS = 240; 
};
class Levels {
  constructor(water, beans) {
    this.water = water;
    this.beans = beans;
  }
  static MAX_LEVEL = 100; 
};
class Brew {
  constructor(cup_size, grain_size, delay) {
    this.cup_size = cup_size;
    this.grain_size = grain_size;
    this.delay = delay;
  }
  static MAX_DELAY = 60; //60 seconds

  static SIZE_TALL = 4; 
  static SIZE_GRANDE = 5;
  static SIZE_VENTI = 6; 
  
  static GRAIN_FACTOR = 1;
  static WATER_FACTOR = 4;
  static NO_DELAY = 0;
  static DEFAULT_GRANULARITY = 5;
};
let levels = new Levels(Levels.MAX_LEVEL, Levels.MAX_LEVEL);
let machine = new Machine(Machine.MAX_WATER, Machine.MAX_BEANS);
let brew = new Brew(Brew.SIZE_GRANDE, Brew.DEFAULT_GRANULARITY, Brew.NO_DELAY);

function percentage(value, total) {
  return (100 * value) / total;
} 

// API: level, fill, brew

app.get("/level", (req, res) => {
  let wtr = percentage(parseInt(machine.water, 10), Machine.MAX_WATER);
  let bns = percentage(parseInt(machine.beans, 10), Machine.MAX_BEANS);
  wtr = Math.floor(wtr);
  bns = Math.floor(bns);
  levels.water = wtr;
  levels.beans = bns;
  res.send(JSON.stringify(levels));
});

app.post("/refill", (req, res) => {
  let wtr = Machine.MAX_WATER;
  let bns = Machine.MAX_BEANS;
  if(req.body) {
    if (req.body.water) {
      wtr = req.body.water;
    }  
    if (req.body.beans) {
      bns = req.body.beans;
    }
  }
  machine.water = wtr;
  machine.beans = bns;
  res.send(JSON.stringify(machine));
});

app.post("/brew", (req, res) => {
  let cup_size = Brew.SIZE_TALL;
  let grain_size = Brew.DEFAULT_GRANULARITY;
  let delay = Brew.NO_DELAY;

  if(req.body) {
    if (req.body.cup_size) {
      brew.cup_size = req.body.cup_size;
    }  
    if (req.body.grain_size) {
      brew.grain_size = req.body.grain_size;
    }    
    if (req.body.delay) {
      brew.delay = req.body.delay;
    }
  }

  sz = parseInt(cup_size, 10);
  let sub_water = Brew.WATER_FACTOR * sz;
  let sub_grain = Brew.GRAIN_FACTOR * sz;

  machine.water = machine.water - sub_water;
  machine.beans = machine.beans - sub_grain;

  if( machine.water < 0) {
    machine.water = 0;
    res.send("Cannot brew machine, as there isn't enough water, please refill the machine: levels" + JSON.stringify(machine));
    return;
  } else if( machine.beans < 0) {
    machine.beans = 0;
    res.send("Cannot brew machine, as there aren't enough beans, please refill the machine: levels" + JSON.stringify(machine));
    return;
  }
  res.send(JSON.stringify(machine));
});

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

app.get('/error', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
