import mongoose, { Document } from "mongoose";

const kittySchema = new mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I dont have a name...";
  return greeting;
};

interface Kitten extends Document {
  name?: string;
  speak: () => void;
}

const Kitten = mongoose.model<Kitten>("Kitten", kittySchema);

export default Kitten;
