const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Supabase setup
const url = 'https://xsrfaygnwjouslnhhbzd.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcmZheWdud2pvdXNsbmhoYnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjA0MjUsImV4cCI6MjA2MzA5NjQyNX0.M0UTWpv6rcjF5YMoxv9wwpXT7vvmm7f14g8KfXQw0RA';

const supabase = createClient(url, key);

// Home route
app.get('/', (req, res) => {
  res.sendFile('INST377-CurrencyConverter.html', { root: __dirname });
});

// GET /symbols - Retrieve currency symbols from Supabase
app.get('/symbols', async (req, res) => {
  const { data, error } = await supabase
    .from('currency_symbols')
    .select();

  if (error) {
    console.error('Error retrieving symbols:', error.message);
    res.status(500).json({ error: 'Failed to retrieve symbols from database' });
  } else {
    res.json(data);
  }
});

// POST /convert - Fetch conversion from exchangerate.host and log to Supabase
app.post('/convert', async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Missing required fields: from, to, or amount' });
  }

  try {
    const response = await axios.get('https://api.exchangerate.host/convert', {
      params: { from, to, amount }
    });

    const result = response.data.result;

    await supabase
      .from('conversion_logs')
      .insert({ from, to, amount, result });

    res.json({ from, to, amount, result });
  } catch (error) {
    console.error('Error during conversion:', error.message);
    res.status(500).json({ error: 'Currency conversion failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

