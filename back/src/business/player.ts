import { Request } from 'express';
import { createPlayer, getAllPlayers, getPlayer } from '../dao/playerDAO.js';
import { Player } from '../entity/player.js';
import { forgeJWT } from '../utils/jwt.js';

const login = async (req: Request): Promise<string> => {
	let player: Player | null = await getPlayer(req.body.discord);

	if (player === null) {
		player = {
			discordId: req.body.discord,
			discordTag: req.body.discordTag,
			isAdmin: req.body.discord == '114777992244363273' || req.body.discord == '154619774284857345'
		} as Player;
		player = await createPlayer(player);
	}

	return await forgeJWT(req.body.discord);
};

const getCasting = async (req: Request): Promise<Array<response>> => {
	const pannel: Array<Player> = await getAllPlayers();

	return pannel.map(player => {
		return { MHName: player.MHName, characterImage: player.characterImage, character: player.character };
	});
};

interface response {
	MHName: string;
	characterImage: Buffer;
	character: string;
}

export { login, getCasting };
