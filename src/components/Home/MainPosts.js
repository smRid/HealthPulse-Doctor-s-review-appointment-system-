import React, { useState, useEffect, useCallback } from "react";
import imageuser from "../../global/images/cute-business-woman-idea-thinking-present-pink-background-3d-rendering(1).jpg";
import Post from "./post";
import axios from "axios";
import { API } from "../../data/config";
import Cookies from "js-cookie";
import swal from "sweetalert";

const MainPosts = (props) => {
  const [Image, setImage] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [posts, setPosts] = useState([]);

  const fethPosts = useCallback(() => {
    axios
      .get(API.social.POSTS, {
        headers: {
          Authorization: "JWT " + Cookies.get("accessToken")
        }
      })
      .then((res) => {
        setPosts(res.data.data);
      });
  }, []);

  useEffect(() => {
    fethPosts();
  }, [fethPosts]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", postText);
    formData.append("photo", postImage);
    axios
      .post(API.social.POSTS, formData, {
        headers: {
          Authorization: "JWT " + Cookies.get("accessToken")
        }
      })
      .then((res) => {
        setPosts([res.data.data, ...posts]);
        setPostText("");
        setPostImage("");
        setImage(false);
      })
      .catch((error) => {
        swal({
          icon: "warning",
          timer: 2100,
          title: `${error.response.data.message}`
        });
      });
  };

  return (
    <div className="w-[45%] m-auto">
      <div className="w-[95%] mx-auto mt-[20px] mb-[10px]" dir="ltr">
        <form onSubmit={submitHandler} className="">
          <div className="rounded-lg py-[20px] text-[var(--gray-color)] px-[20px] m-auto bg-white">
            <div className="flex justify-between items-center mb-2">
              <img src={imageuser} className="w-[55px] rounded-full" alt="" />
              <input
                type="text"
                className="tablet:w-[83%] w-[73%] px-4 outline-none rounded-r-full text-[var(--green-color)] rounded-l-full h-10  bg-[var(--p-color)]"
                value={postText}
                placeholder="What is going through your mind ?"
                onChange={(e) => {
                  setPostText(e.target.value);
                }}
              />
              <button type="submit" className="mt-1">
                <box-icon name="send" color="var(--gray-color)"></box-icon>
              </button>
            </div>
            <hr className="border-stone-500 mb-4"></hr>
            {Image && (
              <div className="flex justify-center items-center mb-[10px]">
                <img src={Image} alt="" />
              </div>
            )}
            <div className="flex justify-between px-2">
              <div className="flex justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  id="uploadimg"
                  className="hidden"
                  onChange={(e) => {
                    setPostImage(e.target.files[0]);
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label for="uploadimg" className="flex cursor-pointer">
                  <box-icon
                    name="image-add"
                    color="var(--green-color)"
                  ></box-icon>
                  <p className="ml-2">Add a photo or video</p>
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="">
          {posts.map((post, index) => {
            return (
              <Post key={post.id} post={post} comments={post.comments}></Post>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPosts;
