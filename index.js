const express=require('express');

const cummulativeAnalysis = require('./analysis');
const app=express();

app.get('/', (req, res)=>{
    return res.status(200)
    .json({ success: true, msg: 'welcome to peoplejoy!!!'})
})

app.get('/patients', (req, res)=>{
    const {lat, lon } = req.query;
    if(!lat || !lon) {
        return res.status(400)
        .json({ success: false, msg: 'please provide the latitude and longitude of the facility specified as "lat" and "lon" respectively inthe query param'})
    } 
    try{
        const patients = cummulativeAnalysis(lat, lon);
        return res.status(200)
        .json({ success: true, msg: 'To ten patients on the waitlist', patients})
    }catch(err){
        return res.status(500)
        .json({ success: false, msg: `Internal Server Err: ${err.message}` })
    }
   
})

app.listen(3000,()=>(console.log('Listening on port 3000')));