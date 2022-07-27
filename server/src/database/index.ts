import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()
    
    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV.trim() === 'test' ? "oticateste" : defaultOptions.database
        })
    );
}