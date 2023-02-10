import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dbConf from './config/db.config.js';
import { getEnvironnement } from './utils/context.js';
import { History, Player, Quiz, Team } from './entity/index.js';

const dbConfig = dbConf(getEnvironnement());

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: dbConfig.HOST,
	port: 5432,
	username: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	synchronize: true, //true, // Set to true if schema need to be updated in dev
	logging: true, //getEnvironnement() === 'development',
	entities: [Player, History, Quiz, Team],
	migrations: ['dist/migration/*.js'],
	subscribers: []
});
