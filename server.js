const express=require('express');
const path=require('path')
const app=express();
const cardSymbol=require('./public/cardSymbols.json');

app.use(express.static('src'));
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/src/index.html'));
})

app.get('/card',(req,res)=>{
    
    res.send(cardSymbol);
})

app.listen(3000,()=>{console.log('server run on http://localhost:3000')})