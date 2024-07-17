// import { amazon } from './amazon';
const { amazon } = require('./amazon');
const { nike } = require('./nike');
const { mamaearth } = require('./mamaearth');
const cors = require('cors')


const express = require('express');
// const { mamaearth } = require('./mamaearth');
const app = express()
const port = 3000;
app.use(cors());
const data = {
    ImageURL: "https://m.media-amazon.com/images/I/41KuRShR97L._SX425_.jpg",
    ProdPrice: "₹299.00",
    Title: "Portronics Toad 23 Wireless Optical Mouse with 2.4GHz, USB Nano Dongle, Optical Orientation, Click Wheel, Adjustable DPI(Black)",
}
app.get('/ScraperCC/Amazon.in', function (req, res) {
    console.log(req.query.url);
    let main = async () => {
        let Data = await amazon(req.query.url);
        res.json(Data);

    }
    main();

})
app.get('/ScraperCC/mamaearth.in', function (req, res) {
    let main = async () => {

        let Data = await mamaearth(req.query.url);
        res.json(Data);
    }
    main();
})
app.get('/ScraperCC/nike.com', function (req, res) {
    let main = async () => {
        let Data = await nike(req.query.url);
        res.json(Data);
    }
    main();
})


app.listen(port, () => {
    console.log("server is listening on", port)
})





