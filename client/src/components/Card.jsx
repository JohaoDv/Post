import React from "react";
import { deletePost } from "../api/Api";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
const Card = ({ post, list, setList }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/create-post/${id}`);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deletePost(id);
        setList(list.filter((n) => n._id !== id));
      }
    });
  };
  return (
    <div
      onClick={() => handleClick(post._id)}
      className="cursor-pointer shadow-card hover:shadow-cardhover p-2"
    >
      <div className="flex justify-between py-2">
        <h1 className="overflow-hidden break-words">{post.title}</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(post._id);
          }}
          className="bg-red-600 text-white text-sm px-3 py-2 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
      <p>{post.description}</p>
      {post.image && (
        <div className={post.image.url ? "h-96" : "hidden"}>
          <img className="h-full w-full object-cover" src={post.image.url} />
        </div>
      )}
    </div>
  );
};

export default Card;
