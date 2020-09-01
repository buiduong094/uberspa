import * as React from 'react';
import { StyleSheet, View, Platform, Dimensions } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { ImageSource } from 'assets'
import { useNavigation } from '@react-navigation/native';
import clientPermision from 'utils/clientPermission';
import { ActionCreators, reducer, InitState } from '../store';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from "react-native-device-info";
import * as Icon from 'constant/icons';
import { SearchInput, ImageButton, UberItem, LoginButton, ModalUI } from 'components';
import Title from 'components/Title';
import { ImageButtonType, UberItemType } from 'constant';
import TextInputUI from 'components/TextInputUI';
import { fontFamily } from 'utils/Theme';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { MessageDefine } from 'locales';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ServiceAction } from 'store/service';

interface State {

}
type UIProps = State & typeof ServiceAction;

MapboxGL.setAccessToken('pk.eyJ1Ijoic3RldmVubGVlMjgwNiIsImEiOiJja2Fqc20zNGQwZ3Z0Mndtc25meWlhcnltIn0.zcoLesCFvdoih7oTMHMIUA');
let watchID;

const Layout = (props: UIProps) => {
  const [state, dispatch] = React.useReducer(reducer, InitState)
  const navigation = useNavigation();
  useEffect(() => {
    ActionCreators.Loading(dispatch, state.bodySearch);
    if (Platform.OS == 'android')
      MapboxGL.setTelemetryEnabled(true);
    DeviceInfo.isLocationEnabled().then((enabled: boolean) => {
      if (!enabled) {
        alertDefaultTitle.show(MessageDefine.REQUIRE_OPEN_GPS, "Đồng ý")
        return false;
      } else {
        clientPermision.GeoLocation().then(geoPermission => {

        });
      }
    })
    // CurrentLocation();

  }, [])

  // const CurrentLocation = async () => {

  //   Geolocation.getCurrentPosition(

  //     (position) => {
  //       const geoJson: GeoLocation = {
  //         type: 'Point',
  //         coordinates: [position.coords.longitude, position.coords.latitude]
  //       }

  //       ActionCreators.REQUEST_ITEMS(dispatch, state)
  //     },
  //     (error) => {

  //     },
  //     { enableHighAccuracy: false, timeout: 15000, }
  //   );

  // }
  // const AnnotationContent = () => (
  //   state.coordinates?.map((geo, index) => (

  //     <MapboxGL.MarkerView coordinate={geo.Geo} key={index}>
  //       <MarkerStyled onPress={() => {

  //         ActionCreators.FieldChange(dispatch, 'display', true);
  //       }}>
  //         <MarkerIcon ></MarkerIcon>
  //       </MarkerStyled>

  //     </MapboxGL.MarkerView>
  //   ))

  // );

  const goBack = () => {
    navigation.goBack();
  }

  const selectService = () => {
    let step = state.step;
    ActionCreators.ChangeStep(dispatch, step + 1);
  }

  const onBooking = () => {
    alertDefaultTitle.show(MessageDefine.CREATE_BOOKING, 'Đóng', () => { }, 'Đồng ý', () => {
      let step = state.step;
      ActionCreators.ChangeStep(dispatch, step + 1);
      ActionCreators.FieldChange(dispatch, 'loadingConfirm', true);
      setTimeout(() => {
        ActionCreators.FieldChange(dispatch, 'loadingConfirm', false);
        ActionCreators.ChangeStep(dispatch, 1);
      }, 2000);
    });

  }

  const width = Dimensions.get('screen').width;
  const Filter = () => {

    return (
    <Content>

      {
        state.step == 1 &&
        <ContentStep>
          <DialogHeader>
            <Title text="Địa điểm" titleStyle={{ marginBottom: 10 }}></Title>

            <Icon.Close color='black' size={22}/>
          </DialogHeader>
          <SearchInput
            placeHolder=""
            icon={<Icon.Address size={20} color='#C2C2C2' />}
          ></SearchInput>
          <Title text="Dịch vụ" titleStyle={{ marginVertical: 10 }}></Title>
          <ScrollWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {
              state.services &&
              <ServiceWrapper>
                {
                  state.services && state.services.map((service: any, index: number) => (
                    <ImageButton
                      source={service.source}
                      height={20}
                      width={20}
                      title={service.title}
                      type={ImageButtonType.TOUCHOPACITY}
                      imageStyle={{ backgroundColor: service?.selected ? '#65DF7B20' : '#F4F5F6', padding: 15, borderRadius: 30 }}
                    ></ImageButton>
                  ))
                }
              </ServiceWrapper>
            }
            {
              state.bookingItems?.length > 0 && state.bookingItems?.map((item) =>
                <UberItem
                  uistyle={{ marginBottom: 15 }}
                  item={item}
                  type={UberItemType.BOOKINGSERVICE}
                  childs={item?.childs}
                  onChildPress={selectService} />
              )
            }
          </ScrollWrapper>
        </ContentStep>
      }
      {
        state.step == 2 &&
        <ScrollWrapper>
          <Title text="Thời gian" titleStyle={{ marginBottom: 10 }}></Title>
          <TimeWrapper>
            <TextInputUI
              uistyle={{ width: (width - 70) / 2, }}
              contentstyle={{ backgroundColor: '#F4F5F6' }}
              placeholder="DD/MM/YYYY"
              leftIcon={<Icon.Calendar color="#C2C2C2" size={18} />}
            />
            <TextInputUI
              uistyle={{ width: (width - 70) / 2 }}
              contentstyle={{ backgroundColor: '#F4F5F6' }}
              placeholder="HH:MM"
              leftIcon={<Icon.Clock color="#C2C2C2" size={18} />}
            />
          </TimeWrapper>
          <Title text="Phương thức thanh toán" titleStyle={{ marginVertical: 10 }}></Title>
          <TextInputUI
            placeholder="Hình thức thanh toán"
            contentstyle={{ backgroundColor: '#F4F5F6' }}
            leftIcon={<Icon.CreditCard color="#C2C2C2" size={18} />}
          />
          <Title text="Ghi chú" titleStyle={{ marginVertical: 10 }}></Title>
          <TextInputUI
            placeholder="Nội dung ghi chú"
            contentstyle={{ backgroundColor: '#F4F5F6' }}
          />
          <BookingWrapper>
            <VoucherWrapper>
              <VoucherBorder>
                <Voucher
                  source={ImageSource.voucher}
                  style={{
                    height: 10,
                    width: 13,
                  }}
                  resizeMode="cover" />
              </VoucherBorder>
              <VoucherCode>DHABSD</VoucherCode>
            </VoucherWrapper>
            <LoginButton
              uistyle={{ alignSelf: 'center', width: '60%' }}
              textstyle={{ fontSize: 18 }}
              text='ĐẶT NGAY'
              onPress={onBooking}></LoginButton>
          </BookingWrapper>
        </ScrollWrapper>
      }
    </Content>)

  }
  return (
    <Container>
      <MapboxGL.MapView logoEnabled={false} attributionEnabled={false}
        style={{ flex: 1 }}
        zoomEnabled={true}
      >
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={[106.648339, 10.749894]}
        />
      </MapboxGL.MapView>
      <BackButton onPress={goBack}>
        <Icon.Back size={27}></Icon.Back>
      </BackButton>

        {
          (state.step == 1 || state.step == 2) &&
          <ModalUI display={state.display?? true}>
            {
              Filter()
            }
          </ModalUI>
        }
      {
        state.step == 3 && state.loadingConfirm &&
        <ConfirmWrapper>
          <BorderConfirmLarge>
            <BorderConfirmSmall>
              <Avatar source={ImageSource.nail} resizeMode="cover" />
            </BorderConfirmSmall>
          </BorderConfirmLarge>
          <WaitingStyled>Đang chờ xác nhận từ thẩm mỹ viện.</WaitingStyled>
          <WaitingStyled>Vui lòng đợi.</WaitingStyled>
        </ConfirmWrapper>
      }
    </Container>
  );
}
const mapStateToProps = (state: ApplicationState) => ({
  
})

const mapDispatchToProps = {
  ...ServiceAction
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect)(Layout as any)
const Container = styled.View`
  flex: 1;
  width:100%;
  background-color: #F6FBFB;
  height:100%;
`;
const Content = styled.View`

width:100%;
bottom:0;
background-color: #FFFF;
padding:15px;
borderRadius:10;
`;
const ContentStep = styled.View``;
const ScrollWrapper = styled.ScrollView`

`;
const DialogHeader = styled.View`
flexDirection:row;
justifyContent:space-between;
borderBottomWidth:1px;
borderColor:#D8D8D8;
paddingBottom:10px;
marginBottom:10px;
`;
const BackButton = styled.TouchableOpacity`
position: absolute;
padding:42px 15px 20px 15px;
`;
const ServiceWrapper = styled.View`
flexDirection:row;
alignItems:center;
justifyContent:space-between;
`;
const TimeWrapper = styled.View`
flexDirection:row;
alignItems:center;
justifyContent:space-between;
flex:1
`;
const BookingWrapper = styled.View`
flexDirection:row;
alignItems:center;
justifyContent:space-between;
marginTop:10;
`;
const VoucherWrapper = styled.View`
flexDirection:row;
alignItems:center;
`
const VoucherBorder = styled.View`
backgroundColor: #65DF7B20;
paddingVertical:10;
paddingHorizontal:10;
borderRadius:20;
alignItems:center;
justifyContent:center;
`;
const Voucher = styled.Image`
`;
const VoucherCode = styled.Text`
color:#65DF7B;
fontSize:14;
fontFamily: ${fontFamily.semibold};
marginLeft:5;
`;

const ConfirmWrapper = styled.View`
position: absolute;
top:0;
right:0;
bottom:0;
left:0;
backgroundColor:#65DF7B;
width:100%;
height:100%;
alignItems:center;
justifyContent:center;
`;
const BorderConfirmLarge = styled.View`
borderWidth: 1;
borderStyle:dotted;
borderColor: #FFFF;
width: ${Dimensions.get('screen').width - 120};
height: ${Dimensions.get('screen').width - 120};
borderRadius: ${Dimensions.get('screen').width - 120};
paddingHorizontal:35;
paddingVertical:35;
marginBottom:30;
`;
const BorderConfirmSmall = styled.View`
borderWidth: 1;
borderStyle:dotted;
borderColor: #FFFF;
width: ${Dimensions.get('screen').width - 190};
height: ${Dimensions.get('screen').width - 190};
borderRadius: ${Dimensions.get('screen').width - 190};
alignItems:center;
justifyContent:center;
`;
const Avatar = styled.Image`
width: 80;
height: 80;
borderRadius: 40;
`;
const WaitingStyled = styled.Text`
textAlign:center;
color:#FFFF;
fontSize:18;
fontFamily: ${fontFamily.medium}
`;