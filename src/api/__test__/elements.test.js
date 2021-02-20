import app from "../../index";
import { Elements } from "../../models";

const request = require("supertest");

describe("API/elements", function () {
  const element = {
    name: "Hydrogen",
    symbol: "H",
    atomicWeight: 1,
    atomicNumber: 1,
  };

  beforeEach(async () => {
    try {
      await Elements.create(element);
    } catch (err) {
      console.warn(err);
    }
  });

  afterEach(async () => {
    try {
      await Elements.deleteMany({});
    } catch (err) {
      console.warn(err);
    }
  });

  it("POST/elements Create element", async () => {
    const res = await request(app).post("/elements").send(element);

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject(element);
  });

  it("GET/elements Get element list", async () => {
    const res = await request(app).get("/elements");

    expect(res.status).toEqual(200);
    expect(res.body[0]).toMatchObject(element);
  });

  it("GET/elements Get element list with params", async () => {
    await Elements.create({ ...element, atomicNumber: 2 });

    const res = await request(app).get(
      `/elements?atomicNumber=${element.atomicNumber}`
    );

    expect(res.status).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body).toMatchObject([element]);
  });

  it("GET/elements/:id Get element by id", async () => {
    const { _id: id } = await Elements.create({ ...element, atomicNumber: 2 });

    const res = await request(app).get(`/elements/${id}`);

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({ ...element, atomicNumber: 2 });
    expect(res.body.atomicNumber).toEqual(2);
  });

  it("PUT/elements/:id Update element", async () => {
    const { _id: id } = await Elements.create({ ...element, atomicNumber: 2 });
    const updatedField = "Updated";

    const res = await request(app)
      .put(`/elements/${id}`)
      .send({ ...element, name: updatedField });

    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(updatedField);
  });

  it("GET/elements/:atomicNumber Get element by atomicNumber", async () => {
    const { atomicNumber } = await Elements.create({
      ...element,
      atomicNumber: 2,
    });

    const res = await request(app).get(`/elements/${atomicNumber}`);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toMatchObject({ ...element, atomicNumber: 2 });
    expect(res.body[0].atomicNumber).toEqual(atomicNumber);
  });

  it("DELETE/elements/:id Delete element", async () => {
    const { _id: id } = await Elements.create(element);
    const res = await request(app).delete(`/elements/${id}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(`${id}`);
  });
});
