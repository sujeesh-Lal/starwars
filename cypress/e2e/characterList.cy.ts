/// <reference types="cypress" />

import { SELECTORS, visitLandingPage, assertTableHasRows } from "../support/starwars-helpers";

describe("Star Wars App – Character List Page", () => {
  it("Should displays the list of Star Wars characters using mocked API response", () => {
    visitLandingPage(true);
    assertTableHasRows();
    cy.get(SELECTORS.tableRows).first().should("contain", "Sujeesh Skywalker");
  });

  it("Should displays the list of Star Wars characters to the user", () => {
    visitLandingPage();
    assertTableHasRows();
  });

  it("Should displays the next set of characters when the user navigates to page 2", () => {
    visitLandingPage();
    cy.get(SELECTORS.paginatorPage(2)).click();
    assertTableHasRows();
  });

  it("Should filters the character list when the user searches by name", () => {
    visitLandingPage(true);
    cy.get(SELECTORS.search)
      .should("be.visible")
      .and("have.attr", "placeholder", "Search starwars characters")
      .type("sujee");
    assertTableHasRows();
  });

  it("User should view a character’s details by clicking the edit icon", () => {
    visitLandingPage();
    cy.get(SELECTORS.editIcon).first().click();
    cy.url().should("include", "/characters/");
  });

  it("User should sees a friendly error page when navigating to a non-existent route", () => {
    cy.visit("/starwars/nonexistent");
    cy.contains("Page Not Found").should("be.visible").click();
  });
});
