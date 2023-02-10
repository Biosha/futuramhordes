import { Request } from 'express';
import { createPlayer, getAllPlayers, getPlayer } from '../dao/playerDAO.js';
import { AppDataSource } from '../data-source.js';
import { Quiz } from '../entity/index.js';
import { Player } from '../entity/player.js';
import { Team } from '../entity/team.js';
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

const getTeam = async (req: Request): Promise<TeamR> => {
	const pannel: Array<Player> = await getAllPlayers();
	const team = AppDataSource.getRepository(Team);

	return {
		teamA: {
			player: pannel
				.filter(player => player.team === 'Alpha')
				.map(player => {
					return { MHName: player.MHName, characterImage: player.characterImage, character: player.character };
				}),
			point: await team.findOneBy({ name: 'Alpha' }).then(r => {
				return r!.points;
			})
		},
		teamB: {
			player: pannel
				.filter(player => player.team === 'Beta')
				.map(player => {
					return { MHName: player.MHName, characterImage: player.characterImage, character: player.character };
				}),
			point: await team.findOneBy({ name: 'Beta' }).then(r => {
				return r!.points;
			})
		},
		teamC: {
			player: pannel
				.filter(player => player.team === 'Ceta')
				.map(player => {
					return { MHName: player.MHName, characterImage: player.characterImage, character: player.character };
				}),
			point: await team.findOneBy({ name: 'Ceta' }).then(r => {
				return r!.points;
			})
		},
		teamD: {
			player: pannel
				.filter(player => player.team === 'Delta')
				.map(player => {
					return { MHName: player.MHName, characterImage: player.characterImage, character: player.character };
				}),
			point: await team.findOneBy({ name: 'Delta' }).then(r => {
				return r!.points;
			})
		}
	};
};

const getQuiz = async (req: Request): Promise<Array<Question>> => {
	const totalQuestion = await AppDataSource.getRepository(Quiz).count()
	
	let questionIdList = [];
	while(questionIdList.length < 5){
		var r = Math.floor(Math.random() * totalQuestion) + 1;
		if(questionIdList.indexOf(r) === -1) questionIdList.push(r);
	}

	let questionList = await AppDataSource.getRepository(Quiz).find({
		where: [
			{id: questionIdList[0]},
			{id: questionIdList[1]},
			{id: questionIdList[2]},
			{id: questionIdList[3]},
			{id: questionIdList[4]},
		]
	})

	let final: Array<Question> = questionList.map(q => {
		return {question: q.question, answers: [q.first, q.second, q.third, q.fourth]}
	})

	
	
	return final
};

const quizResponse = async (req: Request): Promise<string> => {
	console.log(req.body);
	return 'ok';
};

function shuffle(array: Array<number>) {
	var tmp, current, top = array.length;
	if(top) while(--top) {
	  current = Math.floor(Math.random() * (top + 1));
	  tmp = array[current];
	  array[current] = array[top];
	  array[top] = tmp;
	}
	return array;
  }

export interface Question {
	question: string;
	answers: Array<string>;
}

export interface TeamR {
	teamA: {
		player: Array<response>;
		point: number;
	};
	teamB: {
		player: Array<response>;
		point: number;
	};
	teamC: {
		player: Array<response>;
		point: number;
	};
	teamD: {
		player: Array<response>;
		point: number;
	};
}
interface response {
	MHName: string;
	characterImage: Buffer;
	character: string;
}

export { login, getCasting, getQuiz, quizResponse, getTeam };
