# UI Catalogo web

Los archivos contenidos en la carpeta principal son las vistas
principales de un sistema de catalogo web donde se puede realizar un login
de usuarios, creacion de usuarios, ordenes y aprobacion de ordernes
###login
**_El login es una simulacion_** cuando se realiza una login en la interfaz
se verifica que el usuario y contraseña existan en el DB pero una vez realizado esto
los datos del usuario se guardan en un session storage el cual se utiliza
para permitir o denegar el acceso a diferentes paginas de la interfaz

- user.type="ASE" accede a profile.html
- user.type="ADM" accerde a admin.html
- user.typer="COORD" accede a profileCoord.html

  ##Configuracion

1. Entrar a carpeta JS
2. Abrir archivo variables.js
3. Cambiar url por url del server
