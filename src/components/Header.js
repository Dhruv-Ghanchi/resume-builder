import React from 'react';

function Header({ selectedTemplate, setSelectedTemplate, anonymize, setAnonymize }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">RB</div>
        <div>
          <h1>Resume Builder</h1>
          <p className="tagline">Create clean, professional resumes in minutes</p>
        </div>
      </div>

      <div className="header-controls">
        <div className="template-buttons">
          <button
            className={selectedTemplate === 'modern' ? 'active' : ''}
            onClick={() => setSelectedTemplate('modern')}
            aria-pressed={selectedTemplate === 'modern'}
          >
            Modern
          </button>
          <button
            className={selectedTemplate === 'classic' ? 'active' : ''}
            onClick={() => setSelectedTemplate('classic')}
            aria-pressed={selectedTemplate === 'classic'}
          >
            Classic
          </button>
        </div>

        <div style={{ marginLeft: 12 }}>
          <label style={{ fontSize: 13, color: '#0b1220', marginRight: 8 }}>Anonymize</label>
          <button
            className={anonymize ? 'active' : ''}
            onClick={() => setAnonymize(!anonymize)}
            aria-pressed={anonymize}
            title="Hide personal details when exporting/sharing"
          >
            {anonymize ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </header>
  );
}
 
export default Header;
