import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer id='footer' className='footer'>
      <div className='container'>
        <div className=''>
          <div className='row'>
            <div className='col-lg-5'>
              <div>
                <a title='Logo' href='#' className=''>DDEX</a>
                <p>
                  {t('description')}
                </p>
              </div>
            </div>
            <div className='col-lg-2'>
              <aside>
                <h3>Company</h3>
                <ul>
                  <li><Link to='/pages/about'>About Us</Link></li>
                  <li><Link to='/pages/about'>Blog</Link></li>
                  <li><Link to='/pages/faq'>Faqs</Link></li>
                  <li><Link to='/pages/contact'>Contact</Link></li>
                </ul>
              </aside>
            </div>
            <div className='col-lg-2'>
              <aside>
                <h3>Support</h3>
                <ul>
                  <li><a title='Get in Touch' href='#'>Get in Touch</a></li>
                  <li><a title='Help Center' href='#'>Help Center</a></li>
                  <li><a title='Live chat' href='#'>Live chat</a></li>
                  <li><a title='How it works' href='#'>How it works</a></li>
                </ul>
              </aside>
            </div>
            <div className='col-lg-3'>
              <aside>
                <h3>Contact Us</h3>
                <p>Email: support@example.com</p>
                <p>Phone: 1 (00) 832 2342</p>
              </aside>
            </div>
          </div>
        </div>
        <div>
          <p>{new Date().getFullYear()} &copy; <a title='Wetime' href='#'>Wetime</a>. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;