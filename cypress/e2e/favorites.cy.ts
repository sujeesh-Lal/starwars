// /// <reference types="cypress" />

import {
  SELECTORS,
  visitLandingPage,
  mockCharacterDetailsApis,
  clickButtonIfTextContains,
} from "../support/starwars-helpers";

describe("Star Wars App – Favorites Page", () => {
  it("should shows no records when no characters have been added to Favorites list", () => {
    cy.visit("/starwars/favorites");
    cy.get(SELECTORS.favoritesTable).should("contain", "No records found.");
  });

  it("Can add a character to Favorites and it should appear in the Favorites list", () => {
    visitLandingPage();
    cy.get(SELECTORS.editIcon).eq(8).click();
    mockCharacterDetailsApis();
    clickButtonIfTextContains(SELECTORS.favButton, "Add to Favourites");
    cy.get("nav").contains("Favorites").click();
    cy.get(SELECTORS.makeFavButton).first().should("contain", "Remove from Favourites");
  });

  it("Should redirect user to the Favorites page upon clicking the favorities link", () => {
    visitLandingPage(true);
    cy.get("nav").contains("Favorites").click();
    cy.url().should("include", "/favorites");
    cy.contains("Favorites").should("be.visible");
  });
});
