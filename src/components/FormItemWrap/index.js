import React from 'react';

export default ({ label, children }) => (
  <div className="no-form-item">
    <span className="no-form-item-label">{label}</span>
    <div className="no-form-item-control">
      <div className="no-form-item-content">{children}</div>
    </div>
  </div>
);
