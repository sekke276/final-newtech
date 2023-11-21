const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("transaction Api", () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test transaction Api", () => {
    //get all transaction
    test("get all transactions", async () => {
      let response = await request(app)
        .get("/api/transactions/all-transactions")
        .expect(200);
    });

    test("create, update, delete transaction", async () => {
      let newTransaction = {
        bookId: "655854c10f9a41b8ce5a7e8b",
        bookName: "The Grim Adventures of Billy and Mandy",
        borrowerId: "6559c815bdc69c283dc51967",
        borrowerName: "Tri nguyen",
        transactionType: "Reserved",
        fromDate: "11/21/2023",
        toDate: "11/22/2023",
        isAdmin: true,
      };

      // create transaction
      const transactionResponse = await request(app)
        .post("/api/transactions/add-transaction")
        .send(newTransaction)
        .expect(200);

      let adminRole = {
        isAdmin: true,
      };

      // update transaction
      let response = await request(app)
        .put(
          "/api/transactions/update-transaction/" +
            transactionResponse.body._id,
        )
        .send(adminRole)
        .expect(200);
      expect(response.text).toEqual(
        '"Transaction details updated successfully"',
      );

      // remove transaction
      response = await request(app)
        .delete(
          "/api/transactions/remove-transaction/" +
            transactionResponse.body._id,
        )
        .send(adminRole)
        .expect(200);
      expect(response.text).toEqual('"Transaction deleted successfully"');
    });
  });
});
