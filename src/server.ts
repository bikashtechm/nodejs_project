import * as express from 'express';
import { getEnvironmentVariables } from './environments/env';
import * as mongoose from 'mongoose';
import userRouter from './routers/userRouter';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
        
    }

    setConfiguration() {
        this.connectMongoDb(); // single responsibility princple

    }

    setRoutes() {
        this.app.use('/api/users', userRouter);
    }

    connectMongoDb() {
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl,
            { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('mongoDB is connected...');
            });
    }
}
