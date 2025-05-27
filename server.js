const express = require('express'); // Web framework
const bodyParser = require('body-parser'); // To parse JSON bodies
const app = express();
const cors = require('cors')
const port = 3000;

// Variables to store signaling data
let offer = null;
let answer = null;
let offerCandidates = [];
let answerCandidates = [];

// Middleware
app.use(bodyParser.json()); // Parse JSON POST bodies
app.use(express.static('public')); // Serve static files from "public" folder
app.use(cors())

const logVar = () => {
    console.log('VAR:: ', {
        offer,
        answer,
        offerCandidates,
        answerCandidates,
    });
}
// POST endpoint for caller to send SDP offer
app.post('/offer', (req, res) => {
  offer = req.body;
  answer = null;
  offerCandidates = [];
  answerCandidates = [];
  logVar();
  res.sendStatus(200);
});

// GET endpoint for callee to fetch the offer
app.get('/offer', (req, res) => {
  res.json(offer);
});

// POST endpoint for callee to send SDP answer
app.post('/answer', (req, res) => {
  answer = req.body;
  logVar();
  res.sendStatus(200);
});

// GET endpoint for caller to fetch the answer
app.get('/answer', (req, res) => {
  res.json(answer);
});

// POST endpoint for caller to send ICE candidates
app.post('/offer-candidate', (req, res) => {
  offerCandidates.push(req.body);
  logVar();
  res.sendStatus(200);
});

// GET endpoint for callee to fetch caller's ICE candidates
app.get('/offer-candidates', (req, res) => {
  res.json(offerCandidates);
});

// POST endpoint for callee to send ICE candidates
app.post('/answer-candidate', (req, res) => {
  answerCandidates.push(req.body);
  logVar();
  res.sendStatus(200);
});

// GET endpoint for caller to fetch callee's ICE candidates
app.get('/answer-candidates', (req, res) => {
  res.json(answerCandidates);
});

// Start the server
app.listen(port, () => {
  console.log(`Signaling server running at http://localhost:${port}`);
});
