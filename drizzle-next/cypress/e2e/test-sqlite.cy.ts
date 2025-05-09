/// <reference types="cypress" />

describe("shadriz e2e test", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000/signin");
  //   cy.get('input[name="email"]').first().type("admin@example.com");
  //   cy.get('input[name="password"]').first().type("pw");
  //   cy.contains("Sign in with Credentials").click();
  // });

  it("home page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Drizzle Next");
  });

  it("private scaffold happy path", () => {
    cy.visit("http://localhost:3000/private-scaffolds");
    cy.contains("New").click();
    cy.get('input[name="integerType"]').type("1");
    cy.get('input[name="realType"]').type("2");
    cy.get('input[name="booleanType"]').check({ force: true });
    cy.get('input[name="textType"]').type("foobar");
    cy.get('input[name="timestampType"]').type("2008");
    cy.get('button[type="submit"]').click();
    cy.contains("Private Scaffold created successfully");
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
