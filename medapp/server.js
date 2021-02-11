const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
//const body = bodyParser();
const mustache = mustacheExpress();
mustache.cache = null;
const { Client } = require('pg');

app.engine('mustache', mustache);
app.set('view engine', 'mustache');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true})); 

app.listen(5001, ()=>{
    console.log('Listening to port 5001');
});

// dashboard
app.get('/dashboard', (req, res)=>{

    // initialize the client
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical1',
        password: 'kmz',
        port: 5432
    });

    client.connect()
    .then(()=>{
        return client.query('SELECT SUM(count) FROM meds; SELECT DISTINCT COUNT(brand) FROM meds;');
    })
    .then ((results)=>{
        console.log('result? ', results[0]);
        console.log('result? ', results[1]);

        res.render('dashboard', {n1:results[0].rows, n2:results[1].rows});
    })

});
app.get('/meds', (request, respond)=>{

    // initialize the client
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical1',
        password: 'kmz',
        port: 5432

    });

    // make a connection
    client.connect()
    .then(()=>{
        
        return client.query('SELECT * FROM meds');


    })
    .then((results)=>{
        
        console.log('result? ', results);
        respond.render('meds', results);

    }); 

    //respond.render('meds');
});

app.get('/add', (request, respond)=>{
    respond.render('meds-form');
});

app.post('/meds/add', (request, respond)=>{
    console.log('post body = ', request.body);

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical1',
        password: 'kmz',
        port: 5432

    });

    client.connect()
    .then(()=>{
        console.log('Connection Complete!');

        //insert data into database
        const sql = 'INSERT INTO meds (name, count, brand) VALUES ($1, $2, $3)';
        const params = [request.body.name, request.body.count, request.body.brand];
        return client.query(sql, params);

    })
    .then((result)=>{
        console.log('Results?', result);
        respond.redirect('/meds');
    });    ; // Promises: simply a set of statement which are going to run if the particular statement is finished.

});

app.post('/meds/delete/:id', (request, respond)=>{

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical1',
        password: 'kmz',
        port: 5432

    });

    client.connect()
    .then(()=>{
        const sql = 'DELETE FROM meds WHERE mid=$1'
        const params = [request.params.id]; //:id
        return client.query(sql, params);
        
    })
    .then((result)=>{
        respond.redirect('/meds');
    }); 

});

// Update or edit the meds table in the table
app.get('/meds/edit/:id', (request, respond)=>{

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical1',
        password: 'kmz',
        port: 5432

    });

    client.connect()
    .then(()=>{
        const sql = 'SELECT * FROM meds WHERE mid=$1'
        const params = [request.params.id]; 
        return client.query(sql, params);
        
    })
    .then((results)=>{
        console.log('results: ', results);
        respond.render('meds-form-edit', {med: results.rows[0]}); // pass the mid to the "Edit med form"
    }); 

});

app.post('/meds/edit/:id', (request, response)=>{

    console.log('post body = ', request.body);

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical1',
        password: 'kmz',
        port: 5432

    });

    client.connect()
    .then(()=>{
        const sql = 'UPDATE meds SET name=$1, count=$2, brand=$3 WHERE mid=$4'
        const params = [request.body.name, request.body.count, request.body.brand, request.params.id];
        //const params = [request.body.name, request.body.count, request.body.brand, request.params.id];
        return client.query(sql, params);
        
    })
    .then((results)=>{
        console.log('results? ', results);
        response.redirect('/meds');
    }); 

});
