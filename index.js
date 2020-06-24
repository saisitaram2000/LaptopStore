const fs = require('fs'); //allows to work with filesystem on ur computer
const http = require('http');
const url = require('url');
const json=fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');
console.log(__dirname);
const laptopData=JSON.parse(json);
//gconsole.log(JSON.parse(json));

const server=http.createServer((req,res) =>{

    const pathName=url.parse(req.url,true).pathname;
    const id=url.parse(req.url,true).query.id;
    console.log(url.parse(req.url,true));

    if(pathName==='/products' || pathName==='/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('this is PRODUCTS page');
    }else if(pathName==='/laptop' && id<=laptopData.length){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(`this is Laptop page for laptop ${id}`);
    }else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end('URL not found on server');
    }
    

})
server.listen(8080,'127.0.0.1',()=>{
    console.log('listening for requests now');
})