import { Request } from 'express-jwt';
import { createPlayer, getAllPlayers, getPlayer } from '../dao/playerDAO.js';
import { AppDataSource } from '../data-source.js';
import { History, Quiz } from '../entity/index.js';
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
	const player = await AppDataSource.manager.findOne(Player, {
		where: {
			discordId: req.auth!.playerId
		},
		relations: {
			history: true
		}
	});
	const day = new Date().getDate();
	const month = new Date().getMonth();

	if (
		player?.history.filter(h => h.createdDate.getMonth() === month && h.createdDate.getDate() === day) &&
		player?.history.filter(h => h.createdDate.getMonth() === month && h.createdDate.getDate() === day).length > 0
	) {
		let firstQuestion = await AppDataSource.getRepository(Quiz).findOne({
			where: { id: 1 }
		});
		let fake = [firstQuestion, firstQuestion, firstQuestion, firstQuestion, firstQuestion];
		return fake.map(q => {
			return { id: q!.id, question: q!.question, answers: [q!.first, q!.second, q!.third, q!.fourth] };
		});
	}
	const totalQuestion = await AppDataSource.getRepository(Quiz).count();

	let questionIdList = [];
	while (questionIdList.length < 5) {
		var r = Math.floor(Math.random() * totalQuestion) + 1;
		if (questionIdList.indexOf(r) === -1) questionIdList.push(r);
	}

	let questionList = await AppDataSource.getRepository(Quiz).find({
		where: [
			{ id: questionIdList[0] },
			{ id: questionIdList[1] },
			{ id: questionIdList[2] },
			{ id: questionIdList[3] },
			{ id: questionIdList[4] }
		]
	});

	let final: Array<Question> = questionList
		.map(q => {
			return { id: q.id, question: q.question, answers: [q.first, q.second, q.third, q.fourth], image: q.image };
		})
		.sort((a, b) => 0.5 - Math.random());
	return final;
};

const quizResponse = async (req: Request): Promise<Array<Correction>> => {
	let reponsesQuiz: Array<quizReponse> = req.body.responses
		.filter((r: { answerId: string | null }) => r.answerId !== null)
		.map((r: { id: string; answer: string; answerId: string }) => {
			return { id: parseInt(r.id!), answer: r.answer, answerId: parseInt(r.answerId!) + 1 };
		});
	let prout: Array<Correction> = [];
	for (const r of reponsesQuiz) {
		prout.push(await checkReponseFromQuiz(r.id!, r.answerId!, r.answer!));
	}
	let result = prout.filter(r => r.result).length;
	const player = await AppDataSource.manager.findOne(Player, {
		where: {
			discordId: req.auth!.playerId
		},
		relations: {
			history: true
		}
	});
	const team = await AppDataSource.manager.findOneBy(Team, { name: player?.team });
	const day = new Date().getDate();
	const month = new Date().getMonth();
	if (
		player?.history.filter(h => h.createdDate.getMonth() === month && h.createdDate.getDate() === day) &&
		player?.history.filter(h => h.createdDate.getMonth() === month && h.createdDate.getDate() === day).length > 0
	) {
		return prout;
	} else {
		let newHistory = new History(result, player);
		team!.points! += result;
		await AppDataSource.manager.save(newHistory);
		await AppDataSource.manager.save(team);
		return prout;
	}
};

async function checkReponseFromQuiz(questionId: number, reponseId: number, answerPlayer: string): Promise<Correction> {
	let test = await AppDataSource.getRepository(Quiz).findOneBy({ id: questionId });
	return {
		id: test?.id,
		question: test?.question,
		image: test?.image,
		playerChoice: answerPlayer,
		answer: CorrectAnswer(test!),
		proof: test?.proof,
		result: test?.answer === reponseId
	};
}

function CorrectAnswer(question: Quiz): string {
	switch (question.answer) {
		case 1:
			return question.first;
		case 2:
			return question.second;
		case 3:
			return question.third;
		case 4:
			return question.fourth;
		default:
			return question.first;
	}
}
export interface Correction {
	id?: number;
	question?: string;
	image?: Buffer;
	playerChoice: string;
	answer?: string;
	proof?: string;
	result: boolean;
}

export interface quizReponse {
	id?: number;
	answer?: string;
	answerId?: number;
}

export interface Question {
	id: number;
	image?: Buffer;
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
