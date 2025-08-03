const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.post('/submit', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:5001/predict', { text });
    const sentiment = response.data.sentiment;

    const newFeedback = new Feedback({ text, sentiment });
    await newFeedback.save();

    res.json({ message: 'Feedback saved!', sentiment });
  } catch (err) {
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});