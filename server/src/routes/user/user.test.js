const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("user API", () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test user API", () => {
    // Get user by id
    test("Get User by Id", async () => {
      const response = await request(app)
        .get("/api/users/getuser/65583878c62d46aa69a4510b")
        .expect(200);
      expect(response.body._id).toEqual("65583878c62d46aa69a4510b");
    });

    // ---------------------------------------------------
    // Get all users
    test("Get all users", async () => {
      const response = await request(app)
        .get("/api/users/allmembers")
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------
    // Update user info
    test("Update user info by ownerId", async () => {
      const updateInfo = {
        userId: "65583878c62d46aa69a4510b",
        password: "1234567890",
        age: 30,
      };

      const response = await request(app)
        .put("/api/users/updateuser/65583878c62d46aa69a4510b")
        .send(updateInfo)
        .expect(200);

      expect(response.text).toEqual('"Account has been updated"');
    });

    test("Admin update user info", async () => {
      const updateInfo = {
        userId: "65583878c62d46aa69a4510b",
        isAdmin: true,
        password: "1234567890",
        age: 22,
      };

      const response = await request(app)
        .put("/api/users/updateuser/65583878c62d46aa69a4510b")
        .send(updateInfo)
        .expect(200);

      expect(response.text).toEqual('"Account has been updated"');
    });

    test("update user not found", async () => {
      const updateInfo = {
        userId: "65583878c62d46aa69a4510b",
        isAdmin: true,
        password: "1234567890",
        age: 22,
      };

      const response = await request(app)
        .put("/api/users/updateuser/65583878c62d46aa69a4510a")
        .send(updateInfo)
        .expect(404);

      expect(response.text).toEqual('"user not found"');
    });

    test("Update user dont have permission", async () => {
      const updateInfo = {
        userId: "6559c815bdc69c283dc51967",
        password: "1234567890",
        age: 22,
      };

      const response = await request(app)
        .put("/api/users/updateuser/65583878c62d46aa69a4510b")
        .send(updateInfo)
        .expect(403);

      expect(response.text).toEqual('"You can update only account!"');
    });

    // ---------------------------------------------------
    // move to active transaction
    test("move to active transaction", async () => {
      let adminRole = {
        isAdmin: true,
        userId: "6559c815bdc69c283dc51967",
      };

      const response = await request(app)
        .put("/api/users/655c5b963ea85a348792467d/move-to-activetransactions")
        .send(adminRole)
        .expect(200);
      expect(response.text).toEqual('"Added to Active Transaction"');
    });

    // ---------------------------------------------------
    // move to pre transaction
    test("move to pretransaction", async () => {
      let adminRole = {
        isAdmin: true,
        userId: "6559c815bdc69c283dc51967",
      };

      const response = await request(app)
        .put("/api/users/655c5b963ea85a348792467d/move-to-prevtransactions")
        .send(adminRole)
        .expect(200);
      expect(response.text).toEqual('"Added to Prev transaction Transaction"');
    });
  });
});
