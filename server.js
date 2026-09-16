const express = require('express');
const { Liquid } = require('liquidjs');
const path = require('path');

const app = express();

const engine = new Liquid({
    root: [
        path.resolve(__dirname, 'layout'),
        path.resolve(__dirname, 'sections'),
        path.resolve(__dirname, 'snippets'),
    ],
    extname: '.liquid'
});

engine.registerFilter('asset_url', (filename) => {
    return `/assets/${filename}`;
});

engine.registerFilter('stylesheet_tag', (url) => {
    return `<link rel="stylesheet" href="${url}" 
    type="text/css" media="all">`;
});

app.engine('liquid', engine.express());
app.set('views', [
    path.resolve(__dirname, 'layout'),
    path.resolve(__dirname, 'sections'),
    path.resolve(__dirname, 'snippets'),
]);
app.set('view engine', 'liquid');

app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('theme', { name: 'Alim', userRole: 'admin' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
