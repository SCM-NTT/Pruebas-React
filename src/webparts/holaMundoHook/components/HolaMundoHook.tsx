import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './HolaMundoHook.module.scss';
import type { IHolaMundoHookProps } from './IHolaMundoHookProps';
//librerías de API Graph
  
//import {MSGraphClientV3} from '@microsoft/sp-http';
//import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

//link para permisos:"https://learn.microsoft.com/en-us/graph/permissions-reference",

//import { forEach, values } from 'lodash';
//import { escape } from '@microsoft/sp-lodash-subset';




const useHolaMundoHook : React.FC<IHolaMundoHookProps> =({userDisplayName,graphClient}) => {

  const [userEmail, setUserEmail] = useState<string>('');
  const [userJob, setUserJob]=useState<string>('');
  const [error, setError]= useState<string|null>(null);
  const [count,setCount]= useState(0);
  //const [Visible] = useState<boolean>(false);
  
  const increment= (): void => setCount(prev => prev+1);
  const decrement= (): void => setCount(prev => prev-1);
  const zero =(): void => setCount(0);

  //const Cargar=()=> ((Visible: boolean)=>!Visible);



  useEffect(()=>{
    if(count%10 ===0){
      console.log('El valor es: ',count);
    }
  }, [count]);

  
  useEffect(()=>{
    const fetchUser=async ():Promise<void>=>{
      try{
        const clienteGraphApi= await graphClient;
        const response= await clienteGraphApi.api("/me").get();
        setUserEmail(response.mail);
        setUserJob(response.jobTitle);
      }
      catch(error){
        setError(error);
      }
    };
    fetchUser().catch((error)=>
      {
        console.log(error);
      }
    );
    
  }, []);

  
  //if (error) return <div>{error}</div>
  
  const imprimir= (): JSX.Element=>(
    <div className={styles.container}>
      <h1>Hola Mundo para {userDisplayName}</h1>
      <b/>
      <p>Has pulsado el botón {count} veces.</p>
      <button className={styles.button} onClick={decrement}>-</button>
      <button className={styles.button} onClick={zero}>Reset</button>
      <button className={styles.button} onClick={increment}>+</button>
    </div>
  )

  const imprimir2=(): JSX.Element=>(
    <div className={styles.container}>
      <h1>{userDisplayName} ha probado el webhook</h1>
      <b/>
      <p>Has pulsado el botón {count} veces.</p>
      <button className={styles.button} onClick={decrement}>-</button>
      <button className={styles.button} onClick={zero}>Reset</button>
      <button className={styles.button} onClick={increment}>+</button>
      <p>Correo electrónico: {userEmail}</p>
      <p>Puesto de trabajo: {userJob}</p>
      <p>{error}</p>
    </div>
  );
  
  if(count!==0){
    return imprimir2();
  }

  else{
    return imprimir();
  }

}
  
export default useHolaMundoHook;

