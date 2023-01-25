import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { Auth } from './user/Auth';
import Maybe from './Maybe';

import { useAuth } from '../services/Auth.context';
import TokenService from '../services/Token.service';
import FetchService from '../services/Fetch.service';
import checkLogin from '../services/utils/checkLogin';
import storage from '../services/utils/storage';
import { useGlobalMessaging } from '../services/GlobalMessaging.context';

const Header = () => {
  const [showSidemenu, setShowSidemenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authState, authDispatch] = useAuth();
  const [globalMessaging, messageDispatch] = useGlobalMessaging();
  const tokenService = new TokenService();
  const navigate = useNavigate();
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  const logout = () => {
    authDispatch({
      type: 'removeAuthDetails'
    });

    messageDispatch({
      type: 'setMessage',
      payload: {
        message: 'Logout successfully!',
        klass: 'success'
      }
    });
    tokenService.deleteToken();
    navigate('/');
  }

  // useEffect(() => {
  //   if (!router.query.token) return;
  //   FetchService.isofetch(
  //     '/auth/confirmation',
  //     {
  //       confirmationToken: router.query.token
  //     },
  //     'POST'
  //   )
  //     .then((res) => {
  //       if (res.success) {
  //         messageDispatch({
  //           type: 'setMessage',
  //           payload: {
  //             message: t('email-confirmed'),
  //             klass: 'success'
  //           }
  //         });
  //         setShowLogin(true);
  //       } else {
  //         messageDispatch({
  //           type: 'setMessage',
  //           payload: {
  //             message: res.message,
  //             klass: 'danger'
  //           }
  //         });
  //       }
  //     })
  //     .catch();
  // }, [router]);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const lang = i18n.language === 'en' ? 'he' : 'en';
  
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-white fixed-top bg-white'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            DDEX
          </Link>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse justify-content-end' id='navbarCollapse'>
            <ul className='navbar-nav mb-2 mb-md-0'>
              <li className='nav-item'>
                <Link to='#' className='nav-link'>
                  Features
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='#' className='nav-link'>
                  Pricing
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='#' className='nav-link'>
                  FAQs
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='#' className='nav-link'>
                  About
                </Link>
              </li>
              <Maybe test={isLoggedIn} >
                <li>
                  <a href='#'>
                    <span className='avatar'><img src={currentUser?.avatar || '/images/member-avatar.png'} alt='Avatar' width={30} height={30}/></span>
                    &nbsp;{[currentUser?.firstName, currentUser?.lastName].join(' ')}
                  </a>
                  <ul className='sub-menu'>
                    <li><Link href='/user/dashboard'>Dashboard</Link></li>
                    <li><Link href='/user/profile'>Profile</Link></li>
                    <li><Link href='/user/plans'>Membership</Link></li>
                    <li>
                      <a title='Logout' className='open-login' onClick={logout}>
                        <span>Logout</span>
                        <i className='fal fa-sign-out-alt' />
                      </a>
                    </li>
                  </ul>
                </li>
              </Maybe>
              <Maybe test={!isLoggedIn} >
                <Auth visible={showLogin} toggleLogin={(visible) => setShowLogin(visible)} />
              </Maybe>
              <li className='nav-item'>
                <div className='dropdown'>
                  <Link to='#' className='dropdown-toggle nav-link' data-bs-toggle='dropdown' aria-expanded='false'>
                    {i18n.language}
                  </Link>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link to='#' className='dropdown-item nav-link' onClick={() => changeLanguage(lang)}>
                        {lang}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
