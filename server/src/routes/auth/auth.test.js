const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("auth API", () => {
    beforeAll(async () => {
        await connectMongo();
    });

    afterAll(async () => {
        await disconnectMongo();
    });

    describe("Test auth API", () => {
        test("signin with admissionId and it should response with 200 success", async () => {
            const loginStaff = {
                admissionId: "19110061",
                password: "1234567890",
            };

            const response = await request(app)
                .post("/api/auth/signin")
                .send(loginStaff)
                .expect(200);
            expect(response.body._id).toEqual("65583878c62d46aa69a4510b");
        });

        test("signin with employeedId and it should response with 200 success", async () => {
            const loginStaff = {
                employeeId: "19110090",
                password: "1234567890",
            };

            const response = await request(app)
                .post("/api/auth/signin")
                .send(loginStaff)
                .expect(200);
            expect(response.body._id).toEqual("6559c55fbdc69c283dc51955");
        });

        test("create and delete user should respond with 200 success", async () => {
            const admissionUser = {
                userType: "student",
                userFullName: "Hau Kien Tin",
                admissionId: "19110060",
                employeeId: "",
                age: "22",
                dob: "11/02/2001",
                gender: "male",
                address: "88 a America",
                mobileNumber: "0859092212",
                email: "tin@example.com",
                password: "1234567890",
                isAdmin: false,
            };

            const userResponse = await request(app)
                .post("/api/auth/register")
                .send(admissionUser)
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200);

            let adminRole = {
                isAdmin: false,
            };

            // delete without permission
            let response = await request(app)
                .delete("/api/users/deleteuser/" + userResponse.body._id)
                .send(adminRole)
                .expect(403);
            expect(response.text).toEqual('"You can delete only your account!"');

            // get total members
            response = await request(app)
                .get("/api/users/totalmembers")
                .expect(200)
            expect(response.body.total).toBeGreaterThanOrEqual(1)

            // delete with permission
            adminRole.isAdmin = true;
            response = await request(app)
                .delete("/api/users/deleteuser/" + userResponse.body._id)
                .send(adminRole)
                .expect(200);
            expect(response.text).toEqual('"Account has been deleted"');
        });
    });
});
