import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dbConf from './config/db.config.js';
import { getEnvironnement } from './utils/context.js';
import { Player } from './entity/index.js';

const dbConfig = dbConf(getEnvironnement());

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: dbConfig.HOST,
	port: 5432,
	username: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	synchronize: true, // Set to true if schema need to be updated in dev
	logging: getEnvironnement() === 'development',
	entities: [Player],
	migrations: ['dist/migration/*.js'],
	subscribers: []
});
