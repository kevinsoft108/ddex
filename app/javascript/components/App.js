import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { AuthProvider } from '../services/Auth.context';
import { GlobalMessagingProvider } from '../services/GlobalMessaging.context';
import store from '../redux/store';
import Header from './Header.js';
import Footer from './Footer';
import Home from './Home';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <Suspense fallback='loading'>
      <Provider store={store}>
        <AuthProvider>
          <GlobalMessagingProvider>
            <div className={`lang-${i18n.language}`} >
              <Header />
              <Routes>
                <Route path='/*' element={<Home />} />
              </Routes>
              <Footer />
            </div>
            </GlobalMessagingProvider>
        </AuthProvider>
      </Provider>
    </Suspense>
  );
}

export default App;
