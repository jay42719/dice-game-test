/**
 * Load env variable
 */
require("dotenv").config();

/**
 * Imports module
 */
const Joi = require('@hapi/joi');

/**
 * Env variable validation schema
 */
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('test', 'development', 'production')
        .default('development'),
    PORT: Joi.number().default(4000),
    BASE_URL: Joi.string().default('http://localhost:4000'),
    MONGO_HOST: Joi.string().default('localhost'),
    MONGO_DB_NAME: Joi.string().default('dice-game'),
    MONGO_USERNAME: Joi.string().default('root'),
    MONGO_PASSWORD: Joi.string().default(''),
    WINNING_SCORE: Joi.number().default(20), //61
    TURN_TIMER: Joi.number().default(10), //30
}).unknown().required();

/**
 * Validate env variable
 */
const {
    error,
    value: envVars
} = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Error :: Config validation error :: ${error.message}`);
}

/**
 * Config object
 */
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    baseUrl: envVars.BASE_URL,
    winningScore: envVars.WINNING_SCORE,
    turnTimer: envVars.TURN_TIMER,
    mongo: {
        host: envVars.MONGO_HOST,
        dbName: envVars.MONGO_DB_NAME,
        user: envVars.MONGO_USERNAME,
        password: envVars.MONGO_PASSWORD,
    },
};

/**
 * Exports config
 */
module.exports = config;