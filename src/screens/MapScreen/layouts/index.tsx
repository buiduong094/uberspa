import * as React from 'react';
import { StyleSheet, View, Platform, Dimensions, TouchableOpacity, Text } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { ImageSource } from 'assets'
import { useNavigation } from '@react-navigation/native';
import clientPermision from 'utils/clientPermission';
import { ActionCreators, reducer, InitState } from '../store';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
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
import ShopItem from 'components/ShopItem';
import ReadOnlyText from 'components/ReadOnlyText';
import { MessageType, DialogMessage } from 'models/message';
import { useFormik } from 'formik';
import BottomSheet from 'reanimated-bottom-sheet';

interface State {
  message?: DialogMessage,
  listShop?: any[],
  services?: any[],
  shopServices?: any[],
  shopChoice?: any,
  selectedService: any,
}
type UIProps = State & typeof ServiceAction;

MapboxGL.setAccessToken('pk.eyJ1Ijoic3RldmVubGVlMjgwNiIsImEiOiJja2Fqc20zNGQwZ3Z0Mndtc25meWlhcnltIn0.zcoLesCFvdoih7oTMHMIUA');
let watchID;

const Layout = (props: UIProps) => {
  const [state, dispatch] = React.useReducer(reducer, InitState);
  const [search, setSearch] = React.useState('')
  const navigation = useNavigation();
  let camera;

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: state.validationSchema,
    initialValues: { ...state.item },
    onSubmit: (values) => {
      console.log(values)
      onBooking(values)
    }
  });

  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString()
    }
    return undefined;
  }


  useEffect(() => {
    props.ShopByService();
    // ActionCreators.Loading(dispatch, state.bodySearch);
    if (Platform.OS == 'android')
      MapboxGL.setTelemetryEnabled(true);
    DeviceInfo.isLocationEnabled().then((enabled: boolean) => {
      if (!enabled) {
        alertDefaultTitle.show(MessageDefine.REQUIRE_OPEN_GPS, "Đồng ý")
        return false;
      } else {
        clientPermision.GeoLocation().then(geoPermission => {
          CurrentLocation();
        });
      }
    })
  }, [])

  useEffect(() => {
    console.log(props.message)
    if (props.message && props.message.display) {
      if (props.message.type != MessageType.Loading) {
        if (props.message.type == MessageType.Success) {
          alertDefaultTitle.show(props.message?.message ? props.message.message : 'Đặt chỗ thành công vui lòng kiếm tra trong Lịch đặt', 'OK', () => {
            let message: DialogMessage = {
              ...props.message,
              display: false,
            }
            props.FieldChange('message', message);
          });
        }
        else {
          alertDefaultTitle.show(props.message?.message ? props.message.message : 'Đặt chỗ thất bại, vui lòng liên hệ quản trị', 'OK');
        }
      }
    }
  }, [props.message])

  const CurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log([position.coords.longitude, position.coords.latitude])
        ActionCreators.ChangeLocation(dispatch, [position.coords.longitude, position.coords.latitude])
        // const geoJson: GeoLocation = {
        //   type: 'Point',
        //   coordinates: [position.coords.longitude, position.coords.latitude]
        // }

        // ActionCreators.REQUEST_ITEMS(dispatch, state)
      },
      (error) => {
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 15000 }// fix error timeout
    );
  }

  // const AnnotationContent = () => (
  // state.coordinates?.map((geo, index) => (

  //   <MapboxGL.MarkerView coordinate={geo.Geo} key={index}>
  //     <MarkerStyled onPress={() => {

  //       ActionCreators.FieldChange(dispatch, 'display', true);
  //     }}>
  //       <MarkerIcon ></MarkerIcon>
  //     </MarkerStyled>

  //   </MapboxGL.MarkerView>
  // ))

  // );
  const flyTo = (location: number[]) => {
    camera?.zoomTo(state.zoom)
    camera?.flyTo(location)
  }

  const goBack = () => {
    navigation.goBack();
  }

  const selectService = (item) => {
    props.FieldChange('bookService', item);
    let step = state.step;
    ActionCreators.ChangeStep(dispatch, step + 1);
  }

  const onBooking = (values) => {
    alertDefaultTitle.show(MessageDefine.CREATE_BOOKING, 'Đóng', () => { }, 'Đồng ý', () => {
      props.MapBooking(values.date.split('/').reverse().join('-'), values.time, state.coupon, state.description)
      console.log(values.date.split('/').reverse().join('-'), values.time, state.coupon, state.description);

    });

  }

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('window').height;
  const Filter = () => {
    const service = (item) => {
      props.ServiceByShop(item)
    }

    return (
      <Content>
        <DialogHeader>
          {
            state.step == 2 ?
              <TouchableOpacity onPress={() => {
                let step = state.step
                ActionCreators.ChangeStep(dispatch, step - 1)
              }}>
                <Icon.Back color='black' size={22} />
              </TouchableOpacity>
              : <View style={{ width: 19 }}></View>
          }
          <Title text="Địa điểm" titleStyle={{ marginBottom: 10 }}></Title>
          <TouchableOpacity onPress={() => {
            ActionCreators.FieldChange(dispatch, 'display', false)
          }}>
            <Icon.Close color='black' size={22} />
          </TouchableOpacity>
        </DialogHeader>
        {
          state.step == 1 &&
          <ScrollWrapper >
            <ContentStep>
              <Title text="Dịch vụ" titleStyle={{ marginVertical: 10 }}></Title>
              {
                props.services &&
                <ServiceWrapper horizontal>
                  {
                    props.selectedService &&
                    <View style={{ marginLeft: 20 }}>
                      <ImageButton
                        source={{ uri: props.selectedService.icon }}
                        height={60}
                        width={60}
                        title={props.selectedService.name}
                        type={ImageButtonType.TOUCHOPACITY}
                        imageStyle={{ backgroundColor: props.selectedService?.selected ? '#65DF7B25' : '#F4F5F6', borderRadius: 30, overflow: "hidden" }}
                      />
                    </View>
                  }
                </ServiceWrapper>
              }
              {
                props.listShop && props.listShop.length > 0 && props.listShop?.map((item, index) =>

                  <ShopItem
                    key={index.toString()}
                    item={item}
                    isExpand={state.isExand}
                    childs={state.isExand ? (item.id == props.shopChoice?.id ? props.shopServices : []) : []}
                    onRightPress={() => {
                      if (!state.isExand)
                        service(item)
                      ActionCreators.FieldChange(dispatch, 'expand', !state.isExand)
                    }}
                    onChildPress={selectService} />

                )
              }
            </ContentStep>
          </ScrollWrapper>
        }
        {
          state.step == 2 &&
          <ScrollWrapper>
            <ContentStep>
              <Title text="Thời gian" titleStyle={{ marginBottom: 10 }}></Title>
              <TimeWrapper>
                <TextInputUI
                  uistyle={{ width: (width - 70) / 2, }}
                  contentstyle={{ backgroundColor: '#F4F5F6' }}
                  placeholder="DD/MM/YYYY"
                  textValue={formik.values['date']}
                  onChangeText={(text) => {
                    formik.setFieldValue('date', text)
                  }}
                  errorMessage={errorMessage('date')}
                  leftIcon={<Icon.Calendar color="#C2C2C2" size={18} />}
                />
                <TextInputUI
                  textValue={formik.values['time']}
                  onChangeText={(text) => {
                    formik.setFieldValue('time', text)
                  }}
                  errorMessage={errorMessage('time')}
                  uistyle={{ width: (width - 70) / 2 }}
                  contentstyle={{ backgroundColor: '#F4F5F6' }}
                  placeholder="HH:MM"
                  leftIcon={<Icon.Clock color="#C2C2C2" size={18} />}
                />
              </TimeWrapper>
              <ReadOnlyText containerStyle={{ borderRadius: 24, height: 48 }} uistyle={{ marginTop: 15, }} text='Thanh toán tại cơ sở' title='Phương thức thanh toán' ></ReadOnlyText>

              <Title text="Ghi chú" titleStyle={{ marginVertical: 10 }}></Title>
              <TextInputUI
                placeholder="Nội dung ghi chú"
                textValue={state.description}
                type='text'
                onChangeText={(text) => {
                  ActionCreators.FieldChange(dispatch, 'description', text)
                }}
              />

              <Title text="Mã giảm giá" titleStyle={{ marginVertical: 10 }}></Title>
              <TextInputUI
                placeholder="Mã giảm giá"
                uistyle={{ flex: 1 }}
                textValue={state.coupon}
                leftIcon={<Voucher
                  source={ImageSource.voucher}
                  style={{
                    height: 10,
                    width: 13,
                  }}
                  resizeMode="cover" />}

                type="text"
                keyboardType="default"
                onChangeText={(coupon) => {
                  ActionCreators.FieldChange(dispatch, 'coupon', coupon)
                }}
              />
              <LoginButton
                uistyle={{ marginTop: 10 }}
                textstyle={{ fontSize: 18 }}
                text='ĐẶT NGAY'
                onPress={() => {
                  formik.handleSubmit()
                }}
              />
            </ContentStep>
          </ScrollWrapper>
        }
      </Content>)

  }
  const sheetRef = React.useRef(null);
  return (
    <Container>
      <MapboxGL.MapView logoEnabled={false} attributionEnabled={false}

        onPress={(feature) => flyTo(feature.geometry.coordinates)}
        style={{ flex: 1 }}
        zoomEnabled={true}
      >
        <MapboxGL.Camera
          ref={(ref) => {
            camera = ref
          }}
          zoomLevel={state.zoom}
          centerCoordinate={state.currentPossition}
        />

        {props.listShop?.map((item, index) => (
          <MapboxGL.PointAnnotation
            id={index.toString()} coordinate={[Number(item.longitude), Number(item.latitude)]}
          >

            <MapboxGL.Callout title={item.name + '\n' + item.address}
            >
            </MapboxGL.Callout>
          </MapboxGL.PointAnnotation>
        ))
        }

        <MapboxGL.UserLocation />

      </MapboxGL.MapView>
      <View style={{
        position: 'absolute',
        alignSelf: 'center',
        top: '45%'
      }}>
        <TouchableOpacity onPress={async () => {

        }}>
          <Icon.MapPin size={38} color='#FF4F4F' />

        </TouchableOpacity>
      </View>
      <ButtonLocation >
        <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'white' }}
          onPress={() => {
            CurrentLocation()
            flyTo(state.currentPossition ?? [])
          }}>
          <Icon.Mapcrosshairs size={30} color='#65DF7F' />
        </TouchableOpacity>
      </ButtonLocation>
      <BackButton onPress={goBack}>
        <Icon.Back size={27}></Icon.Back>
      </BackButton>
      <SearchContainer>
        <SearchInput
          style={{ width: Dimensions.get('screen').width * 0.75 }}
          value={search}
          onTextChange={setSearch}
        />
      </SearchContainer>
      <ButtonDashBoard>
        <TouchableOpacity
          style={{ borderRadius: 10, backgroundColor: 'white' }}
          onPress={() => {
            ActionCreators.FieldChange(dispatch, 'display', true)
          }}>
          <Icon.DashBroad size={30} color={'#65DF7F'} />
        </TouchableOpacity>
      </ButtonDashBoard>
      <TouchableOpacity
        style={{ borderRadius: 10, backgroundColor: 'white' }}
        onPress={() => {
          sheetRef?.current.snapTo(0)
        }}>
        <Icon.DashBroad size={30} color={'#65DF7F'} />
      </TouchableOpacity>
      {
        (state.step == 1 || state.step == 2) &&

        <BottomSheet
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          borderRadius={10}
          renderContent={Filter}
        />
        // <ModalUI display={state.display ?? true} height='60%'>

        //   {
        //     Filter()
        //   }

        // </ModalUI>

      }
      {/* {!state.display && <TouchableOpacity style={{}} onPress={() => {
            ActionCreators.FieldChange(dispatch, 'display', true)
          }}>
            <Icon.Close color='black' size={22} />
          </TouchableOpacity>
      } */}

    </Container>
  );
}
const mapStateToProps = (state: ApplicationState) => ({
  listShop: state.ServiceState.listShop,
  shopServices: state.ServiceState.shopServices,
  services: state.ServiceState.activeServices,
  shopChoice: state.ServiceState.shop,
  message: state.ServiceState.message,
  selectedService: state.ServiceState.selectedService
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
height:100%;
width:100%;
bottom:0;
background-color: #FFFF;
padding:15px;
borderTopStartRadius:10;
borderTopEndRadius:10;
`;
const ContentStep = styled.View`
marginBottom:50px;
`;
const ScrollWrapper = styled.ScrollView`
height:100%;
padding: 10px;
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
const ServiceWrapper = styled.ScrollView`
`;
const TimeWrapper = styled.View`
flexDirection:row;
alignItems:center;
justifyContent:space-between;
flex:1
`;

const Voucher = styled.Image`
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

const SearchContainer = styled.View`
position:absolute
paddingLeft:50;
paddingTop:35;
`
const ButtonLocation = styled.View`
zIndex: 10;
backgroundColor:transparent;
position:absolute;
bottom:10%;
right:5%;
`
const ButtonDashBoard = styled.View`
zIndex: 10;
backgroundColor:transparent;
position:absolute;
bottom:10%;
left:5%;
`
