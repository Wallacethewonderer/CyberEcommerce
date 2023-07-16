const express = require('express');

const app = express();

// Set up middleware, routes, and other server configurations here

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});