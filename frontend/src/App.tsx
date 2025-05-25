import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo_otter from './logo-otter.png';
import logo_swirl from './logo-swirl.png';
import './App.css';
import axios from 'axios';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import TileContainer from './components/TileContainer/TileContainer';

interface Link {
  [key: string]: string;
}

function App() {
  const [showTiles, setShowTiles] = useState(false);
  const [links, setLinks] = useState<Link | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t }: { t: (key: string) => string } = useTranslation();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('/api/dashboard_links');
        setLinks(response.data.links);
        setError(null); // Clear any previous errors
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error ${err.response.status}: ${err.response.data.message}`);
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
        console.error('Error fetching dashboard links:', err);
      }
    };

    fetchLinks();
  }, []);

  const toggleTiles = () => {
    setShowTiles((prev) => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Logo and Title */}
        <div className="App-logo-wrapper" onClick={toggleTiles}>
          <img src={logo_swirl} className="App-logo-swirl" alt="logo-swirl" />
          <img src={logo_otter} className="App-logo-otter" alt="logo-otter" />
        </div>
        <h1 className="App-title" onClick={toggleTiles}>
          OtterVerse
        </h1>
        <sup className='signature1'>by <span className='signature2'>geotsa</span></sup>
        {/* Tile Container */}
        <TileContainer links={links} visible={showTiles} />

        {/* Language Switcher */}
        <LanguageSwitcher visible={showTiles} />

        {/* Welcome Message */}
        <div className={`welcome-message ${showTiles ? 'invisible' : ''}`}>
          <h1 className="App-title" onClick={toggleTiles}>
            {t('welcome')}
          </h1>
        </div>

        {/* Call for Action Message */}
        <div className={`call-for-action-message ${showTiles ? 'visible' : ''}`}>
          <h1 className="App-title" onClick={toggleTiles}>
            {t('select_tile')}
          </h1>
        </div>
      </header>
    </div>
  );
}

export default App;
