import React from 'react';
import styled from 'styled-components/native';
import {convertHeight, convertWidth} from 'utils/convertSize';

export interface LayoutProps {
  flex?: any;
  margin?: number;
  marginRight?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  width?: number;
  height?: number;
  border?: boolean;
  borderWidth?: number;
  borderColor?: string;
  centered?: any;
  between?: any;
  middle?: any;
  color?: string;
  style?: any;
  direction?: string;
  children?: any;
  justifyContent?: string;
  borderRadius?: number;
  shadow?: any;
}

const Layout = (props: LayoutProps) => {
  const {
    flex,
    margin,
    marginRight,
    marginVertical,
    marginHorizontal,
    marginTop,
    marginBottom,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    centered,
    between,
    middle,
    color,
    style,
    direction,
    justifyContent,
    borderRadius,
    shadow,
    children,
  } = props;
  const styleComponent = [
    flex && {height: '100%', width: '100%'},
    margin && {margin: convertWidth(margin)},
    marginRight && {marginRight: convertWidth(marginRight)},
    marginVertical && {marginVertical: convertHeight(marginVertical)},
    marginHorizontal && {marginHorizontal: convertWidth(marginHorizontal)},
    marginTop && {marginTop: convertHeight(marginTop)},
    marginBottom && {marginBottom: convertHeight(marginBottom)},
    padding && {padding: convertWidth(padding)},
    paddingVertical && {paddingVertical: convertHeight(paddingVertical)},
    paddingHorizontal && {paddingHorizontal: convertWidth(paddingHorizontal)},
    paddingTop && {paddingTop: convertHeight(paddingTop)},
    paddingBottom && {paddingBottom: convertHeight(paddingBottom)},
    paddingLeft && {paddingLeft: convertWidth(paddingLeft)},
    paddingRight && {paddingRight: convertWidth(paddingRight)},
    width && {width: convertWidth(width)},
    height && {height: convertWidth(height)},
    border && {borderWidth: 1, borderColor: 'gray'},
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    color && {backgroundColor: color},
    centered && {justifyContent: 'center'},
    between && {justifyContent: 'space-between'},
    justifyContent && {justifyContent},
    direction && {flexDirection: direction},
    middle && {alignItems: 'center'},
    borderRadius && {borderRadius},
    shadow && {
      shadowOpacity: 0.22,
      shadowRadius: 15,
      shadowColor: 'gray',
      shadowOffset: {height: 0, width: 0},
      elevation: 5,
    },
    style,
  ];
  return <Container style={[styleComponent]}>{children}</Container>;
};
export default Layout;

const Container = styled.View``;
