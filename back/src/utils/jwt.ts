import { Config } from '../models/index.js';
import { getConfig } from '../utils/context.js';
import { expressjwt } from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';
import { Player } from '../entity/index.js';
import { getPlayer } from '../dao/playerDAO.js';
import fs from 'fs';
import toml from 'toml';

const getEnvironnement = (): string => {
	return process.env.NODE_ENV ?? 'development';
};

export const jwtConfig = () => {
	const config: Config = toml.parse(fs.readFileSync(`./config_${getEnvironnement()}.toml`, 'utf-8'));
	const secret: string = config.jwt.secretKey;
	return expressjwt({ secret, algorithms: ['HS256'] });
};

const forgeJWT = async (playerId: string): Promise<string> => {
	const config: Config = getConfig();
	const exp: number = Math.round(Date.now() / 1000) + config.jwt!.expiration;
	const isAdmin: boolean = await isPlayerAdmin(playerId);
	return jsonwebtoken.sign(
		{
			playerId: playerId,
			exp: exp,
			isAdmin: isAdmin
		},
		config.jwt!.secretKey
	);
};

async function isPlayerAdmin(playerId: string): Promise<boolean> {
	const player: Player | null = await getPlayer(playerId);
	return player?.isAdmin ?? false;
}

export { forgeJWT };
