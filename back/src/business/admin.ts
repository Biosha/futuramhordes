import { Request } from 'express';
import { createPlayer, getAllPlayers, getPlayer } from '../dao/playerDAO.js';
import { Player } from '../entity/index.js';
import { AppDataSource } from '../data-source.js';
const playerRepository = AppDataSource.getRepository(Player);

const getPannel = async (req: Request): Promise<Array<Player>> => {
	const pannel: Array<Player> = await getAllPlayers();
	return pannel;
};

const updatePlayer = async (req: Request): Promise<Array<Player>> => {
	let player = (await playerRepository.manager.findOneBy(Player, { discordId: req.body.discord })) as Player;
	player.character = req.body.character;
	player.MHName = req.body.MHName;

	await playerRepository.manager.save(player);

	const pannel: Array<Player> = await getAllPlayers();
	return pannel;
};

export { getPannel, updatePlayer };
