import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { TagItem } from 'models/tag';
import { fontFamily } from 'utils/Theme';
interface UIProps {
    onTabItemSelected?: Function,
    sources: Array<TagItem>
}

const TabList = (props: UIProps) => {
    //    const [tabItems, setTabItems] = useState(props.sources);
    const onItemSelected = (item: any, index: number) => {
        if (props.onTabItemSelected) {
            props.onTabItemSelected(item, index)
        }
    }
    return (
        <Container  >
            <WrapperScroll horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <WrapperView>
                    {
                        props.sources.map((item, index) => (
                            <TabItem style={item.selected ? styles.tabActive : styles.tabInActive} key={index} onPress={() => {
                                item.selected = !item.selected;
                                onItemSelected(item, index);
                            }}>
                                <TabItemText style={item.selected ? styles.textActive : styles.textInactive} >{item.label}</TabItemText>
                            </TabItem>
                        ))
                    }
                </WrapperView>
            </WrapperScroll>
        </Container>
    )
}
export default TabList;
const styles = StyleSheet.create(
    {
        textActive: {
            color: '#65DF7B',
            fontSize: 16,
            fontFamily: fontFamily.medium
        },
        textInactive: {
            color: '#778CA2',
            fontSize: 16,
            fontFamily: fontFamily.medium
        },
        tabActive: {

            borderBottomWidth: 2,
            borderColor: '#65DF7B'

        },
        tabInActive: {

        }
    }
)
const Container = styled.View`
   height:50px;
  `;
const WrapperScroll = styled.ScrollView`
flex:1;
`;
const WrapperView = styled.View`
justifyContent:space-between;
flexDirection:row;
width:${Dimensions.get('screen').width}
flex:1;
`;
const TabItem = styled.TouchableOpacity`
padding:10px;
alignItems:center;
justifyContent:center;
flex:1;
`;
const TabItemText = styled.Text`
color:#65DF7B;
fontSize: 16;
`;