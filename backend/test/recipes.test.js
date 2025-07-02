const request = require("supertest");

const app = require("../src/app");
const db = require("../src/db/connection");

describe("API: Recipes resource", () => {
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

  describe("GET /recipes", () => {
    it("returns a list of recipes", async () => {
      const response = await request(app)
        .get("/recipes")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBeGreaterThan(0);

      const [recipe] = response.body.data;
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.image_url).toBeDefined();
      expect(recipe.description).toBeDefined();
    });
  });

  describe("GET /recipes/:recipeId", () => {
    it("returns a specific recipe based on the given ID", async () => {
      const existingRecipe = await db("recipes").first();
      const response = await request(app)
        .get(`/recipes/${existingRecipe.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const recipe = response.body.data;
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.image_url).toBeDefined();
      expect(recipe.description).toBeDefined();
    });

    it("returns a 404 if the recipe cannot be found by an ID", async () => {
      const response = await request(app)
        .get(`/recipes/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("POST /recipes", () => {
    it("allows for the creation of a new recipe", async () => {
      const response = await request(app)
        .post(`/recipes`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "Recipe Name",
            image_url: "https://exampleimage.com/image.png",
            description: "Recipe description.",
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const recipe = response.body.data;
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.image_url).toBeDefined();
      expect(recipe.description).toBeDefined();
    });

    it("returns an error if the `title` is missing", async () => {
      const response = await request(app)
        .post(`/recipes`)
        .set("Accept", "application/json")
        .send({
          data: {
            image_url: "https://exampleimage.com/image.png",
            description: "Recipe description.",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `image_url` is missing", async () => {
      const response = await request(app)
        .post(`/recipes`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "Recipe Name",
            description: "Recipe description.",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `description` is missing", async () => {
      const response = await request(app)
        .post(`/recipes`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "Recipe Name",
            image_url: "https://exampleimage.com/image.png",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("DELETE /recipes/:recipeId", () => {
    it("deletes a specific recipe based on the given ID", async () => {
      const existingRecipe = await db("recipes").first();
      const response = await request(app)
        .del(`/recipes/${existingRecipe.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const recipe = response.body.data;
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.image_url).toBeDefined();
      expect(recipe.description).toBeDefined();

      const sameRecipe = await db("recipes")
        .where({ id: existingRecipe.id })
        .first();
      expect(sameRecipe).not.toBeDefined();
    });

    it("returns a 404 if the recipe cannot be found by an ID", async () => {
      const response = await request(app)
        .del(`/recipes/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });
});
