describe("App E2E Test", () => {
  it("should render the home page", () => {
    cy.visit("/");
    cy.contains("Hello").should("be.visible");
  });
});
