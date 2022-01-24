import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Nav.scss';

const buttonData = [
  {
    id: 1,
    className: 'menu',
    alt: 'explore button',
    src: 'https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/explore.png',
  },
  {
    id: 2,
    className: 'menu',
    alt: 'heart button',
    src: 'https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png',
  },
  {
    id: 3,
    className: 'menu',
    alt: 'profile button',
    src: 'https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png',
  },
];

const searchedProfileData = [
  {
    id: 1,
    userId: 'wecode_bootcamp',
    userName: '> wecode | 위코드',
    src: '/images/kyeom/wecode.jpg',
  },
  {
    id: 2,
    userId: 'seoltang',
    userName: '설탕',
    src: '/images/kyeom/pink.png',
  },
];

const SearchedProfile = ({ src, userId, userName }) => {
  return (
    <div className="SearchedProfile">
      <div className="user-img">
        <img alt="searched profile" src={src} />
      </div>
      <div className="user-profile">
        <div className="id name">{userId}</div>
        <div className="description">{userName}</div>
      </div>
    </div>
  );
};

const Nav = () => {
  // const iRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [inputState, setInputState] = useState('');
  const [searchedData, setSearchedData] = useState(null);

  const onFocus = () => {
    // iRef.current.className = 'fas fa-search hidden';
    setIsFocused(true);
  };
  const onBlur = () => {
    // iRef.current.className = 'fas fa-search';
    setIsFocused(false);
  };

  const onInput = event => {
    setInputState(event.target.value);
  };

  const getSearchedData = async () => {
    const json = await (
      await fetch('http://172.30.1.55:8002/search', {
        method: 'POST',
        body: JSON.stringify({
          search: inputState,
        }),
      })
    ).json();
    setSearchedData(json);
    console.log(json);
  };
  useEffect(() => {
    getSearchedData();
    console.log(inputState);
  }, [inputState]);
  useEffect(() => {
    console.log(searchedData);
  }, [searchedData]);

  return (
    <div className="Nav">
      <nav>
        <div className="nav-wrapper">
          <h1 className="logo">westagram</h1>
          <div className="search">
            <input
              type="text"
              placeholder="검색"
              onFocus={onFocus}
              onBlur={onBlur}
              onInput={onInput}
            />
            <i className={`fas fa-search${isFocused ? ' hidden' : ''}`} />
            <div className={`search-result${isFocused ? '' : ' hidden'}`}>
              <div className="tail" />
              <div className="search-box">
                {searchedProfileData.map(data => (
                  <SearchedProfile
                    src={data.src}
                    userId={data.userId}
                    userName={data.userName}
                    key={data.id}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="menu-wrapper">
            {buttonData.map(data => (
              <Button
                className={data.className}
                alt={data.alt}
                src={data.src}
                key={data.id}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
