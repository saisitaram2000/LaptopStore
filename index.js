const fs = require('fs'); //allows to work with filesystem on ur computer
const http = require('http');
const url = require('url');
const { RSA_NO_PADDING } = require('constants');
const json=fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');
console.log(__dirname);
const laptopData=JSON.parse(json);
//console.log(JSON.parse(json));

const server=http.createServer((req,res) =>{

    const pathName=url.parse(req.url,true).pathname;
    const id=url.parse(req.url,true).query.id;
   // console.log(url.parse(req.url,true));

    //PRODUCTS OVERVIEW
    if(pathName==='/products' || pathName==='/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8',(err,data) =>{
           let overviewOutput=data;
            fs.readFile(`${__dirname}/templates/template-card.html`,'utf-8',(err,data) =>{
             
                const cardsOutput = laptopData.map(el => replaceTemplate(data,el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
               // console.log(cardsOutput);
                res.end(overviewOutput);
            })

        })
    }

    //LAPTOP DETAILS
    else if(pathName==='/laptop' && id<=laptopData.length){

        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf-8',(err,data) =>{
          const laptop=laptopData[id];
          const output = replaceTemplate(data,laptop);
            res.end(output);
        })
       
    }
    
    //IMAGES
    else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img/${pathName}`,(err,data) =>{
            res.writeHead(200,{'Content-Type':'image/jpg'});
            res.end(data);
        })
    }


    //URL NOT FOUND
    else{
        res.writeHead(404,{'Content-Type':'text/html'});

        fs.readFile(`${__dirname}/templates/template-404.html`,'utf-8',(err,data)=>{
            res.end(data);
        })
     
    }
    

})
server.listen(8080,'127.0.0.1',()=>{
    console.log('listening for requests now');
})

function replaceTemplate(originalHtml,laptop){
    let output=originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%id%}/g, laptop.id);
    return output;
}