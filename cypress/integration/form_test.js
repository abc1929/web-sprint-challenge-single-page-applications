/* eslint-disable no-undef */
describe("Pizza App", () => {
   beforeEach(() => {
      console.log("form submit test");
      cy.visit("http://localhost:3000");
   });

   const ticksomeboxes = () => {
      cy.visit("http://localhost:3000/pizza");
      cy.contains("Onions").within(() => {
         cy.get("input").focus();
         cy.focused().click({ force: true });
      });
      cy.contains("Meatball").within(() => {
         cy.get("input").focus();
         cy.focused().click({ force: true });
      });
      cy.contains("Bacon").within(() => {
         cy.get("input").focus();
         cy.focused().click({ force: true });
      });
      cy.contains("Onions").within(() => {
         cy.get("input").focus();
         cy.focused().click({ force: true });
      });

      cy.contains("Meatball").within(() => {
         cy.get("input").next().should("have.attr", "data-checked");
      });
      cy.contains("Bacon").within(() => {
         cy.get("input").next().should("have.attr", "data-checked");
      });
      cy.contains("Onions").within(() => {
         cy.get("input").next().should("not.have.attr", "data-checked");
      });
   };

   it("Go to pizza ordering page", () => {
      cy.contains("Pizza?").click();
      cy.contains("Build Your Own Pizza");
   });

   it("Test that you can add text to the box", () => {
      cy.visit("http://localhost:3000/pizza");

      cy.get("*[name='comment']").focus().type("hagdfsfdsf");
      cy.focused().should("have.value", "hagdfsfdsf");
   });
   it("Test that you can select multiple toppings", () => {
      ticksomeboxes();
   });
   it("Test that you can submit the form", () => {
      cy.visit("http://localhost:3000/pizza");
      ticksomeboxes();
      cy.get("button").last().contains("$13");
      cy.get("button").last().click();
      cy.contains("Congrats! Pizza is on its way!");
   });
});
