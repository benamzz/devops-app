describe("Création d'un utilisateur", () => {
  it('Creating a user', () => {
    // Visit the signup page
    cy.visit('http://localhost:3000/signup');
    cy.wait(1000);
    // Fill in the signup form with valid values
    cy.get('input[name="email"]').type('test2@gmail.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('Azerty123');
    cy.wait(1000);
    // Submit the form
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // Verify that the URL has changed to the login page
    cy.url().should('include', 'login');
  });
})

describe("login d'un utilisateur", () => {

  it('log a user', () => {
    // Visit the signup page
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    // Fill in the signup form with valid values
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.wait(1000);
    cy.get('input[name="password"]').type('Azerty123');
    cy.wait(1000);
    // Submit the form
    cy.get('button[type="submit"]').click();
  });
})

describe("Création d'un article", () => {

  it('ajout d\'un article et affichage du snippet', () => {
    // Visit the signup page
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    // Fill in the signup form with valid values
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.wait(1000);

    cy.get('input[name="password"]').type('Azerty123');
    cy.wait(1000);

    // Submit the form
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('i[class="fas fa-plus-square"]').click();
    cy.wait(1000);
    cy.get('select[name="tag"]').select('js');
    cy.wait(1000);
    cy.get('textarea[name="content"]').type('voici un exemple de fonction javascript pour écrire "Hello World" en console ');
    cy.wait(1000);
    cy.get('textarea[name="snippet"]').type(`function sayHello() {
      console.log("Hello world");
    }
    
    // Appel de la fonction
    sayHello();
    `);
    cy.wait(1000);
    // Submit the article
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    // show the snippet
    cy.get('a[id="snippet-details"]').click();
  });
})