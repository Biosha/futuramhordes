import { Request, Response, Router } from 'express';
import { getPannel, updatePlayer } from '../business/admin.js';
import { login } from '../business/player.js';
import { apiRoutes } from '../constants/index.js';
import { body, validationResult } from 'express-validator';
import { Player } from '../entity/player.js';

const routes: Router = Router();

const commonPath: string = apiRoutes.admin;

routes.get(`${commonPath}/getpannel`, async (req: Request, res: Response) => {
	try {
		const response: any = await getPannel(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

routes.post(
	`${commonPath}/authenticate`,
	[body('discord').exists().isString(), body('discordTag').exists().isString()],
	async (req: Request, res: Response) => {
		console.log('coucou');
		if (!validationResult(req).isEmpty()) {
			return res.status(400).json({ errors: validationResult(req) });
		}

		try {
			const response: boolean = await login(req);
			return res.status(200).send(response);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send(err.message);
		}
	}
);

routes.post(
	`${commonPath}/update`,
	[body('discord').exists().isString(), body('MHName').exists().isString(), body('character').exists().isString()],
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

export default routes;
