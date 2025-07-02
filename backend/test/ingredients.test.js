const request = require("supertest");

const app = require("../src/app");
const db = require("../src/db/connection");

describe("API: Ingredients resource", () => {
  beforeAll(() => {
    return db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback(null, true))
      .then(() => db.migrate.latest());
  });

  beforeEach(() => {
    return db.seed.run();
  });

  afterAll(async () => {
    return await db.migrate.rollback(null, true).then(() => db.destroy());
  });

  describe("GET /ingredients", () => {
    it("returns a list of ingredients", async () => {
      const response = await request(app)
        .get("/ingredients")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBeGreaterThan(0);

      const [ingredient] = response.body.data;
      expect(ingredient.id).toBeDefined();
      expect(ingredient.name).toBeDefined();
    });
  });

  describe("GET /ingredients/:ingredientId", () => {
    it("returns a specific ingredient based on the given ID", async () => {
      const existing = await db("ingredients").first();
      const response = await request(app)
        .get(`/ingredients/${existing.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const ingredient = response.body.data;
      expect(ingredient.id).toBeDefined();
      expect(ingredient.name).toBeDefined();
    });

    it("returns a 404 if the ingredient cannot be found by an ID", async () => {
      const response = await request(app)
        .get(`/ingredients/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("POST /ingredients", () => {
    it("allows for the creation of a new ingredient", async () => {
      const response = await request(app)
        .post(`/ingredients`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "Ingredient Name",
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const ingredient = response.body.data;
      expect(ingredient.id).toBeDefined();
      expect(ingredient.name).toBeDefined();
    });

    it("returns an error if the `name` is missing", async () => {
      const response = await request(app)
        .post(`/ingredients`)
        .set("Accept", "application/json")
        .send({
          data: {
            unit: "cup",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("PUT /ingredients/:ingredientId", () => {
    it("allows for an ingredient to be updated", async () => {
      const existing = await db("ingredients").first();
      const response = await request(app)
        .put(`/ingredients/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "New Ingredient Name",
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const ingredient = response.body.data;
      expect(ingredient.id).toEqual(existing.id);
      expect(ingredient.name).toEqual("New Ingredient Name");
    });

    it("returns a 404 if the ingredient cannot be found by an ID", async () => {
      const response = await request(app)
        .put(`/ingredients/invalid-id`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "New Ingredient Name",
            unit: "teaspoon",
          },
        });

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `name` is missing", async () => {
      const existing = await db("ingredients").first();
      const response = await request(app)
        .put(`/ingredients/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            unit: "cup",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("DELETE /ingredients/:ingredientId", () => {
    it("deletes a specific ingredient based on the given ID", async () => {
      const existing = await db("ingredients").first();
      const response = await request(app)
        .del(`/ingredients/${existing.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const ingredient = response.body.data;
      expect(ingredient.id).toBeDefined();
      expect(ingredient.name).toBeDefined();

      const matching = await db("ingredients")
        .where({ id: existing.id })
        .first();
      expect(matching).not.toBeDefined();
    });

    it("returns a 404 if the ingredient cannot be found by an ID", async () => {
      const response = await request(app)
        .del(`/ingredients/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });
});
