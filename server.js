const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const PORT = 3000;

const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const app = express();
app.use(helmet());

function CheckLoggedIn(req, res, next) {
	const isLoggedIn = true // FUNCTION that prevents unauthorized users to access secret endpoint 
	if (!isLoggedIn) {
		return res.status(401).json({
			error: 'You must log in!',
		});
	}
	next();
}

app.get('/auth/google', (req, res) => {});

app.get('/auth/google/callback', (req, res) => {});

app.get('/auth/logout', (req, res) => {});

app.get('/secret', CheckLoggedIn, (req, res) => {
	return res.send('Your personal secret value is 42!');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
