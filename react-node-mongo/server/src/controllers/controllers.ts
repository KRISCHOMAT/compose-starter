import Kitten from "../models/Kitten";
import { Request, Response } from "express";

const getKittens = async (req: Request, res: Response) => {
  try {
    const kittens = await Kitten.find();
    res.send(kittens);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const addKitten = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newKitten = new Kitten({ name });
    await newKitten.save();
    res.send(newKitten);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const greeting = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const kitten = await Kitten.findOne({ name });
    console.log(kitten);

    if (kitten) {
      const greeting = kitten.speak();
      res.send({ msg: greeting });
    } else {
      res.send({ msg: "could not find a kitten with the name " + name });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const deleteKitten = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const response = await Kitten.deleteOne({ name });
    if (response.deletedCount === 0) {
      res.send({ msg: "could not delete kitten with name " + name });
    } else {
      res.send({ msg: name + " deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export { getKittens, addKitten, greeting, deleteKitten };
