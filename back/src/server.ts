import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loadConfigFile } from './utils/context.js';
import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import adminRoutes from './routes/admin.routes.js';
import playerRoutes from './routes/player.routes.js';

const app = express();

// Load TOML configuration file
loadConfigFile();

// Database connection
AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized successfully.');
	})
	.catch(err => {
		console.error('Error during Data Source initialization:', err);
	});

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(playerRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
