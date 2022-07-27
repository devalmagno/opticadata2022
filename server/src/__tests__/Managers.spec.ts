import request from "supertest";
import { app } from '../http';

import createConnection from "../database";

describe("Managers", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a manager", async () => {
        const response = await request(app).post("/managers/register")
        .send({
            id: "79b5a382-5125-4a0f-90f3-47e7cdc21824",
            name: "teste",
            email: "teste123@teste.com",
            phone: "38998925778",
            cpf: "138.765.401-49",
            password: "teste"
        })

        expect(response.status).toBe(201);
    });

    it("Should be able to get all managers", async () => {
        const response = await request(app).get("/managers");

        expect(response.status).toBe(200);
    });

    it("Should be able to make login", async () => {
        const response = await request(app).post("/managers/login")
            .send({
                cpf: "138.765.401-49",
                password: "teste"
            });

        expect(response.status).toBe(200);
    });

    it("Should be able to update manager", async () => {
        const response = await request(app).put("/managers/79b5a382-5125-4a0f-90f3-47e7cdc21824")
            .send({
                name: "Mavi"
            });

        expect(response.status).toBe(200);
    });

    it("Should be able to update manager password", async () => {
        const response = await request(app).put("/managers/password/79b5a382-5125-4a0f-90f3-47e7cdc21824")
            .send({
                password: "teste",
                newPassword: "qualquerCoisa"
            });

        expect(response.status).toBe(200);
    });

    it("Should be able to delete manager", async () => {
        const response = await request(app).delete("/managers/79b5a382-5125-4a0f-90f3-47e7cdc21824")

        expect(response.status).toBe(200);
    });
});