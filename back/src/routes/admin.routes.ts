import { Response, Router } from 'express';
import { Request } from 'express-jwt';
import { getPannel, updatePlayer } from '../business/admin.js';
import { login } from '../business/player.js';
import { apiRoutes } from '../constants/index.js';
import { body, param, validationResult } from 'express-validator';
import { Player } from '../entity/player.js';
import { jwtConfig } from '../utils/jwt.js';
import { AppDataSource } from '../data-source.js';
import { Team } from '../entity/team.js';
import multer from 'multer';
import { Quiz } from '../entity/quiz.js';

const routes: Router = Router();

const commonPath: string = apiRoutes.admin;

routes.get(`${commonPath}/getpannel`, jwtConfig(), async (req: Request, res: Response) => {
	try {
		const response: any = await getPannel(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.get(`${commonPath}/init`, jwtConfig(), async (req: Request, res: Response) => {
	try {
		const team = AppDataSource.getRepository(Team);
		const test = await team.find({ select: { name: true } });
		if (req.auth?.isAdmin && test.length === 0) {
			const teamsToCreate: Array<Team> = [new Team('Alpha'), new Team('Beta'), new Team('Ceta'), new Team('Delta')];
			team.manager.save(teamsToCreate);
		}

		return res.status(200).send('response');
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.post(
	`${commonPath}/authenticate`,
	[body('discord').exists().isString(), body('discordTag').exists().isString()],
	async (req: Request, res: Response) => {
		if (!validationResult(req).isEmpty()) {
			return res.status(400).json({ errors: validationResult(req) });
		}

		try {
			const response: string = await login(req);
			return res.status(200).send(response);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send(err.message);
		}
	}
);

routes.post(
	`${commonPath}/update`,
	[
		body('discord').exists().isString(),
		body('MHName').exists().isString(),
		body('character').exists().isString(),
		body('team').exists().isString()
	],
	jwtConfig(),
	async (req: Request, res: Response) => {
		// if (!validationResult(req).isEmpty()) {
		// 	return res.status(400).json({ errors: validationResult(req) });
		// }

		try {
			const response: Array<Player> = await updatePlayer(req);
			return res.status(200).send(response);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send(err.message);
		}
	}
);

export interface Question {
	title: string;
	question: string;
	answers1: string;
	answers2: string;
	answers3: string;
	answers4: string;
	goodAnswer: number;
	proof: string;
}

routes.get(`${commonPath}/getall`, jwtConfig(), async (req: Request, res: Response) => {
	const retour = await AppDataSource.getRepository(Quiz).find();


	try {
		if (req.auth?.isAdmin) {
			return res.status(200).send(retour);
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.put(
	`${commonPath}/createq/:title`,
	[multer().single('file'), param('title').exists().isString()],
	async (req: Request, res: Response) => {
		if (!validationResult(req).isEmpty()) {
			return res.status(400).json({ errors: validationResult(req) });
		}

		const newQuestion: Partial<Quiz> = {
			question: req.body.question,
			image: req.file?.buffer as Buffer,
			first: req.body.first,
			second: req.body.second,
			third: req.body.third,
			fourth: req.body.fourth,
			answer: parseInt(req.body.answer),
			proof: req.body.proof
		};

		try {
			await AppDataSource.getRepository(Quiz).save(newQuestion);
			return res.status(200).send();
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

routes.post(
	`${commonPath}/updateq/:id`,
	[multer().single('file'), param('id').exists().isNumeric()],
	async (req: Request, res: Response) => {
		if (!validationResult(req).isEmpty()) {
			return res.status(400).json({ errors: validationResult(req) });
		}

		const updateQuestion: Partial<Quiz> = {
			question: req.body.question,
			image: req.file?.buffer as Buffer,
			first: req.body.first,
			second: req.body.second,
			third: req.body.third,
			fourth: req.body.fourth,
			answer: parseInt(req.body.answer),
			proof: req.body.proof
		};

		try {
			await AppDataSource.getRepository(Quiz).createQueryBuilder().update(Quiz).where('id = :i', { i: req.params.id}).set(updateQuestion).execute()
			return res.status(200).send();
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

export default routes;
