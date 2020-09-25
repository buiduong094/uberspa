import React, { Component } from 'react';

import styled from 'styled-components/native';

import { convertWidth } from 'utils/convertSize';
const TextStyled = styled.Text`
color:#3CAA6D;
font-family:la-solid-900;
font-size: ${convertWidth(18)}`;

export interface UIProps {
    color?: any,
    size?: number
}
export const UserFriends = (props:UIProps) => {
    return (<TextStyled style={{ color: props.color ? props.color : '#3CAA6D' }}>
        &#xf500;
    </TextStyled>)
}
export const User = (props: UIProps) =>{
   
    return (<TextStyled style={{ color: props.color ? props.color : '#31383F' } }>&#xf007;</TextStyled>)
}

export const UserShield = (props: UIProps) =>{
   
    return (<TextStyled style={{ color: props.color ? props.color : '#31383F' } }>&#xf505;</TextStyled>)
}
export const UserAstronout = (props: UIProps) =>{

    return (<TextStyled style={{ color: props.color ? props.color : '#31383F' } }>&#xf4fb;</TextStyled>)
}
export const UserPlus = (props: UIProps)=>{
  
    return (<TextStyled style={{ color: props.color ? props.color : '#31383F' } }>  &#xf234;</TextStyled>)
}
export const StreetView = (props: UIProps) =>{

    return (<TextStyled style={{ color: props.color ? props.color : '#31383F' } }>&#xf21d;</TextStyled>)
}
export const AddCircle = (props: UIProps) => {
  
    return (<TextStyled style={{ color: props.color ? props.color : '#31383F' }} >&#xf055;</TextStyled>)
}
export const Add = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: 25 }}>&#xf055;</TextStyled>)

}
export const Search = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: 25 }}>&#xf002;</TextStyled>)

}
export const Back = (props: UIProps) => {
    const { color, size, } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 22 }} >&#xf30a;</TextStyled>)

}
export const Map  = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 22 }} >&#xf279;</TextStyled>)
}
export const ViewMode  = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 22 }} >&#xf039;</TextStyled>)
}
export const Home = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf015;</TextStyled>)
}
export const Notification = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf0f3;</TextStyled>)
}
export const Messenger = (props: UIProps)=>{
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf4ad;</TextStyled>)
}
export const Calendar = (props: UIProps)=>{
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}> &#xf133;</TextStyled>)
}
export const Setting = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf013;</TextStyled>)
}
export const Address = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf041;</TextStyled>)

}
export const Voice = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf130;</TextStyled>)
}
export const Camera = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf030;</TextStyled>)

}
export const Play = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf04b;</TextStyled>)

}
export const Pause = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf04c;</TextStyled>)

}

export const Eye = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#98A9BC', fontSize: size }}>&#xf06e;</TextStyled>)

}
export const EyeSlash = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#98A9BC', fontSize: size }}>&#xf070;</TextStyled>)

}
export const ArrowRight = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf105;</TextStyled>)

}
export const ArrowDown = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf107;</TextStyled>)
}
export const ArrowUp = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf106;</TextStyled>)
}
export const ArrowDoubleRight = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf101;</TextStyled>)

}
export const Tick = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#3FAD6E', fontSize: size }} >&#xf058;</TextStyled>)

}
export const Remove = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf00d;</TextStyled>)
}
export const Pencil = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf303;</TextStyled>)

}
export const Signal = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#778CA2', fontSize: size }} >&#xf012;</TextStyled>)

}
export const Send = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf1d8;</TextStyled>)

}
export const Clear = (props: UIProps) => {

    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#314559', fontSize: size }} >&#xf00d;</TextStyled>)
}

export const NextStep = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf101;</TextStyled>)
}

export const Notifi = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf0a1;</TextStyled>)
}
export const Folder = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf15c;</TextStyled>)
}
export const Edit = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf044;</TextStyled>)
}
export const Trash = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf2ed;</TextStyled>)

}
export const Date = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf133;</TextStyled>)

}
export const Activity = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F' }} >  &#xf017;</TextStyled>)
}
export const Clock = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F' }} >  &#xf017;</TextStyled>)
}
export const BookOpen = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F' }} >  &#xf518;</TextStyled>)
}
export const LightFlash = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 22 }} >&#xf0e7;</TextStyled>)
}
export const CreditCard = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 22 }} >&#xf09d;</TextStyled>)
}

export const Checked = (props: UIProps)=>{
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 14,fontWeight:'bold' }} >&#xf00c;</TextStyled>)
}
export const Close = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf00d;</TextStyled>)
}
export const MapMaker = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf041;</TextStyled>)
}
export const Star = (props:UIProps) =>{
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf005;</TextStyled>)
 
}
export const Phone = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf10b;</TextStyled>)
}
export const Location = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf124;</TextStyled>)
}
export const Birthday = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf1fd;</TextStyled>)
}
export const Gender = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf225;</TextStyled>)
}
export const Code = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf02a;</TextStyled>)
}
export const Establish = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf1de;</TextStyled>)
}
export const Sun = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf185;</TextStyled>)
}
export const Rule = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf044;</TextStyled>)
}
export const Friend = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf234;</TextStyled>)
}
export const Logout = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf011;</TextStyled>)
}
export const Lock = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf023;</TextStyled>)
}
export const Email = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf0e0;</TextStyled>)
}
export const Plus = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf067;</TextStyled>)
}
export const Image = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf03e;</TextStyled>)
}
export const Video = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf1c8;</TextStyled>)
}
export const File = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf15b;</TextStyled>)
}
export const Recorder = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 14 }} >&#xf03d;</TextStyled>)

}
export const MapPin = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 14 }} >&#xf276;</TextStyled>)

}
export const Mapcrosshairs = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 14 }} >&#xf05b;</TextStyled>)

}
export const DashBroad = (props: UIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 14 }} >&#xf550;</TextStyled>)

}