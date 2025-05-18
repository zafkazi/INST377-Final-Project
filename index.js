const express = require('express');
const axios = require('axios');
const supabase = require('./supabaseClient');
require('dotenv').config();

const app = express();
app.use(express.json());

// GET /symbols - Fetch currency symbols and store them
app.get('/symbols', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.exchangerate.host/symbols');
    const symbols = data.symbols;

    const upsertData = Object.entries(symbols).map(([code, { description }]) => ({
      code,
      description
    }));

    await supabase
      .from('currency_symbols')
      .upsert(upsertData, { onConflict: ['code'] });

    res.json(symbols);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch symbols' });
  }
});

// POST /convert - Convert currencies and log the conversion
app.post('/convert', async (req, res) => {
  const { from, to, amount } = req.body;

  try {
    const response = await axios.get(`https://api.exchangerate.host/convert`, {
      params: { from, to, amount }
    });

    const result = response.data.result;

    await supabase.from('conversion_logs').insert({
      from,
      to,
      amount,
      result
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

