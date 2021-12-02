
const path = require('path');
// ...
const requestListener = (req, response) => {
  let { url } = req;
  console.log('url',url);
   if(url === '/'){
     url = '/src/index.html';
   }
   if(url === '/index.js'){
     url = '/src/index.js'
   }

   const filePath = `.${url}`;
    
  // Get the extension name aka the string after the dot. For example, a url like 
  // https://example.com/assets/main.css will result in extension name of css.
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.wasm': 'application/wasm',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    staticFileHandler(req, response, filePath, contentType);
  }
//}
const http = require('http')
const server = http.createServer(requestListener).listen(3045);

const fs = require('fs')

const staticFileHandler = (req, res, filePath, contentType) => {
 // console.log('filePath ',filePath);
  res.setHeader('Access-Control-Allow-Origin', '*');
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Sorry, check with the site admin for error: ${err.code}`)
    } else {
      res.writeHead(200, { 'Content-Type': contentType }); // indicate the request was successful
      res.end(content, 'utf-8');
    }
  })
}