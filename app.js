const express = require('express');
const router = require('./src/routes');
const i18nMiddleware = require('./src/i18n/i18n')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(i18nMiddleware);

app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

