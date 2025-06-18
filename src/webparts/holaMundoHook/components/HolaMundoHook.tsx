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

  //Declaramos los hooks [variable, seteador de variable] = tipo de variable y valor por defecto
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userJob, setUserJob]=useState<string>('');
  const [error, setError]= useState<string|null>(null);
  const [count,setCount]= useState(0);
  
  //declaramos funciones (<argumento de función>): tipo de retorno => que hace la función 
  const increment= (): void => setCount(prev => prev+1);
  const decrement= (): void => setCount(prev => prev-1);
  const zero =(): void => setCount(0);
  
  //const [Visible] = useState<boolean>(false);
  //const Cargar=()=> ((Visible: boolean)=>!Visible);


  /*Declaramos useEffect que hace cambio dinámico en base a variables ((<argumentos>)=>{lógica}, [<variables a vigilar>])
  si no se pone variable a vigilar se aplica solo en la carga de página*/
  useEffect(()=>{
    if(count%10 ===0){
      console.log('El valor es: ',count);
    }
  }, [count]);


  //Se puede tener más de un useEffect  
  useEffect(()=>{
    //creamos la función e indicamos que el tipo de retorno es Promise<void>
    const fetchUser=async ():Promise<void>=>{
      try{
        //conseguimos el cliente de GraphAPI
        const clienteGraphApi= await graphClient;

        //mandamos la petición
        const response= await clienteGraphApi.api("/me").get();
        
        //Seteamos los valores que despues usaremos (se guardan en la variabla asociada a la función)
        setUserEmail(response.mail);
        setUserJob(response.jobTitle);
        setUserName(response.displayName);
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

  
  if (error) return <div>{error}</div>
  
  const imprimir= (): JSX.Element=>(
    <div className={styles.container}>
      <h1>Hola Mundo para {userDisplayName}</h1>
      <b/>
      <p>El valor es: &apos;{count}&apos; cambialo con los botones de debajo.</p>
      <button className={styles.button} onClick={decrement}>-</button>
      <button className={styles.button} onClick={increment}>+</button>
    </div>
  )

  const imprimir2=(): JSX.Element=>(
    <div className={styles.container}>
      <h1>{userDisplayName} ha probado el webhook</h1>
      <b/>
      {count>0 && <p>El valor ahora es positivo: {count}.</p>}
      {count<0 && <p>El valor ahora es negativo: {count}.</p>}
      {count===0 && <p>¿Qué se supone que haces aquí?: {count}.</p>}

      <button className={styles.button} onClick={decrement}>-</button>
      <button className={styles.button} onClick={zero}>Reset</button>
      <button className={styles.button} onClick={increment}>+</button>
      
      {userName && <p>Nombre: {userName}</p>}
      {userEmail && <p>Correo electrónico: {userEmail}</p>}
      {userJob && <p>Puesto de trabajo: {userJob}</p>}
      {error && <p>{error}</p>}

    </div>
  );
  
  if(count!==0){
    return imprimir2();
  }

  else{
    return imprimir();
  }

}
//exportamos por defecto para que el componente pueda ser llamado en el proyecto (importando este archivo)
export default useHolaMundoHook;

