

import React from 'react';
import Svg, { Path, Circle, Rect, G, Stop, LinearGradient, Defs } from 'react-native-svg';
const EmailSVG = () => {
  return (
    <Svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect x="-0.5" y="0.5" width="44" height="44" rx="9.5" transform="matrix(-1 0 0 1 44 0)" fill="white" stroke="#D2D2D2" />
      <Path d="M33 16C33 14.9 32.1 14 31 14H15C13.9 14 13 14.9 13 16M33 16V28C33 29.1 32.1 30 31 30H15C13.9 30 13 29.1 13 28V16M33 16L23 23L13 16" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
};

export default EmailSVG;