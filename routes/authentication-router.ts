import express from 'express';
import AuthenticationService from '../services/authentication-service';
import UserService, { UserType } from '../services/user-service';
import Errors from '../errors/errors';

const router = express.Router();
const authService = new AuthenticationService();
const userService = new UserService();

router.post('/token', async (req, res) => {
    try {
        const authHeader: string = req.headers.authorization || '';
        console.log(authHeader);
        const decodedString: string = authService.getDecodedString(authHeader);
        const { username, password } =
            authService.getCredentials(decodedString);
        const isUserValid = await userService.isUserValid(username, password);

        if (isUserValid) {
            const token = authService.createToken({ username, password });
            return res.send({ token });
        } else {
            return res.status(401).send({ message: Errors.UNAUTHORIZED });
        }
    } catch (error) {
        if (error === Errors.UNAUTHORIZED) {
            return res.status(401).send({ message: error });
        }

        res.status(400).send({ message: error });
    }
});

router.post('/register', async (req, res) => {
    try {
        const user: UserType = req.body;

        // Validate input
        userService.validateUserInput(user);

        const { token, createdUser } = await userService.createUser(req.body);
        return res.status(201).send({ token, createdUser });
    } catch (error) {
        if (error === Errors.NO_USER_FOUND) {
            return res.status(401).send({ message: error });
        }
        if (error === Errors.INVALID_USER_OBJECT) {
            return res.status(400).send({ message: error });
        }

        res.status(400).send({ message: error });
    }
});

router.get('/user', async (req, res) => {
    return res.send(userService.getUserInfo());
});

export default router;
