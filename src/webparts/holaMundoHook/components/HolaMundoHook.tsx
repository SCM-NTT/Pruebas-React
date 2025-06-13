import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './HolaMundoHook.module.scss';
import type { IHolaMundoHookProps } from './IHolaMundoHookProps';
//import { escape } from '@microsoft/sp-lodash-subset';


const useHolaMundoHook : React.FC<IHolaMundoHookProps> =({userDisplayName}) => {

  const [count,setCount]= useState(0);
  
  const increment= ()=> setCount(prev => prev+1);
  const decrement= ()=> setCount(prev => prev-1);
  const zero =() => setCount(0);


  useEffect(()=>{
    if(count%10 ===0){
      console.log('El botón ha sido pulsado , ahora vale',count);
    }
  }, [count]);

  return(
    <div className={styles.container}>
      <h1>Hola Mundo para {userDisplayName}</h1>
      <b></b>
      <p>Has pulsado el botón {count} veces.</p>
      <button className={styles.button} onClick={increment}>+</button>
      <button className={styles.button} onClick={zero}>reset</button>
      <button className={styles.button} onClick={decrement}>-</button>
    </div>
  );
}
  
export default useHolaMundoHook;

