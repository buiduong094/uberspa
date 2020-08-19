export interface UberService
{
    logo:string,
    name:string,
    description?: string,
    price?: string

}

export interface IState{
  services: UberService[]
}
export const InitState : IState = {

  services:[
      {
          logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
          name:'Gói 1 - Làm đẹp toàn diện',
          description: 'Gồm 6 dịch vụ',
          price: "2.500.000 đ"
      },
      {
        logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
        name:'Gói 2 - Làm đẹp toàn diện',
        description: 'Gồm 12 dịch vụ',
        price: "2.500.000 đ"
    },
    {
        logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
        name:'Tuỳ chọn',
    }
  ]
}