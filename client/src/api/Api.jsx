import axios from "axios";
export const getPost = async () => {
  try {
    const response = await axios.get("/post");
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
    const response = await axios.post("/post", form, {
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
    const response = await axios.put(`/post/${id}`, form, {
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
  const response = await axios.get(`/post/${id}`);
  return response;
};
export const deletePost = async (id) => {
  await axios.delete(`/post/${id}`);
};
