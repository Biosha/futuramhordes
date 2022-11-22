import { Request } from 'express';
import { createPlayer, getPlayer } from '../dao/playerDAO.js';
import { Player } from '../entity/player.js';

const login = async (req: Request): Promise<boolean> => {
	let player: Player | null = await getPlayer(req.body.discord);

	if (player === null) {
		player = {
			discordId: req.body.discord,
			discordTag: req.body.discordTag
		} as Player;
		player = await createPlayer(player);
	}

	return true;
};

export { login };
