# Proyecto API
## Crear la base de datos.
La base de datos utilizada es MySQL.
1. En una terminal ejecutar el siguiente comando:
```
mysql -u USER -pPASSWORD
```
Rellenar USER y PASSWORD con sus propios datos correspondientes a sus credenciales de acceso a la base de datos.

2. Abrir el archivo *database.sql* e ir copiando las líneas de código ahí escritas y ejecutando cada una de las líneas.

## Conectar la base de datos.
1. Renombrar el archivo *.env.example* por *.env*
2. Escribir el valor de las variables con los datos correspondientes a su propia base de datos.
- HOST=(HOST DE LA BASE DE DATOS)
- USER=(USUARIO DE LA BASE DE DATOS)
- PASSWORD=(CONTRASEÑA DE LA BASE DE DATOS)
- PORT=(PUERTO DE LA BASE DE DATOS)
- DATABASE_NAME=(NOMBRE DE LA BASE DE DATOS)

## Desplegar el proyecto en localhost.
1. Abrir una terminal en la raíz del proyecto.
2. Instalar los módulos de Node con el comando:
```
npm install
```
3. Desplegar el servidor con el siguiente comando:
```
node src/index.js
```