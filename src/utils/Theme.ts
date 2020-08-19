
export enum ThemeStyle {
    LIGHT = 'LIGHT',
    DARKK = 'DARK'
}
export interface colorsType {
    white?: string,
    black?: string,
    iron?: string,
    green?: string,
    blue?: string,
};
export interface fontFamilyType {
    medium?: string,
    regular?: string,
    bold?: string,
    semibold?: string,
    italic?: string,
    mediumItalic?: string
};
export const fontFamily: fontFamilyType = {
    medium: 'SFProDisplay-Medium',
    regular: 'SFProDisplay-Regular',
    bold: 'SFProDisplay-Semibold',
    semibold: 'SFProDisplay-Regular',
    mediumItalic:'SFProDisplay-Medium'
    // medium: 'SFCompactText-Medium',
    // regular: 'SFCompactText-Regular',
    // bold: 'SFCompact-Text-Bold',
    // semibold: 'SFCompactText-Semibold',
    // mediumItalic: 'SFCompactText-MediumItalic'
};
export interface fontSizeType {
    default?: number,
}

export interface ITheme {

    background?: string,
    colors?: colorsType,
    fontFamily?: fontFamilyType,
    fontSize?: fontSizeType

}
type ThemeType = { [key in ThemeStyle]: ITheme };
export const Theme: ThemeType = {
    LIGHT: {

    },
    DARK: {

    }

}