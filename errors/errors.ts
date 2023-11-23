enum Errors {
    INVALID_AUTH_HEADER = 'Invalid authorization header.',
    INVALID_TOKEN = 'Invalid token.',
    UNAUTHORIZED = 'Unauthorized.',
    NO_USER_FOUND = 'No user found.',
    USERNAME_ALREADY_IN_DB = 'Username already in database.',
    INVALID_USER_OBJECT = 'Invalid user object.',
    INTERNAL_SERVER_ERROR = 'Internal server error.',
}

export default Errors;
