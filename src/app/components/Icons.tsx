import React from 'react';
import { Svg, Path } from 'react-native-svg';


export const HomeIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M3 12l9-9 9 9h-3v8h-4v-6h-4v6h-4v-8z" />
  </Svg>
);

export const SearchIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm6.293-3.293l4.707 4.707-1.414 1.414-4.707-4.707 1.414-1.414z" />
  </Svg>
);

export const ProfileIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-2.67 0-8 1.335-8 4v2h16v-2c0-2.665-5.33-4-8-4z" />
  </Svg>
);
