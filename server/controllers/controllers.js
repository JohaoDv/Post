import { deleteImage, updateImage } from "../libs/cloudinary.js";
import modelo from "../models/models.js";
import fs from "fs-extra";
export const getPost = async (req, res) => {
  try {
    const lista = await modelo.find();
    return res.send(lista);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    let image;
    //otra anidacion:
    // if (req.files) {
    //   if (req.files.image) {

    //   }
    // }
    if (req.files?.image) {
      const result = await updateImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const { title, description } = req.body;
    const create = new modelo({
      title,
      description,
      image,
    });
    await create.save();
    return res.json(create);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    if (req.files?.image) {
      const result = await updateImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const { id } = req.params;
    const update = await modelo.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.send(update);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await modelo.findByIdAndDelete(id);
    if (!remove) {
      return res.sendStatus(404);
    }
    if (remove.image.public_id) {
      await deleteImage(remove.image.public_id);
      // await fs.remove(req.files.image.tempFilePath)
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const get = await modelo.findById(id);
    if (!get) {
      return res.sendStatus(404);
    }
    return res.send(get);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
