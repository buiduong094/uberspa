
export interface RelayParty {

    relyingParty?: string;
    relyingPartyBillCode?:string,
    rememberMe?: boolean,
    lang?: string,
    language?:string,
    clientUUID?:string


}
export interface RelayPartyDetail extends RelayParty{
    relyingPartyBillCode?:string,
    thumbprint?:string,
    certificates?:string,
    certificateInfo?:boolean,
    authenticationInfo?: boolean,
    lang?: string,
    language?:string
}
export interface PassPhaseCert{
    thumbprint:string;
    oldPassphrase?:string;
    newPassphrase?: string;
    relyingPartyBillCode?: string;
    lang?: string;
    language?:string
}
