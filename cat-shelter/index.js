const http = require('http');
const fs = require('fs/promises');
const siteCss = require('./content/styles/site');


const cats = [
    {
        id: 1,
        name: 'Navcho',
        breed: 'Persian',
        description: 'Very cute cat',
    },
    {
        id: 2,
        name: 'Sasha',
        breed: 'Russian Blue',
        description: 'Fluffy cat',
    },
    {
        id: 3,
        name: 'Garry',
        breed: 'Angora',
        description: 'Fat cat',
    }
];

const server = http.createServer(async (req, res) => {
    console.log(req.url);

    if (req.url == '/') {
        const homeHtml = await fs.readFile('./views/home/index.html', 'utf-8');
        const catHtml = await fs.readFile('./views/cat.html', 'utf-8');

        const catsHtml = cats.map(cat =>
            Object.keys(cat).reduce((result, key) => {
                result = result.replace(`{{${key}}}`, cat[key]);

                return result;
            }, catHtml)
        );
        const homeResult = homeHtml.replace('{{cats}}', catsHtml);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homeResult);
    } else if (req.url == '/styles/site.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(siteCss);
    } else if (req.url == '/cats/add-breed') {
        const addBreedHtml = await fs.readFile('./views/addBreed.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(addBreedHtml);
    }
    res.end();
});

server.listen(5000, () => console.log('This server is running on port 5000...'));