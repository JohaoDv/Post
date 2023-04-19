import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { preview } from "../assets";
import { useForm } from "react-hook-form";
import { FormField } from "../components";
import { createPost, getOnePost, updatePost } from "../api/Api";

const CreatePost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [valueImage, setValueImage] = useState(null);
  const [url, setUrl] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [load, setLoad] = useState(false);
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    setValueImage(e.target.files[0]);
    setUrl("");
  };
  const onSubmit = async (data) => {
    setLoad(true);
    data.image = valueImage;
    if (params.id) {
      const response = await updatePost(data, params.id);
    } else {
      const response = await createPost(data);
    }
    setLoad(false);
    navigate("/");
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setSelectedImage(null);
    setValueImage(null);
    setUrl("");
  };
  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getOnePost(params.id);
        if (res.data.image?.url) {
          setUrl(res.data.image.url);
        }
        reset(res.data);
      }
    })();
  }, []);
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          {params.id ? "Update" : "Create"}
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          {params.id
            ? "Update your own post"
            : "Create imaginative and visually post"}
        </p>
      </div>
      <form className="mt-10 max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Title"
            type="text"
            name="title"
            placeholder="enter a title"
            register={register}
            errors={errors}
          />
          <FormField
            labelName="description"
            type="text"
            name="description"
            placeholder="enter a description"
            register={register}
            errors={errors}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 flex justify-center items-center">
            <label
              htmlFor="input-id"
              className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center"
              style={{
                backgroundImage: selectedImage
                  ? `url(${selectedImage})`
                  : url
                  ? `url(${url})`
                  : `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: url ? "0.5" : selectedImage ? "1" : "0.5",
              }}
            >
              <input
                type="file"
                {...register("image")}
                id="input-id"
                className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                onChange={(e) => {
                  handleImageSelect(e);
                  handleChange(e);
                }}
              />
            </label>
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            className={
              selectedImage
                ? "text-white bg-red-700 font-medium rounded-md text-sm w-64 sm:w-64 px-5 py-2.5 text-center"
                : "hidden"
            }
            onClick={handleCancel}
          >
            Cancel image
          </button>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="submit"
            className="text-white bg-green-700 font-medium rounded-md text-sm w-64 sm:w-64 px-5 py-2.5 text-center"
          >
            {load ? "saving..." : "save"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
