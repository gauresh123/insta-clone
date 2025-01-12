import React, { useState } from "react";
import { Dialog, DialogTitle, InputAdornment, TextField } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import { dummyData } from "../constants/dummyComents";

function Comments({ open, handleClose, setData, currentUser, data }) {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const handlePostClick = () => {
    if (!comment) {
      alert("Please add comment!");
      return;
    }
    let obj = {
      commentId: currentUser?.id,
      username: "Gauresh",
      picture: "https://img.freepik.com/free-photo/artist-white_1368-3543.jpg",
      comment,
    };

    setComments((prev) => [obj, ...prev]);
    setData((prevInfo) => {
      const updatedInfo = prevInfo?.map((item) =>
        item?.id === currentUser?.id
          ? { ...item, comments: item.comments + 1 }
          : item
      );

      return updatedInfo;
    });

    setComment("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePostClick();
    }
  };

  let count = data?.find((val) => val?.id == currentUser?.id)?.comments;

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="flex justify-between items-center">
        <DialogTitle>{count || currentUser?.comments} Comments</DialogTitle>
        <ClearIcon sx={{ cursor: "pointer", mr: 1 }} onClick={handleClose} />
      </div>

      {/*New Added Comments*/}
      <div className={`flex flex-col gap-4 ${comments && "p-5"}`}>
        {comments
          ?.filter((value) => value?.commentId == currentUser?.id)
          ?.map((val, i) => {
            return (
              <div className="flex gap-2 items-center" key={i}>
                <img
                  src={val?.picture}
                  alt="profile"
                  class="w-12 h-12 rounded-full object-cover border-1 border-gray-300 shadow-md"
                />

                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{val?.username}</span>
                  <span className="font-normal text-sm text-gray-600">
                    {val?.comment}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {/*Dummy static comments */}
      <div className={`flex flex-col gap-4 mb-1 p-5 ${comments && "pt-0"}`}>
        {dummyData?.map((val, i) => {
          return (
            <div className="flex gap-2 items-center" key={i}>
              <img
                src={val?.picture}
                alt="profile"
                class="w-12 h-12 rounded-full object-cover border-1 border-gray-300 shadow-md"
              />

              <div className="flex flex-col">
                <span className="font-semibold text-sm">{val?.username}</span>
                <span className="font-normal text-sm text-gray-600">
                  {val?.comment}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 left-1 right-1 p-2 bg-white border-t border-gray-300">
        <TextField
          fullWidth
          variant="standard"
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span
                  className="font-semibold text-blue-600 cursor-pointer"
                  onClick={handlePostClick}
                >
                  Post
                </span>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Dialog>
  );
}

export default Comments;
