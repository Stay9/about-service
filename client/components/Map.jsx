import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './css/map.css';
import GoogleMapReact from 'google-map-react';
import GOOGLE_MAP_KEY from '../config/GoogleMap.js';

const GoogleMap = (props) => {
  console.log(process.env.GOOGLE_MAP_KEY)
return(
  <div style={{ height: '320px', width: '540px'}}>
    <GoogleMapReact
      center={props.location}
      defaultZoom={+props.zoom}
      bootstrapURLKeys={{ key: GOOGLE_MAP_KEY}}
    />
</div>

  );
};

export default CSSModules(GoogleMap, styles);
