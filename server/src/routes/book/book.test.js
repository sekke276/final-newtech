const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("book Api", () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test book api", () => {
    // get all books
    test("get all books", async () => {
      const response = await request(app)
        .get("/api/books/allbooks")
        .expect(200);
    });

    // ---------------------------------------------------
    // get book by Id
    test("get book by id", async () => {
      const response = await request(app)
        .get("/api/books/getbook/6559c3fb5a3c5c223e8dcbf2")
        .expect(200);
      expect(response.body.bookName).toEqual("iheritance");
    });

    // ---------------------------------------------------
    //  get book by categoryName
    test("get book by category name", async () => {
      const response = await request(app)
        .get("/api/books/")
        .query("category=comic")
        .expect(200);
      expect(response.body.books.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------
    //  create, delete book
    test("Create, Update and delete book", async () => {
      const newBook = {
        bookName: "harry potter",
        author: "J.K. Rowling",
        bookCountAvailable: "1",
        language: "English",
        publisher: "Kim Dong",
        bookStatus: "Available",
        categories: ["655853ab0f9a41b8ce5a7e61"],
        isAdmin: true,
      };

      const createReponse = await request(app)
        .post("/api/books/addbook")
        .send(newBook)
        .expect(200);

      var adminRole = {
        isAdmin: false,
      };

      // update and delete without permission
      let response = await request(app)
        .put("/api/books/updatebook/" + createReponse.body._id)
        .send(adminRole)
        .expect(403);
      expect(response.text).toEqual(
        '"You dont have permission to delete a book!"',
      );

      // delete without permission
      response = await request(app)
        .delete("/api/books/removebook/" + createReponse.body._id)
        .send(adminRole)
        .expect(403);
      expect(response.text).toEqual(
        '"You dont have permission to delete a book"',
      );

      // update with permission
      adminRole.isAdmin = true;
      response = await request(app)
        .put("/api/books/updatebook/" + createReponse.body._id)
        .send(adminRole)
        .expect(200);
      expect(response.text).toEqual('"Book details updated successfully"');

      // delete with permission
      response = await request(app)
        .delete("/api/books/removebook/" + createReponse.body._id)
        .send(adminRole)
        .expect(200);
      expect(response.text).toEqual('"Book has been deleted"');
    });
  });
});
