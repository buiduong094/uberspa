import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from "styled-components/native";

const LoadingSpine = () => (
  <SpinView>
    <ActivityIndicator
      size="large"
     color='#FE8F5F'
    />
  </SpinView>
);

const SpinView = styled.View`
position: absolute; 
left: 0;
right: 0;
top: 0;
bottom: 0;
alignItems: center;
justifyContent: center;
`;
export default LoadingSpine;
