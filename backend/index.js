const express = require('express');
const app = express();

app.listen(4000, () => console.log('listening at 3000'));
app.use(express.static('../frontend/build'));