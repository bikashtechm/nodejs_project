import * as express from 'express';
import { getEnvironmentVariables } from './environments/env';
import * as mongoose from 'mongoose';
import userRouter from './routers/userRouter';
import bodyParser = require('body-parser');

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
        
    }

    setConfiguration() {
        this.connectMongoDb(); // single responsibility princple
        this.configureBodyParser();
        

    }

    setRoutes() {
        this.app.use('/api/users', userRouter);
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true}));
    }

    connectMongoDb() {
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl,
            { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('mongoDB is connected...');
            });
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            })
        });
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong.Please try again',
                status_code: errorStatus                
            })
            
        });
        
    }
}
