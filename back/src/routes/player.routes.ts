import { Response, Router } from 'express';
import { Request } from 'express-jwt';
import { Correction, getCasting, getQuiz, getTeam, quizResponse } from '../business/player.js';
import { apiRoutes } from '../constants/index.js';
import { jwtConfig } from '../utils/jwt.js';

const routes: Router = Router();

const commonPath: string = apiRoutes.player;

routes.get(`${commonPath}/getcasting`, jwtConfig(), async (req: Request, res: Response) => {
	try {
		const response: any = await getCasting(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.get(`${commonPath}/getquiz`, jwtConfig(), async (req: Request, res: Response) => {
	try {
		const response: any = await getQuiz(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.get(`${commonPath}/getteam`, jwtConfig(), async (req: Request, res: Response) => {
	try {
		const response: any = await getTeam(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.post(`${commonPath}/quiz`, jwtConfig(), async (req: Request, res: Response) => {
	try {
		const response: Array<Correction> = await quizResponse(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

export default routes;
