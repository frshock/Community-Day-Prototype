const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const PORT = 8040;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let resultList = [];
    let options = { method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search?term=mexican',
    qs: { 
        text: 'del',
        latitude: 43.653226, 
        longitude: -79.38318429999998
    },
    headers: 
    { 'postman-token': 'a6edbc93-ad5c-6278-6bc4-8df9fb23e4b3',
        'cache-control': 'no-cache',
        authorization: 'Bearer Drp4lYzfTpNBy9iz3kzMZ93nzlS1n9srsRuT5NZrGR0FYNmOO70zNv4NoF7vE_USZITU6trAhzguLvIZICMNJXFAOtSGdMW_AIVyv5mbgLhl08ddR2OsByVk_HkKWHYx',
        'content-type': 'application/x-www-form-urlencoded' },
    form: 
    { client_id: 'mAyGa5abEH5SwVYpi528aA',
        client_secret: 'h3YGbygR9UPp2EGDzHB9aJPpyA1Wm9dRqrKNQYxdhgO9MHMCaZfubt5T9PBApr4J',
        access_token: 'Drp4lYzfTpNBy9iz3kzMZ93nzlS1n9srsRuT5NZrGR0FYNmOO70zNv4NoF7vE_USZITU6trAhzguLvIZICMNJXFAOtSGdMW_AIVyv5mbgLhl08ddR2OsByVk_HkKWHYx' }
    }; 

    request(options, function(err, response, body){
        if(!err){
            let $ = cheerio.load(body);
            let parsedObj = JSON.parse(body);
                res.render('index', {resultList: parsedObj.businesses});     
        }
        else{
            console.log(err);
        }
    })
})

app.get('/search/:lat&:lng', (req, res) => {
    var lati = req.params.lat;
    var long = req.params.lng;
    let options = { method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search?term=mexican',
    qs: {
        text: 'del',
        latitude: lati,
        longitude: long,
        },
    headers: 
    { 'postman-token': 'a6edbc93-ad5c-6278-6bc4-8df9fb23e4b3',
        'cache-control': 'no-cache',
        authorization: 'Bearer Drp4lYzfTpNBy9iz3kzMZ93nzlS1n9srsRuT5NZrGR0FYNmOO70zNv4NoF7vE_USZITU6trAhzguLvIZICMNJXFAOtSGdMW_AIVyv5mbgLhl08ddR2OsByVk_HkKWHYx',
        'content-type': 'application/x-www-form-urlencoded' },
    form: 
    { client_id: 'mAyGa5abEH5SwVYpi528aA',
        client_secret: 'h3YGbygR9UPp2EGDzHB9aJPpyA1Wm9dRqrKNQYxdhgO9MHMCaZfubt5T9PBApr4J',
        access_token: 'Drp4lYzfTpNBy9iz3kzMZ93nzlS1n9srsRuT5NZrGR0FYNmOO70zNv4NoF7vE_USZITU6trAhzguLvIZICMNJXFAOtSGdMW_AIVyv5mbgLhl08ddR2OsByVk_HkKWHYx' }
    };

    request(options, function(err, response, body){
        if(!err){
            let $ = cheerio.load(body);
            let parsedObj = JSON.parse(body);
            res.render('search', {resultList: parsedObj.businesses, axisY: lati, axisX: long});
        }
        else{
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
})