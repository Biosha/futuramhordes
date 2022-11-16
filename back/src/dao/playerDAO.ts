import { AppDataSource } from '../data-source.js';
import { Player } from '../entity/index.js';

const playerRepository = AppDataSource.getRepository(Player);

const createPlayer = (newPlayer: Player): Promise<Player> => {
	return playerRepository.save(newPlayer);
};

const getPlayer = (eternalTwinId: string): Promise<Player | null> => {
	return playerRepository
		.createQueryBuilder('player')
		.select(['player.id', 'player.discordId', 'player.discordTag', 'player.MHName', 'player.character'])
		.where('player.discordId = :eId', { eId: eternalTwinId })
		.getOne();
};

const getAllPlayers = (): Promise<Array<Player>> => {
	return playerRepository
		.createQueryBuilder('player')
		.select(['player.id', 'player.discordId', 'player.discordTag', 'player.MHName', 'player.character'])
		.getMany();
};


export { createPlayer, getPlayer, getAllPlayers };
