import axios from "axios";

const baseUrl = "https://post-production.up.railway.app";

export const getPost = async () => {
  try {
    const response = await axios.get(`${baseUrl}/post`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (values) => {
  try {
    const form = new FormData();
    for (const key in values) {
      form.append(key, values[key]);
    }
    const response = await axios.post(`${baseUrl}/post`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (values, id) => {
  try {
    const form = new FormData();
    for (const key in values) {
      form.append(key, values[key]);
    }
    const response = await axios.put(`${baseUrl}/post/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getOnePost = async (id) => {
  const response = await axios.get(`${baseUrl}/post/${id}`);
  return response;
};

export const deletePost = async (id) => {
  await axios.delete(`${baseUrl}/post/${id}`);
};