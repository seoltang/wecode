import React, { useState, useEffect } from 'react';
import Nav from '../../../components/Nav/Nav';
import Feeds from './Feeds/Feeds';
import Aside from './Aside/Aside';
import './Main.scss';

const MainWrapper = () => {
  const [feedData, setFeedData] = useState(null);
  // const [commentData, setCommentData] = useState(null);
  // useEffect(() => {
  //   fetch('http://localhost:3000/data/kyeom/dataKyeom.json')
  //     .then(res => res.json())
  //     .then(res => setCommentData(res));
  // }, []);
  useEffect(() => {
    fetch('http://172.30.1.55:8002/posting')
      .then(res => res.json())
      .then(res => {
        console.log(res.result);
        setFeedData(res.result);
      });
  }, []);
  // const data = { ...feedData, ...commentData };

  // useEffect(() => {
  //   fetch('http://172.30.1.55:8002/posting', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: 'wecode@naver.com',
  //       image: '/images/kyeom/coffee.jpg',
  //       post: '얼죽아!',
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //     });
  // }, []);
  return (
    <div className="MainWrapper">
      <Feeds feedData={feedData} />
      <Aside />
    </div>
  );
};

const MainKyeom = () => {
  return (
    <>
      <Nav />
      <MainWrapper />
    </>
  );
};

export default MainKyeom;
