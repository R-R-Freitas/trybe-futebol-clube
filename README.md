# Trybe Futebol Clube  
  
Esta aplicação é um site informativo sobre partidas e classificações de futebol.  
  
Projeto da Trybe visando aplicação de conhecimentos em typescript, POO, Sequelize, REST, SOLID e TDD.  
  
## Para rodar o app:  
<details>  
  <summary>Clique para expandir</summary>  

  É recomendado o uso de Docker para rodar o projeto.
  Na pasta onde o projeto ficará, digite no terminal:  
```  
git clone git@github.com:R-R-Freitas/trybe-futebol-clube.git
cd trybe-futebol-clube
npm run compose:up
```  
O front-end rodará na porta 3000 e o back-end na porta 3001.  
  
Para visualizarf o site digite na barra de endereços do navegador:  
```  
http://localhost:3000
```  

</details>
  
##### O Front-End e os arquivos na raiz do projeto foram desenvolvidos pela Trybe, que também foi responsavel pelos seguintes arquivos na pasta ./app/backend:  
<details>
  <summary>Clique para expandir</summary>  
  
* /src/app.ts (alterado por mim para acrescentar router e middleware de erro);  
* /src/server.ts  
* /src/database/config/  
* /src/database/seeders/  
* .dockerignore  
* .eslintignore  
* .eslintrc.json  
* .gitignore  
* .sequelizerc  
* nyc.config.js  
* package-lock.json  
* package.json  
* tsc_eval.sh  
* tsconfig.json  
</details>
