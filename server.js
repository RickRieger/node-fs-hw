const http = require("http");
const fs = require('fs');
const path = require('path');

http
.createServer(function (request, response) {
  if (request.url === "/create-directory") {
    fs.mkdir("content", function (error, data) {
      if (error) {
        response.end(error);
      } else {
        response.end("content folder created");
      }
    }); 
  } 
  if (request.url === "/create-text" && request.method === "POST") {
    let body = "";
    request.on("data", function (data) {
      body += data.toString();
    });
    request.on("end", function () {
      fs.writeFile("randomText.txt", "This is some foreign stuff, but I'm gonna get it, and make some money!", function (error) {
        if (error) {
          response.end(error);
        } else {
          response.end("randomText.txt created");
        }
      });
    });
  }
  if (request.url === "/new-folder-and-file" && request.method === "POST") {
    let body = "";
    request.on("data", function (data) {
      body += data.toString();
    });
    request.on("end", function () {
      fs.readFile('randomText.txt', 'utf8' , (error, data) => {
        if (error) {
          response.error(error)
          return
        }
        
        fs.writeFile("content/verbage.txt", data, function (error) {
          if (error) {
            response.end(error);
          } else {
            response.end("verbage.txt created");
          }
        });
      });
    });
    setTimeout(function(){
      fs.unlink("./content/verbage.txt", ()=>{
        fs.rmdir("content", ()=>(console.log("content removed")));
      }) }, 7000);
    }
  })
  
  .listen(3000, function () {
    console.log("Server Started!!!");
  });