const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Ceviche",
      level: "Amateur Chef",
      ingredients: "Fish, onion, lemon, sweet potato and lettuce",
      cuisine: "Peruvian",
      dishType: "main_course",
      duration: 45,
      creator: "Gaston Acurio",
    });

    // Run your code here, after you have insured that the connection was made
  })
  .then((recipe) => {
    console.log(recipe.created);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Succesfully edited");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("deleted");
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Disconnected");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
