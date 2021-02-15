import app from "../../index";

const request = require("supertest");

describe("API/", function () {
  it("GET/ Root path", async () => {
    const res = await request(app).get("/");

    expect(res.status).toEqual(200);
    // expect(res.body).toMatchObject();
  });

  it("GET/non-existing-path", async () => {
    const res = await request(app).post("/non-existing-path");

    expect(res.status).toEqual(404);
  });
});
