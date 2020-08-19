import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import { StyleSheet } from 'react-native'
import { TagItem } from 'models/tag';
import { fontFamily } from 'utils/Theme';

export interface UIProps {
    style?: any,
    item?: TagItem,
    onPress?: Function,
}

const Tag = (props: UIProps) => {
    return (
        <Container style={props.style}>
            <ContentWrapper
                style={props.item?.selected ? styles.active : styles.inactive}
                onPress={() => {
                    if (props.onPress) {
                        const selectItem = {
                            ...props.item,
                            selected: !props.item?.selected
                        }
                        props.onPress(selectItem);
                    }
                }}>
                <TextStyled style={props.item?.selected ? styles.activeText : styles.inactiveText}>{props.item?.label}</TextStyled>
            </ContentWrapper>


        </Container>

    )

}
export default Tag;

const styles = StyleSheet.create(
    {
        active: {
            backgroundColor: '#D8F7DE',
            borderColor: '#65DF7B',
            borderWidth: 1
        },
        inactive: {
            backgroundColor: '#F4F5F6',
            borderColor: '#D8D8D8',
            borderWidth: 1
        },
        activeText:
        {
            fontSize: 14,
            fontFamily: fontFamily.regular,
            color:'#65DF7B'
        },
        inactiveText: {
            fontSize: 14,
            fontFamily: fontFamily.regular,
            color:'#4A4A4A'
        }
    });

const Container = styled.View`
    flex:1;
`;
const ContentWrapper = styled.TouchableOpacity`
   
    border-radius: 30;
    background-color: #3CAA6D;
    justify-content: center;
    align-items:center;
    align-content:center;
    height: 40;
`;


const TextStyled = styled.Text`
    color: #778CA2;
    paddingVertical:10px;
    fontSize: 14;
`;
