## Backend

El enfoque elegido para este proyecto como stack AWS ha sido totalmente **serverless**:

URL: https://dev.djsigfw1uop88.amplifyapp.com/

### Arquitectura

![aws](https://i.imgur.com/7dYA5uD.png)

La API de este proyecto se sirve vía HTTP a traves de AWS API Gateway, el cual está encargado de toda la validación de los campos vía *jsonschema*:

* requeridos
* valores primitivos
* regex para el rut
* formatos (email)

> La respuesta de estos errores es de código 422 con el detalle

> El detalle de estas validaciones se encuentra en el archivo `schemas/suscriptionsCreate.json`

Cabe destacar que en el caso del rut, junto con la validación del formato en *regex* vía API Gateway también existe una validación desde el lambda encargado de recibir el POST, el cual verificará que lo recibido sea un rut valido, y lo almacena en DynamoDB sin (.) ni (-).

> De no ser valido responderá con un 422, con el detalle.

El Lambda `createSuscription` se encarga de la comunicación con DynamoDB, almacenar la data recibida y resolver con un 200 en caso de éxito. La estructura de los datos en DynamoDB cuenta con una PrimaryKey compuesta con una partition (PK) y sort key (SK), la cual para efectos de la suscripción se guarda como:

* (PK) USER#{RUT}
* (SK) USER#{FECHADECREACIÓN}

```json
{
  "createdAt": 1590418537,
  "email": "me@dorellango.cl",
  "name": "Diego Orellana",
  "phone": 949529064,
  "PK": "USER#111111111",
  "SK": "SUSCRIPTION#1590418537"
}
```

### Deployment & Debug 🚀

#### Pre-requisitos

Instalar serverless framework

`npm i -g serverless`

#### Deploy

El deploy este proyecto se realiza a través de *serverless framework*, por lo cual solo hará falta correr desde el directorio `backend` el commando:

`serverless deploy --stage dev`

> El stage por defecto el dev, pero es posible cambiarlo a prod, o producción, debug o cualquier sea el sufijo que se le quiera dar con el flag --stage.

Al correr este comando se creará toda la arquitectura vía stack de Cloudformation: DynamoDB, API Gateway y el Lambda encargado de recibir las peticiones del formulario.

#### Debug en Local

Instrucciones para correr proyecto en local.

Instalar serverless framework

`npm i -g serverless`

cd en carpeta backend

`npm install`

instalar dynamoDB local

`serverless dynamodb install`

arrancar proyecto

`npm run dev`

Esto arrancará el proyecto serverless en el puerto `:3000` y dynamodb en el `:8000`

> Una muy buena herramienta para revisar la data de DynamoDB en local es: https://github.com/Arattian/DynamoDb-GUI-Client 👏

#### debugger 🔍️

Para hacer debugging en vscode con auto attaching:

`npm run dev:debug`


## Frontend

Desarrollado en React, el frontend de nuestra aplicación se sirve a traves de Amplify, desde la rama *dev*.

Este proceso de CI/CD es automático, y solo precisa de fijar dentro del panel de Amplify la variable de entorno `REACT_APP_API_URL`, la cual corresponde a la url de API Gateway q nos otorge el deployment de nuestro backend vía Api Gateway.

![aws-amplify](https://i.imgur.com/A0QdmwR.png)

El build del proyecto se encuentra en el archivo `amplify.yml`