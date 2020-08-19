import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { TimeStage, CalendarDate } from 'models/calendar';
import { fontFamily } from 'utils/Theme';

export interface UIProps {
    onPress: Function,
    item?: CalendarDate,
    index?: number


}


const DateUI = (props: UIProps) => {
    const BackgroundColorStyled = () => {

      
     if (props.item?.active) {
            return '#65DF7B20';
        }
        else {
            return 'white'
        }
    }
    const ColorStyled = () => {

     if (props.item?.active) {
            return '#65DF7B';
        }
        else {
            return '#D8D8D8'
        }
    }
    const TextColorStyled = () => {

      if (props.item?.active) {
            return '#65DF7B';
        }
        else {
            return '#9B9B9B'
        }
    }
    const TextDayColorStyled = () => {

        if (props.item?.active) {
              return '#65DF7B';
          }
          else {
              return '#000000'
          }
      }
      const TextDateColorStyled = () => {

        if (props.item?.active) {
              return '#65DF7B';
          }
          else {
              return '#4A4A4A'
          }
      }
      
    return (
        <Container style={{ backgroundColor: BackgroundColorStyled(), borderColor: ColorStyled() }} onPress={() => {
            if (props.onPress) {
                props.onPress(props.item, props.index)
            }
        }}>
            <TextDayStyled style={{ color: TextDayColorStyled() }}>{props.item?.day}</TextDayStyled>
            <TextDateStyled style={{ color: TextDateColorStyled() }}>{props.item?.date}</TextDateStyled>
            <TextMonthStyled style={{ color: TextColorStyled() }}>{props.item?.month}</TextMonthStyled>
        </Container>
    )
}
export default DateUI;

const Container = styled.TouchableOpacity`
padding:10px;
borderRadius:10px;
width:80px;
borderWidth:1px;
alignItems:center;
marginRight:10px;
`;

const TextDayStyled = styled.Text`
fontSize: 14;
fontFamily:${fontFamily.medium}
`;
const TextDateStyled = styled.Text`
fontFamily:${fontFamily.medium};
fontSize: 20;
`;
const TextMonthStyled = styled.Text`
fontSize: 12;
`;