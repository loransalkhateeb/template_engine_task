const express = require("express");

const app = express();
const http = require("https");
app.set("view engine", "ejs");

const hostname = "127.0.0.1";
const port = 3000;
app.get("/", (request, response) => {
    const options = {
        method: 'GET',
        hostname: 'imdb-top-100-movies1.p.rapidapi.com',
        port: null,
        path: '/',
        headers: {
            'X-RapidAPI-Key': 'fe6d068457msh5750abb6609e827p1c4fb7jsn179e85a98608',
            'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
        }
    };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    console.log(chunks);

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());

      const view = JSON.parse(body);
      const filteredMovies = view.filter((movie) => movie.genre == "Drama");

      response.render("index.ejs", { movie: filteredMovies });
    });
  });

  req.end();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




