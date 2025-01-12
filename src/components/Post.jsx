import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Post({ handleOpen, data, setData, setCurrentUser }) {
  const [liked, setLiked] = useState([]);
  const [animate, setAnimate] = useState(false);

  const handleLike = (value) => {
    setLiked((prev) => [...prev, value]);
    setData((prevInfo) => {
      const updatedInfo = prevInfo?.map((item) =>
        item?.id === value?.id ? { ...item, likes: item.likes + 1 } : item
      );

      return updatedInfo;
    });
  };

  const handleLikeWithAnimation = (item) => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
    handleLike(item);
  };

  const handleDisLike = (value) => {
    setLiked((prev) => prev?.filter((val) => val.id !== value.id));
    setData((prevInfo) => {
      const updatedInfo = prevInfo?.map((item) =>
        item?.id === value?.id ? { ...item, likes: item.likes - 1 } : item
      );

      return updatedInfo;
    });
  };

  const handleCommentClick = (value) => {
    setCurrentUser(value);
    handleOpen();
  };

  return (
    <>
      {data?.map((val) => {
        return (
          <div className="flex justify-center items-center mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={val?.profile_picture}
                  alt="profile"
                  class="w-12 h-12 rounded-full object-cover border-1 border-gray-300 shadow-md"
                />
                <span className="font-semibold text-sm">{val?.username}</span>
              </div>
              <img
                src={val?.post_image}
                alt="post"
                class="w-full sm:w-96 h-96 object-cover border-1 rounded-sm border-gray-300"
              />
              {/*Like and Dislike*/}
              <div className="flex gap-3">
                {liked.find((ele) => ele?.id === val?.id) ? (
                  <FavoriteIcon
                    onClick={() => handleDisLike(val)}
                    className={`text-red-500 cursor-pointer transition-transform ${
                      animate ? "scale-125" : "scale-100"
                    }`}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => handleLikeWithAnimation(val)}
                    className="cursor-pointer text-gray-500 hover:text-red-500 transition-transform transform hover:scale-110"
                  />
                )}
                {animate && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-ping h-8 w-8 rounded-full bg-red-500 opacity-50"></div>
                  </div>
                )}

                <ModeCommentOutlinedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleCommentClick(val)}
                />
              </div>
              <span className="font-semibold text-sm">{val?.likes} likes</span>
              <span className="font-semibold text-sm">{val?.caption}</span>
              <span
                className="font-semibold text-sm text-gray-400 cursor-pointer"
                onClick={() => handleCommentClick(val)}
              >
                View all {val?.comments} comments
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Post;
