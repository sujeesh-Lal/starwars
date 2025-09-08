// Centralised selectors so they're typed & reusable
export const SELECTORS = {
  table: '[data-testid="characters-list-table"]',
  favoritesTable: '[data-testid="favorites-table"]',
  tableRows: '[data-testid="characters-list-table"] tbody.p-datatable-tbody tr[role="row"]',
  search: 'input[data-testid="search-input"]',
  paginatorPage: (n: number) => `.p-paginator .p-paginator-page[aria-label="Page ${n}"]`,
  editIcon:
    '[data-testid="characters-list-table"] tbody.p-datatable-tbody tr[role="row"] .pi-pencil',

  filmsList: '[data-testid="films-list"]',
  starshipList: '[data-testid="starship-list"]',
  favButton: 'button[data-testid="toggle-favorite-btn"]',
  makeFavButton: 'button[data-testid="make-fav-btn"]',
  backButton: '[data-testid="back-btn"]',
};

export function mockLandingPageApis() {
  cy.intercept("GET", "**/people?page=1&limit=10&expanded=true", {
    fixture: "peoples.json",
  }).as("getCharacters");
  cy.intercept("GET", "**/planets?page=1&limit=100", { fixture: "planets.json" }).as("getPlanets");
}

export function visitLandingPage(mock = false) {
  if (mock) mockLandingPageApis();
  cy.visit("/starwars/");
  if (mock) {
    cy.wait("@getCharacters");
    cy.wait("@getPlanets");
  }
}

export function assertTableHasRows(min = 1) {
  cy.get(SELECTORS.table).should("exist");
  cy.get(SELECTORS.tableRows).should("have.length.at.least", min);
}

export function mockCharacterDetailsApis() {
  cy.intercept("GET", "**/films/1", { fixture: "films.json" }).as("getFilm");
  cy.intercept("GET", "**/starships/12", { fixture: "starships.json" }).as("getStarship");
  cy.wait("@getFilm");
  cy.wait("@getStarship");
}

export function goToFirstCharacter() {
  cy.get(SELECTORS.editIcon).first().click();
}

export function clickButtonIfTextContains(selector: string, text: string) {
  cy.get(selector, { timeout: 0 }).then(($btn) => {
    if ($btn.length && $btn.text().includes(text)) {
      cy.wrap($btn).click();
    }
  });
}
