import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Suggessions from "../components/Suggessions";
import axios from "axios";
import Comments from "../components/Comments";
import { BASEURL } from "../constants/baseURL";
import { CircularProgress } from "@mui/material";

function FeedPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPosts = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BASEURL}/posts`);
      setData(res?.data);
    } catch (errr) {
      alert(errr.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex gap-2 w-full p-4 mt-2">
          <div className="sm:w-5/6 w-full h-screen flex flex-col">
            {/*Posts*/}
            <Post
              handleOpen={handleOpen}
              data={data}
              setData={(val) => setData(val)}
              setCurrentUser={(val) => setCurrentUser(val)}
            />
            <br />
          </div>
          <div className="w-2/6 hidden sm:block">
            <Suggessions />
          </div>
        </div>
      )}
      {/*Comment Modal*/}
      <Comments
        open={open}
        handleClose={handleClose}
        currentUser={currentUser}
        setData={(val) => setData(val)}
        data={data}
      />
    </>
  );
}

export default FeedPage;
