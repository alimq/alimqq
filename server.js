const express = require('express');
const { Liquid } = require('liquidjs');
const path = require('path');
const fs = require('fs');


const dict = {
    'tealand': {
        'name': 'TEALAND',
        'link': 'https://tealand-sep-14-i7j8qdux.myshopify.com/',
        'page': 'work/tealand',
        'poster': 'demo.webp',
        'video': 'demo.mp4',
        'type': 'Tea',
        'what-i-did': 'Problem: given Figma Desktop design, make a website that works on mobile too.\
        <br>What I did: <ul><li>Created 3 designs for breakpoints 162px,700px,1280px based on the 1920px design</li>\
        <li>Coded media queries, starting from mobile and growing to Desktop, to ensure website is responsive</li>\
        <li>Used best practices to ensure fonts and paddings are consistent and readable</li></ul>'
    },
    'lanah-designs': {
        'name': 'Lanah Designs',
        'link': 'https://lanah-designs-c1k7r9pi.myshopify.com/',
        'page': 'work/lanah-designs',
        'poster': 'lanah.webp',
        'video': 'lanah.mp4',
        'type': 'Clothes',
        'what-i-did': 'Problem: given Figma Desktop design, match the Desktop website perfectly to it.\
        <br>What I did: <ul><li>Coded the sections using pure HTML and CSS and Liquid, which is used in Shopify</li>\
        <li>Measured the sizes of objects in Figma before coding them</li>\
        <li>Ensured galleries and collections displayed can be changed by owner of store</li></ul>'
    },
    'sketch-shirts': {
        'name': 'Sketch Shirts',
        'link': 'https://sketch-shirts-gfsm06q0.myshopify.com/',
        'page': 'work/sketch-shirts',
        'poster': 'sketch.webp',
        'video': 'sketch.mp4',
        'type': 'Shirts',
        'what-i-did': "Problem: given Figma Desktop design, match the Desktop website perfectly to it.\
        <br>What I did: <ul><li>Used Shopify's editor to build the sections</li>\
        <li>Wrote custom code for sections where Shopify's editor was not capable</li>\
        <li>Matched details like red price tags from Figma to the real website</li></ul>"
    }
};

const app = express();
const css = fs.readFileSync(path.resolve(__dirname,'assets/bundle.css'),'utf8');

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
        default_layout: 'theme.liquid',
        inline_css: css
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
