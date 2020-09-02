import { UberService } from "models/uberservice";

export interface IState{
  slides?: string[],
  nearByservices: UberService[],
  searchName?: string,

}
export const InitState : IState = {
  slides:[],
  nearByservices:[]
}