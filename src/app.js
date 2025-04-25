const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

function add(a, b) {
  return a + b;
}

module.exports = {
  app,
  add
};

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}