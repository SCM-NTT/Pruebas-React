import * as React from 'react';
import { useEffect } from 'react';
//import styles from './HolaMundoHook.module.scss';
import type { IHolaMundoHookProps } from './IHolaMundoHookProps';
//import { escape } from '@microsoft/sp-lodash-subset';


const useHolaMundoHook : React.FC<IHolaMundoHookProps> =({userDisplayName}) => {
  
  useEffect(()=>{console.log('Componente montado por:',userDisplayName);}, [userDisplayName]);
  


  return <h1>Hola Mundo por {userDisplayName}</h1>;
}
  
export default useHolaMundoHook;

