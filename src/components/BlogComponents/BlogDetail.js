import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import CommentsPost from './CommentsPost';
import blogDetail from '../../styles/blogDetail.module.css';
import axios from 'axios';

export default function BlogDetail() {
  const router = useRouter();
  const commentsRef = useRef(null);
  const userId = router.query.blogId;
  const postId = router.query.postId;
  const [userDetail, setUserDetail] = useState({});
  const [userPost, setUserPost] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [handleShowComments, setHandleShowComments] = useState(false);

  useEffect(() => {
    const handleUserDetail = async (userId) => {
      await axios(`https://gorest.co.in/public/v2/users/${userId}/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
        .then(response => {
          setUserDetail(response.data);
        })
        .catch((error) => {
          if (error) {
            console.log(error.response.data.message)
            setUserDetail(error.response.data.message);
          }
        });
    };

    handleUserDetail(userId);
  }, [userId]);

  useEffect(() => {
    const handlePostById = async(postId) => {
      await axios(`https://gorest.co.in/public/v2/posts/${postId}/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
        .then(response => {
          setUserPost(response.data)
        })
        .catch(error => {
          if(error) {
            console.log(error.response)
          }
        })
    }
    
    handlePostById(postId)
  }, [postId])

  const handleCommentPostUser = async (postId) => {
    await axios(`https://gorest.co.in/public/v2/posts/${postId}/comments/?access-token=c86bdd87d5714dddfdf57887c16ede322f59d3cb76c13b677c2a1f0a59cfe411`)
      .then(response => {
        setUserComments(response.data);
        setHandleShowComments(true);
      })
      .catch(error => {
        if (error) {
          console.log(error.response.data);
        }
      });
  };

  const handleCloseComments = () => {
    setHandleShowComments(false);
  };

  return (
    <>
      {userDetail === "Resource not found" || undefined ? <p>User not found</p> : 
        <div>
          <h2>{userDetail.name}</h2>
          <p>{userDetail.email}</p>
          <p>{userDetail.gender}</p>
        </div>
      }
      <div className={blogDetail.test}>
        <h2>{userPost.title}</h2>
        <p>{userPost.body}</p>
        {handleShowComments ?
          <button onClick={() => handleCommentPostUser(userPost.id)} disabled>See Comments</button> :
          <button onClick={() => handleCommentPostUser(userPost.id)}>See Comments</button>}
      </div>
      {handleShowComments ? <CommentsPost userComments={userComments} handleCloseComments={handleCloseComments} postId={postId}/> : null}
    </>
  );
}


