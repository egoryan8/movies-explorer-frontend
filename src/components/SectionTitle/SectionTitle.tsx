import React from 'react';
import {SectionTitleProps} from "./SectionTitle.props";
import './SectionTitle.css';

const SectionTitle: React.FC<SectionTitleProps> = ({children}) => {
  return (
    <h2 className="section-title">
      {children}
    </h2>
  );
};

export default SectionTitle;