function print(...vars) {
    console.log(...vars);
}
const Helper = require('./helper');
const http = require("http");
const fs = require("fs");
const url = require("url");
// const helper=require("helper");
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%HOME%}/g, '/')
    if (product.organic == false) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }

    return output;
}


const server = http.createServer((req, res) => {
    const helper = new Helper(req);
    print(helper.getParameterValue('id'))
    const pathName = req.url;
    // print(new URL(req.url, "http://127.0.0.1/"))
    let idPara = new URL(req.url, "http://127.0.0.1/").searchParams.get('id');

    if (pathName == '/' || pathName == '/overview') {
        const cardsHtml = dataObj.map((el) => {
            return replaceTemplate(tempCard, el);
        }).join("");
        let output = tempOverview.replace(/{%PRODUCTCARDS%}/g, cardsHtml);
        res.writeHead(200, {
            "Content-type": "text/html"
        });
        res.end(output);

    } else if (pathName == `/product?id=${idPara}`) {
        let output = replaceTemplate(tempProduct, dataObj[idPara])
        res.writeHead(200, {
            "Content-type": "text/html"
        });
        res.end(output);
    } else if (pathName == "/api") {
        res.writeHead(200, {
            "Content-type": "application/json"
        })
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html"
        })
        res.end("<h1>404 <br> Page Not Existed</h1>")
    }
})
server.listen(8000, "127.0.0.1", () => {
    print("Server is working at port 8000")
})