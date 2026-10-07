import{ DataSource, DataSourceOptions} from "typeorm";
import { envs } from 'src/config/envs';
import { LostPet } from "src/lost-pets/entities/lost-pets.entity";
import { PendingEmail } from "src/email/entities/pending-email.entity";
import { User } from "src/users/entities/system-user.entity";

export const dataSourceOptions: DataSourceOptions = {
    host: envs.DB_HOST,
    type: 'postgres',
    port: envs.DB_PORT,
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    entities: [LostPet, PendingEmail, User],
    synchronize: false, //cuando este en produccion ponerlo en false
    migrations: ['dist/db/migrations/[0-9]*-*.js'], //para estar todos sincronizados
}

const dataSource = new DataSource(dataSourceOptions); //Typeorm
export default dataSource;