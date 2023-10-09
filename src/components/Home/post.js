import React, { useState } from "react";
import Comment from "./comment";
import axios from "axios";
import { API } from "../../data/config";
import img from "../../global/images/photo_2023-08-12_04-33-51.jpg";
import swal from "sweetalert";
import Cookies from "js-cookie";
import formatDate from "../../utils/formatDate";

const Post = ({ post, comments }) => {
  const [comment, setComment] = useState("");
  const [idPost, setIdPost] = useState("");
  const [showCom, setShowCom] = useState(false);
  const [commentArray, setCommentArray] = useState(comments);
  const postDate = formatDate(new Date(post.created_at));
  console.log(postDate,post.created_at)

  const submitCommentHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        API.social.COMMENTS,
        {
          post_id: idPost,
          content: comment
        },
        {
          headers: {
            Authorization: "JWT " + Cookies.get("accessToken")
          }
        }
      )
      .then((res) => {
        setComment("");
        setCommentArray([...commentArray, res.data.data]);
      })
      .catch((error) => {
        swal({
          icon: "warning",
          timer: 2100,
          title: `${error.response.data.message}`
        });
      });
  };

  const showComments = () => {
    setShowCom(true);
  };

  return (
    <div className="bg-white shadow-md text-[var(--gray-color)] mt-4 rounded-lg">
      <div className="w-[100%]">
        <div className="tablet:px-[20px] px-[20px] py-[20px] w-[100%] ">
          <div className="flex items-center justify-between mb-5 text-[var(--gray-color)]">
            <div className="flex items-center">
              <img
                className="w-[45px] h-[45px] rounded-full object-cover"
                src={post.user.photo ? post.user.photo : img}
                alt=""
              />
              <div className="pl-[20px]">
                <h4 className="text-[22px] text-[var(--gray-color)]">{`${post.user.first_name} ${post.user.last_name}`}</h4>
                <p className="flex justify-start items-center opacity-[0.6] text-xs">
                  {postDate}
                </p>
              </div>
            </div>
            <div className="flex">
              <box-icon
                color="var(--gray-color)"
                name="dots-horizontal-rounded"
              ></box-icon>
              <box-icon
                style={{ margin: "0 15px" }}
                name="x"
                color="var(--gray-color)"
              ></box-icon>
            </div>
          </div>
          <div className="flex flex-col text-[16px] font-light text-lg text-[var(--gray-color)] mb-[10px] mt-8">
            <label className="mb-[10px]">{post.content}</label>
            {post.photo && (
              <img
                className=" m-auto bg-cover rounded-lg "
                src={post.photo}
                alt=""
              />
            )}
          </div>
          <hr className="border-[var(--gray-color)] mb-4 mt-14"></hr>
          <form
            className="flex justify-between items-center relative my-[15px]  mx-0"
            onSubmit={submitCommentHandler}
          >
            <input
              type="text"
              className="bg-[var(--p-color)] outline-none text-[var(--gray-color)] font-light w-[95%] rounded-l-full rounded-r-full py-0 pl-[25px] pr-[65px] h-10  "
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setIdPost(post.id);
              }}
            />
            <button type="submit" className="flex justify-center items-center">
              <box-icon name="send" color="var(--gray-color)"></box-icon>
            </button>
            <div className="flex absolute right-8 justify-between w-[10%] cursor-pointer">
              <box-icon name="link-alt" color="gray"></box-icon>
              <box-icon name="smile" color="gray"></box-icon>
            </div>
          </form>
          <div className="text-[] flex flex-col mt-[10px]">
            {commentArray.length > 1 && (
              <div className="flex justify-start items-center text-[15px] ml-2 opacity-[0.7] mb-[10px]">
                <label
                  onClick={showComments}
                  className="cursor-pointer pr-[10px]"
                >
                  View all comments
                </label>
              </div>
            )}
            <div className="all-comment">
              {!showCom && commentArray[0] !== undefined && (
                <Comment
                  key={commentArray[0].id}
                  comment={commentArray[0].content}
                  name={`${commentArray[0].user.first_name} ${commentArray[0].user.last_name}`}
                  photo={commentArray[0].user.photo}
                ></Comment>
              )}
              {showCom &&
                commentArray.map((com, index) => (
                  <Comment
                    key={index}
                    comment={com.content}
                    name={`${com.user.first_name} ${com.user.last_name}`}
                    photo={com.user.photo}
                  ></Comment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
