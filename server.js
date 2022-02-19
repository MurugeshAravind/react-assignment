const express = require('express');
const path = require('path');
const axios = require('axios');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('/api', async (req, res) => {
  try {
    let apiResponse;
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        apiResponse = response.data;
      })
      .catch((e) => {
        apiResponse = e;
      });
    res.send({ apiResponse });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => {
  console.log('server listening on port', PORT);
});
