require('dotenv').config();

const mongoose = require("mongoose");


// Connexion à la base de données avant de lancer les tests
beforeAll(async () => {
    const MONGO_URI = process.env.MONGODB_URI; // Utilisez une URI de base de données de test séparée si nécessaire
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
});

// Déconnexion de la base de données après avoir terminé les tests
afterAll(async () => {
    await mongoose.disconnect();
});

// vérifier la connexion à la base de données
describe("Database Connection", () => {
    test("should connect to the database", () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});


