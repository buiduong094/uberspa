import React, { Component } from 'react';

import styled from 'styled-components/native';

import { convertHeight, convertWidth } from 'utils/convertSize';
import { colors } from 'utils/Theme';

const TextStyled = styled.Text`
font-family:la-solid-900;
font-size: ${convertWidth(18)}`;

export interface IconUIProps {
    color?: any,
    size?: number
}

export const AddCircle = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled>&#xf055;</TextStyled>)
}
export const Add = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: 25 }}>&#xf055;</TextStyled>)

}
export const Search = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: 25 }}>&#xf002;</TextStyled>)

}
export const Back = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size ? size : 22 }} >&#xf30a;</TextStyled>)

}
export const Home = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf015;</TextStyled>)
}
export const Notification = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf0f3;</TextStyled>)
}
export const Setting = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white' }}>&#xf007;</TextStyled>)
}
export const Address = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf041;</TextStyled>)

}
export const Voice = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf130;</TextStyled>)
}
export const Camera = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf030;</TextStyled>)

}
export const Play = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf04b;</TextStyled>)

}
export const Pause = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf04c;</TextStyled>)

}

export const Eye = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#98A9BC', fontSize: size }}>&#xf06e;</TextStyled>)

}
export const EyeSlash = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#98A9BC', fontSize: size }}>&#xf070;</TextStyled>)

}
export const ArrowRight = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf105;</TextStyled>)

}
export const ArrowDown = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }}>&#xf107;</TextStyled>)

}
export const ArrowDoubleRight = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf101;</TextStyled>)

}
export const Tick = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#3FAD6E', fontSize: size }} >&#xf058;</TextStyled>)

}
export const Remove = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf00d;</TextStyled>)
}
export const Pencil = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf303;</TextStyled>)

}
export const Signal = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#778CA2', fontSize: size }} >&#xf012;</TextStyled>)

}
export const Send = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf1d8;</TextStyled>)

}
export const Clear = (props: IconUIProps) => {

    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#314559', fontSize: size }} >&#xf00d;</TextStyled>)
}

export const NextStep = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf101;</TextStyled>)
}

export const Notifi = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : 'white', fontSize: size }} >&#xf0a1;</TextStyled>)
}
export const Folder = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf15c;</TextStyled>)
}
export const Edit = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf044;</TextStyled>)
}
export const Trash = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >  &#xf2ed;</TextStyled>)

}
export const Date = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >   &#xf133;</TextStyled>)

}
export const UserIcon = (props: IconUIProps) => {
    const { color, size } = props;
    return (<TextStyled style={{ color: color ? color : '#31383F', fontSize: size }} >&#xf007;</TextStyled>)
}
