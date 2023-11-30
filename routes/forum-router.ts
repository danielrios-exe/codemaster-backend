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

router.post('/question', async (req, res) => {
    const body = req.body;
    console.log('body', body);
    try {
        const newQuestion = forumService.createQuestion(body);
        return res.send(newQuestion).status(201);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
});

router.get('/question/:id', async (req, res) => {
    try {
        const authHeader: string = req.headers.authorization || '';
        const { isAuthorized } =
            await AuthenticationService.isAuthorized(authHeader);

        if (!isAuthorized) {
            return res.status(401).send({ message: Errors.UNAUTHORIZED });
        }

        const question = await forumService.getById(req.params.id);
        console.log(question);
        return res.send(question);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
});

// Create comments
router.post('/question/:id', async (req, res) => {
    try {
        const authHeader: string = req.headers.authorization || '';
        const { isAuthorized } =
            await AuthenticationService.isAuthorized(authHeader);

        if (!isAuthorized) {
            return res.status(401).send({ message: Errors.UNAUTHORIZED });
        }

        const question = await forumService.createComment(
            req.body,
            req.params.id,
        );
        return res.send(question);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
});

// Vote comments
router.put('/question/:id', async (req, res) => {
    try {
        const authHeader: string = req.headers.authorization || '';
        const { isAuthorized } =
            await AuthenticationService.isAuthorized(authHeader);

        if (!isAuthorized) {
            return res.status(401).send({ message: Errors.UNAUTHORIZED });
        }

        const commentId = req.body.commentId;
        const vote = req.body.vote;
        const question = await forumService.voteComment(
            req.params.id,
            commentId,
            vote,
        );
        return res.send(question);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
});

export default router;
