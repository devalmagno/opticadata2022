import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection, getConnectionOptions, SimpleConsoleLogger } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

// export default async (): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions()

//     return createConnection(
//         Object.assign(defaultOptions, {
//             database: process.env.NODE_ENV.trim() === 'test' ? "oticateste" : defaultOptions.database
//         })
//     );
// }

export default async (): Promise<Connection> => {
    let connectionOptions: ConnectionOptions;
    connectionOptions = {
        type: "postgres",
        synchronize: false,
        logging: false,
        extra: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        entities: [
            "./dist/src/entities/**.js"
        ],
        migrations: ["./dist/src/database/migrations/**.js"],
        cli: {
            migrationsDir: "./dist/src/database/migrations",
        },
        migrationsRun: true,
    }

    if (process.env.DATABASE_URL) {
        console.log(process.env.DATABASE_URL);
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
        // gets your default configuration
        // you could get a specific config by name getConnectionOptions('production')
        // or getConnectionOptions(process.env.NODE_ENV)
        connectionOptions = await getConnectionOptions();
    }

    return createConnection(connectionOptions);
}