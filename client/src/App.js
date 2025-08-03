import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:5000/submit', { text });
    setSentiment(response.data.sentiment);
  };

  return (
    <div>
      <h1>Feedback Sentiment Analyzer</h1>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p>Predicted Sentiment: {sentiment}</p>
    </div>
  );
}

export default App;