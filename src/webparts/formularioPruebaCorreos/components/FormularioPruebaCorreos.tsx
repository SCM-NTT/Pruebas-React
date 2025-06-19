import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './FormularioPruebaCorreos.module.scss';
import type { IFormularioPruebaCorreosProps } from './IFormularioPruebaCorreosProps';
//import { escape } from '@microsoft/sp-lodash-subset';

const useFormularioPruebaCorreos: React.FC<IFormularioPruebaCorreosProps> = ({ graphClient }) => {
  //variables
  const [userMail, setUserMail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [asunto, setAsunto] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [ok, setOk] = useState<boolean>(false);
  const [enviar, setEnviar] = useState<boolean>(false);

  const mandarCorreo = () :void => setEnviar(true);

  //conseguimos cliente de graph api
  useEffect(() => {

    const fetchUser = async (): Promise<void> => {
      try {
        //Pedimoss el cliente de GraphAPI
        const clienteGraphApi = await graphClient;

        //mandamos la petición /me para conseguir nombre y correo del usuario
        const response = await clienteGraphApi.api("/me").get();

        //Seteamos los valores que despues usaremos (se guardan en la variabla asociada a la función)
        setUserName(response.displayName);
      }
      catch (error) {
        setError(error || "Error al conseguir graph api");
      }
    };
    fetchUser().catch((error) => {
      console.log(error);
    }
    );

  }, []);

  //vigilamos enviar para mandar el correo 
  useEffect(() :void=> {
    const sendMail = async ({ to, subject, body }: { to: string; subject: string; body: string }):Promise<void> => {
      //generamos la estructura del mensaje
      const mail = {
        message: {
          subject,
          body: {
            contentType: 'Text',
            content: body,
          },
          toRecipients: [
            {
              emailAddress: {
                address: to,
              },
            },
          ],
        },
        saveToSentItems: 'true',
      };
      try {
        if(!userMail){
          throw new Error("E-Mail vacío");
        }
        //comprobamos que contenga todos los campos
        if (!asunto) {
          throw new Error("asunto vacío");
        }
        if (!message) {
          throw new Error("mensaje vacío");
        }
        //Si todo está bien entonces mandamos
        if (enviar && asunto && message) {
          const clienteGraphApi = await graphClient;
          await clienteGraphApi.api('/me/sendMail').post(mail);
          setOk(true);
        }
      }
      catch (error) {
        setError(error.message || "error desconocido al enviar el correo");
        setOk(false);
      }
      finally {
        setEnviar(false);
      }
    };

    if (enviar) {
      sendMail({
        to: userMail,
        subject: asunto,
        body: message
      }).catch((e)=>setError(e.target.values || "error desconocido al mandar el mail"));
    }

  }, [enviar]
  );


  // imprimible del componente
  return (
    <div>
      <h1>Bienvenido {userName}</h1>
      <br/>
      <label>E-Mail:</label>
      <input
        type='Text'
        className={styles.text}
        placeholder='A quien se envía el correo'
        value={userMail}
        onChange={(e) => setUserMail(e.target.value)}
        id='email'
      />
      <br/>
      <label>Asunto:</label>
      <input
        className={styles.text}
        type='Text'
        placeholder='Introduce el asunto de tu mensaje'
        value={asunto}
        onChange={(e) => setAsunto(e.target.value)}
        id='asunto'
      />
      <br/>
      <label>Mensaje:</label>
      <br/>
      <textarea
        className={styles.areaText}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje aquí..."
        required
        wrap='soft'
      />

      {ok && <p>El correo se ha enviado satisfactoriamente</p>}
      {error && <p>El correo no se pudo mandar debido a {error}</p>}
      <br/>
      <button className={styles.button} onClick={mandarCorreo}>Enviar</button>
    </div>

  );

}

export default useFormularioPruebaCorreos;
