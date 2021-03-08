const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('@@@@@ prot listen on 5000'));