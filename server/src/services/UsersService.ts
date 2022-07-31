import { getCustomRepository, Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../entities/User";
import { UserRepository } from "../repositories/UsersRepository";

interface IUser {
    user_col_id: string;
    user_cpf: string;
    user_password: string;
    user_is_admin: boolean;
}

interface Data {
    user: IUser;
    iot: number;
    exp: number;
}

class UsersService {
    private usersRepository : Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UserRepository);
    }

    async create({ 
        user_col_id,
        user_is_admin, 
        user_password,
        user_cpf,
    }: IUser) {
        const userAlreadyExists = await this.usersRepository.findOne({
            user_col_id,
        });

        if (userAlreadyExists) throw new Error("User already exists!");

        const hashedPassword = await bcrypt.hash(user_password, 10);

        const user = this.usersRepository.create({
            user_col_id,
            user_is_admin,
            user_password: hashedPassword,
            user_cpf,
        });

        await this.usersRepository.save(user);

        user.user_password = "";
        return user;
    }

    async get() {
        const users = await this.usersRepository.find({
            select: ["user_id", "user_col_id", "user_is_admin", "created_at", "updated_at"],
        });

        if (!users) {
            throw new Error("There is no user in the database, please create a user before doing this operation.");
        }

        return users;
    }

    async getById(id: string) {
        const user = await this.usersRepository.findOne({
            user_id: id,
        });

        if (!user) {
            throw new Error("User does not exists!!");
        }

        return user;
    }

    async getUserPasswordByColId(user_col_id: string) {
        const user = await this.usersRepository.findOne({
            where: { user_col_id },
            select: ["user_password"],
        });

        if (!user) throw new Error("User doesn't exists!!");

        return user;
    }

    async update(id: string, user_is_admin: boolean) {
        const user = await this.usersRepository.findOne({ user_id: id });
        
        if (!user) {
            throw new Error("User does not exists!!");
        }

        this.usersRepository.merge(user, { user_is_admin });

        const updatedUser = await this.usersRepository.save(user);
        updatedUser.user_password = "";

        return updatedUser;
    }

    async remove(id: string) {
        const user = await this.usersRepository.findOne({ user_id: id });

        if (!user) {
            throw new Error ("User does not exists!!");
        }

        await this.usersRepository.remove(user);

        return user;
    }

    async login(user_col_id: string, password: string) {
        const userPassword = await this.getUserPasswordByColId(user_col_id);

        const validate = await bcrypt.compare(password, userPassword.user_password);

        if (!validate) {
            throw new Error("Passwords do not matched");
        }

        const user = await this.usersRepository.findOne({ user_col_id });

        const acessToken = jwt.sign({user}, "" + process.env.ACESS_TOKEN_SECRET, { expiresIn: '90m' });

        return { acessToken, user };
    }

    async updatePassword(user_id: string, password: string, newPassword: string) {
        const userPassword = await this.usersRepository.findOne({
            where: { user_id },
            select: ["user_password"]
        });

        if (!userPassword) {
            throw new Error("User does not exists!!");
        }


        const validate = await bcrypt.compare(password, userPassword.user_password);

        if (!validate) {
            throw new Error("Passwords do not matched");
        }

        const user = await this.usersRepository.findOne({ user_id });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        this.usersRepository.merge(user, { user_password: hashedPassword });

        const updatedUser = await this.usersRepository.save(user);
        updatedUser.user_password = "";

        return updatedUser;
    }

    async authenticate(token: string) {
        const user: any = jwt.verify(token, "" + process.env.ACESS_TOKEN_SECRET, (err, user) => {
            if (err) throw new Error(err.message);

            return user;
        });

        return user;
    }

    async authorization(token: string) {
        jwt.verify(token, "" + process.env.ACESS_TOKEN_SCRET, (err) => {
            if (err) throw new Error(err.message);

            return true;
        })
    }
}

export { UsersService };