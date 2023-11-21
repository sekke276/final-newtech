const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("category Api", () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test category api", () => {
    // Get all categories
    test("get all category it should response with 200 success", async () => {
      const response = await request(app)
        .get("/api/categories/allcategories")
        .expect(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------
    // add new cate
    // test("add new category is should reponse with status 200 success", async () => {
    //   const newCategory = {
    //     categoryName: "detective",
    //   };
    //   const response = await request(app)
    //     .post("/api/categories/addcategory")
    //     .send(newCategory)
    //     .expect(200);

    //   expect(response.body.categoryName).toEqual("detective");
    // });
  });
});
