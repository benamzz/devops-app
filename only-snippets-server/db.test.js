const mongoose = require('mongoose');

// Fonction à tester : connectToMongoDB
async function connectToMongoDB() {
    const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/only-snippet-server';

    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`Connected to Mongo! Database name: "${connection.connections[0].name}"`);
        return connection;
    } catch (error) {
        console.error('Error connecting to mongo:', error);
        throw error;
    }
}

// Test unitaire
test('connects to MongoDB successfully', async () => {
    // Arrange (Préparation)
    const mockConnection = {
        connections: [{ name: 'mock-database' }],
    };
    mongoose.connect = jest.fn().mockResolvedValue(mockConnection);
    console.log = jest.fn(); // Mock la fonction console.log pour vérifier l'appel

    // Act (Action)
    const result = await connectToMongoDB();

    // Assert (Vérification)
    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/only-snippet-server');
    expect(console.log).toHaveBeenCalledWith('Connected to Mongo! Database name: "mock-database"');
    expect(result).toBe(mockConnection);
});

// Test unitaire avec échec de la connexion
test('handles MongoDB connection error', async () => {
    // Arrange (Préparation)
    const mockError = new Error('Connection error');
    mongoose.connect = jest.fn().mockRejectedValue(mockError);
    console.error = jest.fn(); // Mock la fonction console.error pour vérifier l'appel

    // Act (Action et vérification)
    await expect(connectToMongoDB()).rejects.toThrowError(mockError);

    // Assert (Vérification)
    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/only-snippet-server');
    expect(console.error).toHaveBeenCalledWith('Error connecting to mongo:', mockError);
});
