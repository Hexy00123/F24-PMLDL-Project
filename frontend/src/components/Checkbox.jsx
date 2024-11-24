import React, { useState } from 'react';
import goblet from '../assets/goblet.svg';
import highball from '../assets/highball.png';
import flute from '../assets/flute.png';
import parfait from '../assets/parfait.svg';
import upload from '../assets/upload.png';

const Checkbox = () => {
  const [selectedOption, setSelectedOption] = useState('Goblet');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
    console.log(`Selected option: ${event.target.id}`);
  };

  return (
    <div className="container">
      <div className="radio-tile-group">
      
      <div className="input-container">
        <input id="Goblet" className="radio-button" type="radio" name="radio" defaultChecked onChange={handleOptionChange} />
        <div className="radio-tile">
        <div className="icon walk-icon">           
          <img src={goblet} alt="Goblet" />
        </div>
        <label htmlFor="Goblet" className="radio-tile-label">Goblet</label>
        </div>
      </div>

      <div className="input-container">
        <input id="Highball" className="radio-button" type="radio" name="radio" onChange={handleOptionChange} />
        <div className="radio-tile">
        <div className="icon bike-icon">
        <img src={highball} alt="Highball" />
        </div>
        <label htmlFor="Highball" className="radio-tile-label">Highball</label>
        </div>
      </div>

      <div className="input-container">
        <input id="Flute" className="radio-button" type="radio" name="radio" onChange={handleOptionChange} />
        <div className="radio-tile">
        <div className="icon bike-icon">
          <img src={flute} alt="Flute" /> 
        </div>
        <label htmlFor="Flute" className="radio-tile-label">Flute</label>
        </div>
      </div>

      <div className="input-container">
        <input id="Parfait" className="radio-button" type="radio" name="radio" onChange={handleOptionChange} />
        <div className="radio-tile">
        <div className="icon bike-icon">
          <img src={parfait} alt="Parfait" />
        </div>
        <label htmlFor="Parfait" className="radio-tile-label">Parfait</label>
        </div>
      </div>

      <div className="input-container">
        <input id="Upload" className="radio-button" type="radio" name="radio" onChange={handleOptionChange} />
        <div className="radio-tile">
        <div className="icon bike-icon">
          <img src={upload} alt="Upload" />
        </div>
        <label htmlFor="Upload" className="radio-tile-label">Upload</label>
        </div>
      </div>

      </div>
    </div>
  );
}

export default Checkbox;
