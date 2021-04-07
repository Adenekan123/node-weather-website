const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const path = require('path');



const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/search', (req, res) =>{
    res.render('search');
});

app.get('/error', (req, res) =>{
    res.render('error');
})


app.get('/search/data', (req, res) =>{
    if(!req.query.address) return res.send('Location must be specified');
    else{
        geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
            if(error) return res.send({error});
            forecast(latitude,longitude,(error,forecast)=>{
                if(error) return res.send(error);
                res.send({
                    forecast:forecast.current,
                    location
                });
            });

        });
    }
});

app.get('/location',(req, res)=>{

    if(!req.query.lat && !req.query.lng) return res.send({error:{type:4,message: "Unable to find your current location"}});
    forecast(req.query.lat,req.query.lng,(error,forecast)=>{
        if(error) return res.send(error);
        res.send({
            forecast:forecast.current,
            location:forecast.timezone
        });
    });

});

app.get('*', (req, res)=>{
    res.render('error',{
        error:{type:2,message: "Page Not Found"}
    });
})



app.listen(port,()=>{
    console.log('Listening on port '+port);
});