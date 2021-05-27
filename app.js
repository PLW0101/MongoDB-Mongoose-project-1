const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});
//the fruitsDB above means to connect to fruitsDB database or to create it

// with mongoose, create a schema first
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data again, name is required."],
  },
  rating: {
    type: Number,
    // Mongoose Built-in Validators. Numbers have min and max validators. // not sure why this doesn't work out for me. Should get an error, instead, the new fruit is created.
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);
// important! in the model, make sure write as a singular noun, it'll be changed by mongoose to plural

// construct the fruit
const fruit = new Fruit({
  name: "Pineapple",
  rate: 12,
  review: "Pineapple is a lot of work to cut peel and cut.",
});

// fruit.save();
//use save() method in Mongoose. it saves this fruit document into a fruits collection inside our fruitsDB
// commented the fruit.save() out after the method has been called, otherwise it'll keep adding a new apple

// create a new collection
// (1) createa a schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// (2) create a model
const Person = mongoose.model("Person", personSchema);

const blueberry = new Fruit({
    name: "Blueberry",
    rating: 10,
    review: "Best fruit in the world!",
  });
  
  //blueberry.save();
  //don't forget this step once!

// (3) create a new person using that Schema
const person = new Person({
  name: "Lisa",
  age: 17,
  favoriteFruit: blueberry
});
//person.save()
// don't forget to comment the above method out once it's used, otherwise it keeps being added again

Person.updateOne(
  { name: "John" },
  { favoriteFruit: blueberry },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully added the favorite fruit');
    }
  }
);

// check again
/* 
> use fruitsDB
switched to db fruitsDB
> show collections
fruits
people
> 
*/

/* 
const kiwi = new Fruit({
  name: "Kiwi",
  score: 8,
  review: "Yummy!",
});

const guava = new Fruit({
  name: "Guava",
  score: 3,
  review: "The core is too hard with too many seeds. It's also a bit smelly.",
});

const banana = new Fruit({
  name: "Banana",
  score: 7,
  review: "Easy fruit.",
});
 */

/* 
Fruit.insertMany([kiwi, guava, banana], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully added all the fruits to fruitsDB.");
  }
}); 
*/

// Read with mongoose
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    // writing this line "mongoose.connection.close();" will allow running $node app.js end up at the prompt "plw@plw:~" directly instead of having to click Ctrl+C to return to "plw@plw:~"

    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

/* 
Fruit.updateOne({_id:"60aef94f87d1df828165bcd4"},{review:"Star Fruit isn't available in Germany"}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Successfully updated the fruit document.");
    }
}) 
*/

/* 
Fruit.deleteOne({_id:'60af127db97746994fc45c8c'},function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Successfully deleted the document.');
    }
})
  */

/* 
Fruit.deleteMany({_id:['60af1286b184ec99608372ba','60af134a3ef7eb9a6701546a']},function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Successfully deleted the document.');
    }
})
  */

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("fruits");
  //Insert some documents
  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great apples!",
      },
      {
        name: "Orange",
        score: 6,
        review: "Tasteless and dry.",
      },
      {
        name: "Banana",
        score: 9,
        review: "Smells and tastes good!",
      },
    ],
    function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

const findDocuments = function (db, callback) {
  // Get the fruits collection
  const collection = db.collection("fruits");
  // Find some documents
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
