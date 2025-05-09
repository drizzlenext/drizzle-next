/// <reference types="cypress" />

describe("shadriz e2e test", () => {
  it("home page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Drizzle Next");
  });

  it("public scaffold happy path", () => {
    cy.visit("http://localhost:3000/public-scaffolds");
    cy.contains("New").click();
    cy.get('input[name="integerType"]').type("1");
    cy.get('input[name="smallintType"]').type("2");
    cy.get('input[name="bigintType"]').type("3");
    cy.get('input[name="serialType"]').type("4");
    cy.get('input[name="bigserialType"]').type("5");
    cy.get('input[name="booleanType"]').check({ force: true });
    cy.get('input[name="textType"]').type("foobar");
    cy.get('input[name="varcharType"]').type("b");
    cy.get('input[name="charType"]').type("c");
    cy.get('input[name="numericType"]').type("6");
    cy.get('input[name="decimalType"]').type("7");
    cy.get('input[name="realType"]').type("8");
    cy.get('input[name="doublePrecisionType"]').type("9");
    cy.get('input[name="jsonType"]').type("{}");
    cy.get('input[name="jsonbType"]').type("{}");
    cy.get('input[name="timeType"]').type("08:08");
    cy.get('input[name="timestampType"]').type("2008");
    cy.get('input[name="dateType"]').type("2024-08-08");
    cy.get('button[type="submit"]').click();
    cy.contains("Public Scaffold created successfully");
  });

  it("create category", () => {
    cy.visit("http://localhost:3000/categories");
    cy.contains("New").click();
    cy.get('input[name="name"]').type("my_category");
    cy.get('button[type="submit"]').click();
    cy.contains("Category created successfully");
  });

  it("create post", () => {
    cy.visit("http://localhost:3000/posts");
    cy.contains("New").click();
    // need to select the hidden vanilla select since radix ui uses portals
    cy.get('select[name="categoryId"]').select(0, { force: true });
    cy.get('input[name="title"]').type("hello world", { force: true });
    cy.get('input[name="likes"]').type("123", { force: true });
    cy.get('input[name="publishedAt"]').type("2008-08-08", { force: true });
    cy.get('input[name="content"]').type("hello", { force: true });
    cy.contains("Submit").click();
    cy.contains("Post created successfully");
  });
});
