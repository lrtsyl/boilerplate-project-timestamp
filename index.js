// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Implement the timestamp endpoint
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let d;

  if (!date) {
    // no date -> current time
    d = new Date();
  } else if (/^\d+$/.test(date)) {
    // all digits -> treat as milliseconds-since-epoch
    d = new Date(Number(date));
  } else {
    // otherwise let Date parse the string
    d = new Date(date);
  }

  // check for invalid date
  if (isNaN(d.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // success response
  res.json({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
