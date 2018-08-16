import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './css/hostInfo.css';


const HostDescription = (props) => {
  return (
    <div styleName="infoBox">
      <p>{props.description}</p>
      <p>Language: <span styleName='boldingWords'>{props.languages}</span></p>
      <p>Response Rate: <span styleName='boldingWords'>{props.response_rate * 100}%</span></p>
      <p>Response Time: <span styleName="boldingWords">{props.responseTimeConvertor()}</span></p>
      <p><button styleName="button">Contact Host</button></p>
    </div>
  );
};

export default CSSModules(HostDescription, styles);
