describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains('[data-testid="day"]', "Monday");
  });

  xit("should add an appointment", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.get(".button--confirm").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  xit("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.get(".button--confirm").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should delete an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });

    cy.contains("Confirm").click();
    cy.contains("Deleting");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
