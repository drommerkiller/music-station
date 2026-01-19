import React from 'react';

const AudioPromptInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="field-label">
        Describe your sound
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="dark ambient drone with distant thunder, tape saturation, and haunting female vocals..."
        className="input-field"
        style={{ minHeight: '140px' }}
      />
    </div>
  );
};

export default AudioPromptInput;
