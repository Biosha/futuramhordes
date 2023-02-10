import { Request } from 'express-jwt';
import { createPlayer, getAllPlayers, getPlayer } from '../dao/playerDAO.js';
import { Player } from '../entity/index.js';
import { AppDataSource } from '../data-source.js';
const playerRepository = AppDataSource.getRepository(Player);

const getPannel = async (req: Request): Promise<Array<Player>> => {
	let pannel: Array<Player>;
	if (req.auth!.isAdmin) {
		pannel = await getAllPlayers();
	} else {
		pannel = [];
	}
	return pannel;
};

const updatePlayer = async (req: Request): Promise<Array<Player>> => {
	if (!req.auth!.isAdmin) {
		throw new Error(`You're not admin`);
	}
	let player = (await playerRepository.manager.findOneBy(Player, { discordId: req.body.discord })) as Player;

	player.character = req.body.character;
	player.MHName = req.body.MHName;
	player.team = req.body.team;

	await playerRepository.manager.save(player);

	const pannel: Array<Player> = await getAllPlayers();
	return pannel;
};

export { getPannel, updatePlayer };
