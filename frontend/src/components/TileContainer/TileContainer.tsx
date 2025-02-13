import React from 'react';
import { useTranslation } from 'react-i18next';
import './TileContainer.css';


interface TileContainerProps {
  links: { [key: string]: string } | null;
  visible: boolean;
}

const TileContainer: React.FC<TileContainerProps> = ({ links, visible }) => {
  const { t }: { t: (key: string) => string } = useTranslation();

  const domain = process.env.REACT_APP_DOMAIN;

  return (
    <div className={`tile-container ${visible ? 'visible' : ''}`}>
      {links &&
        Object.entries(links).map(([linkKey, value]) => (
          <a
            key={linkKey}
            href={`http://${value.toLowerCase()}.${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tile-link"
          >
            <div className="tile">
              {t(linkKey.toLowerCase())}
            </div>
          </a>
        ))}
    </div>
  );
};

export default TileContainer;
