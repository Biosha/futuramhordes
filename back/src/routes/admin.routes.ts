import { Request, Response, Router } from 'express';
import { getPannel } from '../business/admin.js';
import { login } from '../business/player.js';
import { apiRoutes } from '../constants/index.js';
import { body, validationResult } from 'express-validator';

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
	[body('discord').exists().isString(),
	body('discordTag').exists().isString()],
	async (req: Request, res: Response) => {
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

export default routes;
