const { app, add } = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);

describe("Application Tests", () => {
  test("should add two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 5)).toBe(4);
    expect(add(0, 0)).toBe(0);
  });

  test("should return Hello World!", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
