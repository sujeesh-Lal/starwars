/// <reference types="cypress" />

import {
  SELECTORS,
  visitLandingPage,
  mockCharacterDetailsApis,
  assertTableHasRows,
  goToFirstCharacter,
} from "../support/starwars-helpers";

describe("Star Wars App – Character Details Page", () => {
  beforeEach(() => {
    visitLandingPage(true);
    goToFirstCharacter();
  });

  it("Should displays films and starships information on the character details page", () => {
    mockCharacterDetailsApis();
    cy.url().should("include", "/characters/");
    cy.get(SELECTORS.filmsList).should("exist");
    cy.get(SELECTORS.starshipList).should("exist");
  });

  it("Should allows users to manage characters in the Favorites list (add or remove)", () => {
    mockCharacterDetailsApis();
    cy.get(SELECTORS.favButton).click().should("contain", "Remove from Favourites");
    cy.get(SELECTORS.favButton).click().should("contain", "Add to Favourites");
  });

  it("Should returns the user to the characters list", () => {
    mockCharacterDetailsApis();
    cy.get(SELECTORS.backButton).click();
    assertTableHasRows();
  });
});
