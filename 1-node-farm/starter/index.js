function print(...vars){
    console.log(...vars);
}
import { createServer } from 'http';
import { readFileSync } from "fs";


const tempOverview=readFileSync('./templates/template-overview.html');
const tempProduct=readFileSync('./templates/template-product.html');
const tempCard=readFileSync('./templates/template-card.html');
const data=readFileSync('./dev-data/data.json','utf-8');
const dataObj=JSON.parse(data);
 
const server=createServer((req,res)=>{
    const pathName=req.url;
    if(pathName=='/' || pathName=='/overview'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.end();
    }else if(pathName=='/product'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.end("");
    }else if(pathName=="/api"){
        res.writeHead(200,{"Content-type":"application/json"})
        res.end(data);
    }
    else{
        res.writeHead(404,{"Content-type":"text/html"})
        res.end("<h1>404 <br> Page Not Existed</h1>")
    }
})
server.listen(8000,"127.0.0.1",()=>{print("Server is working at port 8000")})
// res.end("hi in my server");
// print(req.socket.remoteAddress);