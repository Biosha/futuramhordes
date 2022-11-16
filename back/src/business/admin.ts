import { Request } from 'express';
import { getAllPlayers } from '../dao/playerDAO.js';
import { Player } from '../entity/index.js';

const getPannel = async (req: Request): Promise<Array<Player>> => {
	const pannel: Array<Player> = await getAllPlayers();
	console.log(pannel);
	return pannel;
};

export { getPannel };
