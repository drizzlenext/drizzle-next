/// <reference types="cypress" />

describe("shadriz e2e test", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000/admin-signin");
  //   cy.get('input[name="email"]').type("admin@example.com");
  //   cy.get('input[name="password"]').type("pw");
  //   cy.contains("Sign in").click();
  // });

  it("sign in", () => {
    cy.visit("http://localhost:3000/admin-signin");
    cy.get('input[name="email"]').type("admin@example.com");
    cy.get('input[name="password"]').type("pw");
    cy.contains("Sign in").click();
    cy.contains("Home").should("exist");
  });

  it("home page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Drizzle Next");
  });

  it("admin scaffold happy path", () => {
    cy.visit("http://localhost:3000/admin-scaffold");
    cy.contains("New").click();
    cy.get('input[name="intType"]').type("1");
    cy.get('input[name="tinyintType"]').type("2");
    cy.get('input[name="smallintType"]').type("3");
    cy.get('input[name="mediumintType"]').type("4");
    cy.get('input[name="bigintType"]').type("5");
    cy.get('input[name="realType"]').type("6");
    cy.get('input[name="decimalType"]').type("7");
    cy.get('input[name="doubleType"]').type("8");
    cy.get('input[name="floatType"]').type("9");
    cy.get('input[name="charType"]').type("a");
    cy.get('input[name="varcharType"]').type("12");
    cy.get('input[name="textType"]').type("13");
    cy.get('input[name="booleanType"]').check({ force: true });
    cy.get('input[name="dateType"]').type("2008-08-08");
    cy.get('input[name="datetimeType"]').type("2008");
    cy.get('input[name="timeType"]').type("08:08");
    cy.get('input[name="yearType"]').type("2028");
    cy.get('input[name="timestampType"]').type("2028-08-08");
    cy.get('input[name="jsonType"]').type("{}");
    cy.get('button[type="submit"]').click();
    cy.contains("Admin Scaffold created successfully");
  });

  it("create category", () => {
    cy.visit("http://localhost:3000/category");
    cy.contains("New").click();
    cy.get('input[name="name"]').type("bar");
    cy.get('button[type="submit"]').click();
    cy.contains("Category created successfully");
  });

  it("create post", () => {
    cy.visit("http://localhost:3000/post");
    cy.contains("New").click();
    // need to select the hidden vanilla select since radix ui uses portals
    // cy.get('select[name="categoryId"]').select(1, { force: true });
    cy.get('select[name="categoryId"]').select(0);
    cy.get('input[name="title"]').type("hello world", { force: true });
    cy.get('input[name="likes"]').type("123", { force: true });
    cy.get('input[name="publishedAt"]').type("2008-08-08", { force: true });
    cy.get(".tiptap.ProseMirror").type("hello", { force: true });
    cy.contains("Submit").click();
    cy.contains("Post created successfully");
  });
});
