import { Response, Router } from 'express';
import { Request } from 'express-jwt';
import { getCasting } from '../business/player.js';
import { apiRoutes } from '../constants/index.js';
import { jwtConfig } from '../utils/jwt.js';

const routes: Router = Router();

const commonPath: string = apiRoutes.player;

routes.get(`${commonPath}/getcasting`, jwtConfig(), async (req: Request, res: Response) => {
	console.log(req.auth?.playerId);
	try {
		const response: any = await getCasting(req);
		return res.status(200).send(response);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send(err.message);
	}
});

export default routes;
