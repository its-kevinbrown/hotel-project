const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
const mustache = mustacheExpress();
const bodyParser = require('body-parser');
const { Client } = require('pg');




mustache.cache = null;
app.engine('mustache',mustache);
app.set('view engine','mustache');



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));


app.get('/booking', (req,res)=>{
    res.render('book-now');
});


app.post('/dashboard/booking', (req,res)=>{
    console.log('post body', req.body);

    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database:'hotel',
        password:'123456789Nb',
        port: 5432,
    });
client.connect()
    .then(()=>{
        console.log('Connection Complete');
        const sql = 'INSERT INTO bookings (name,number,arrival,departure,room,adult,children) VALUES($1, $2, $3, $4, $5, $6, $7)'
        const params = [req.body.name,req.body.number,req.body.arrival,req.body.departure,req.body.room,req.body.adult,req.body.children];
        return client.query(sql,params);

    })
    .then((result)=>{
        console.log('results?', result);
        res.redirect('/dashboard');
    });
   
});


app.get('/dashboard', (req,res)=>{


    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database:'hotel',
        password:'123456789Nb',
        port: 5432,
    });
client.connect()
    .then(()=>{
       return client.query('SELECT * FROM bookings');

    })
    .then((results)=>{
        console.log('results?', results);        
         res.render('dashboard',results);
        
    });


   
});


app.post('/reservations', (req,res)=>{
    console.log('post body', req.body);

    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database:'hotel',
        password:'123456789Nb',
        port: 5432,
    });
client.connect()
    .then(()=>{
        console.log('Connection Complete');
    })
    .then((result)=>{
        res.redirect('/reservations');
    });
   
});

app.get('/reservations', (req,res)=>{
    res.render('reservations');
});

app.get('/about-us', (req,res)=>{
    res.render('about-us');
});



app.listen(5000,()=>{
    console.log('listening to port 5000');
})