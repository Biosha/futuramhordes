import { Request, Response, Router } from 'express';
import { getCasting } from '../business/player.js';
import { apiRoutes } from '../constants/index.js';

const routes: Router = Router();

const commonPath: string = apiRoutes.player;

routes.get(`${commonPath}/getcasting`, async (req: Request, res: Response) => {
	try {
		const response: any = await getCasting(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

export default routes;
