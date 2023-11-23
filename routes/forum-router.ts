import express from 'express';
import AuthenticationService from '../services/authentication-service';
import ForumService from '../services/forum-service';
import Errors from '../errors/errors';

const router = express.Router();
const forumService = new ForumService();

router.get('/', async (req, res) => {
    try {
        const authHeader: string = req.headers.authorization || '';
        const { isAuthorized } =
            await AuthenticationService.isAuthorized(authHeader);

        if (!isAuthorized) {
            return res.status(401).send({ message: Errors.UNAUTHORIZED });
        }

        const questions = await forumService.get();
        return res.send(questions);
    } catch (error) {
        if (error === Errors.UNAUTHORIZED) {
            return res.status(401).send({ message: error });
        }

        res.status(400).send({ message: error });
    }
});

router.get('/question/:id', async (req, res) => {
    const questions = await forumService.getById(req.params.id);
    return res.send(questions);
});

export default router;
