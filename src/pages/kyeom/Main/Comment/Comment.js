import React, { useState, useRef } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './Comment.scss';

const UploadedComment = ({ id, user, content }) => {
  const [emptyHeart, filledHeart] = ['far', 'fas'];
  let isLiked = false;
  const [heart, setHeart] = useState(isLiked ? filledHeart : emptyHeart);
  const handleLike = () => {
    heart === emptyHeart ? setHeart(filledHeart) : setHeart(emptyHeart);
  };

  return (
    <div className="uploaded-comment-wrapper">
      <div className="name">{user}</div>
      <div className="uploaded-comment">{content}</div>
      <button
        className="delete"
        // onClick={() => deleteComment(id)}
      >
        삭제
      </button>
      <div className="like">
        <i className={`${heart} fa-heart`} onClick={handleLike} />
      </div>
    </div>
  );
};

const Comment = ({ postId, name }) => {
  // const [commentData, setCommentData] = useState(
  //   localStorage.getItem('idAndComment')
  //     ? JSON.parse(localStorage.getItem('idAndComment'))
  //     : []
  // );
  const [commentData, setCommentData] = useState({ [postId]: null });
  const [inputState, setInputState] = useState('');
  const btnRef = useRef();
  const onPost = event => {
    event.preventDefault();

    setInputState('');
    // const userName = sessionStorage.getItem('id');
    // const content = inputRef.current.value;
    // inputRef.current.value = null;
    btnRef.current.disabled = true;

    // setCommentData(cur => [
    //   ...cur,
    //   {
    //     id: cur.length + 1,
    //     userName: userName,
    //     content: content,
    //     isLiked: false,
    //   },
    // ]);
    postCommentData();
  };
  const postCommentData = async () => {
    const email = localStorage.getItem('email');
    const json = await (
      await fetch(`http://172.30.1.55:8002/comment/${postId}`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          post_id: postId,
          comment: inputState,
        }),
      })
    ).json();
    console.log(json);
    setCommentData(cur => ({
      [postId]: [
        ...cur[postId],
        {
          name: name,
          comment: inputState,
        },
      ],
    }));
  };
  const getCommentData = async () => {
    const json = await (
      await fetch(`http://172.30.1.55:8002/comment/${postId}`)
    ).json();
    setCommentData({ [postId]: json.result });
    console.log(json);
  };
  useEffect(() => {
    getCommentData();
  }, []);
  useEffect(() => {
    console.log('commentData', commentData);
  }, [commentData]);
  // useEffect(() => {
  //   localStorage.setItem('idAndComment', JSON.stringify(commentData));
  // }, [commentData]);

  const onInput = event => {
    setInputState(event.target.value);
  };
  useEffect(() => {
    btnRef.current.disabled = !inputState;
  }, [inputState]);

  // const deleteComment = id => {
  //   setCommentData(cur => cur.filter(ele => ele.id !== id));
  // };

  return (
    <>
      <section className="uploaded-comment">
        {/* {commentData &&
          commentData.map(data => (
            <UploadedComment
              key={data.id}
              id={data.id}
              userName={data.userName}
              content={data.content}
              isLiked={data.isLiked}
              deleteComment={deleteComment}
            />
          ))} */}
        {commentData[postId] &&
          commentData[postId].map(data => (
            <UploadedComment
              key={data.id}
              id={data.id}
              user={data.name}
              content={data.comment}
              // deleteComment={deleteComment}
            />
          ))}
      </section>
      <section className="comment">
        <form className="comment" onSubmit={onPost}>
          <input
            className="comment"
            type="textarea"
            placeholder="댓글 달기…"
            autoComplete="off"
            value={inputState}
            onInput={onInput}
          />
          <button type="submit" ref={btnRef} disabled>
            게시
          </button>
        </form>
      </section>
    </>
  );
};

export default Comment;
