import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Post.css";
function Post() {
  const [post, setpost] = useState([]);
  const [currentId, setcurrentId] = useState(0);

  const URL = "https://jsonplaceholder.typicode.com/";
  useEffect(() => {
    async function autoLoadinfo() {
      const res = await axios.get(URL + "posts");
      setpost(res.data);
    }
    autoLoadinfo();
  }, []);

  function handleComment(postID) {
       const index = post.findIndex((item) => item.id === postID);
        setcurrentId(postID);
       if(post[index].comments){
          return;
        }
        async function fetchData(){
            const res = await axios.get(URL + "comments/" + "?postId=" + postID);
            const newArr = [...post];
            newArr.splice(index, 1, { ...post[index], comments: res.data });
            setpost(newArr);
         }
      fetchData();
    }

  return (
    <div>
      <ul className="post">
        {post.map((item) => {
          return (
            <div key={item.id}>
              <li className="postLI">
                <div className="itemInfo">
                  <p>{item.id}. &nbsp;</p>
                  <h3>{item.title}</h3>
                  <button
                    onClick={() => {
                      handleComment(item.id);
                    }}
                  >
                    Show Comments
                  </button>
                </div>
              </li>

              {item.comments ? (
                <div
                  style={currentId === item.id ? {} : { display: "none" }}
                  className="comments"
                >
                  {item.comments.map((cmt) => {
                    return (
                      <div className="singleComment" key={cmt.id}>
                        <span className="commentID"> {cmt.id}. </span>
                        <span className="commentName"> {cmt.name} :</span>{" "}
                        {cmt.body}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Post;
