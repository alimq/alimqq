const express = require('express');
const { Liquid } = require('liquidjs');
const path = require('path');

const dict = {
    'tealand': {
        'name': 'TEALAND',
        'link': 'https://tealand-sep-14-i7j8qdux.myshopify.com/',
        'page': 'work/tealand',
        'poster': 'demo.png',
        'video': 'demo.mp4',
        'type': 'Shopify',
        'what-i-did': 'Made responsive designs and built the website'
    },
    'lanah-designs': {
        'name': 'Lanah Designs',
        'link': 'https://lanah-designs-c1k7r9pi.myshopify.com/',
        'page': 'work/lanah-designs',
        'poster': 'lanah.png',
        'video': 'lanah.mp4',
        'type': 'Shopify',
        'what-i-did': 'Made responsive designs and built the website'
    },
    'sketch-shirts': {
        'name': 'Sketch Shirts',
        'link': 'https://sketch-shirts-gfsm06q0.myshopify.com/',
        'page': 'work/sketch-shirts',
        'poster': 'sketch.png',
        'video': 'sketch.mp4',
        'type': 'Shopify',
        'what-i-did': 'Made responsive designs and built the website'
    }
};

const app = express();

const engine = new Liquid({
    root: [
        path.resolve(__dirname, 'templates'),
        path.resolve(__dirname, 'layout'),
        path.resolve(__dirname, 'snippets'),
        path.resolve(__dirname, 'sections')
    ],
    layouts: path.resolve(__dirname, 'layout'),
    extname: '.liquid',
    globals: {
        default_layout: 'theme.liquid'
    }
});

engine.registerFilter('asset_url', (filename) => {
    return `/assets/${filename}`;
});

engine.registerFilter('stylesheet_tag', (url) => {
    return `<link rel="stylesheet" href="${url}" 
    type="text/css" media="all">`;
});

app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, 'templates'));
app.set('view engine', 'liquid');

app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/full-portfolio', (req, res) => {
    res.render('full-portfolio', {dict});
});

app.get('/contacts', (req, res) => {
    res.render('contacts', {});
});

app.get('/work/:name', (req, res) => {
    let work=req.params.name;
    let arr=['tealand','lanah-designs','sketch-shirts'];
    if(arr.includes(work))
        res.render('work', { work: dict[work] });
    else
        res.status(404);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
