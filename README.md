# RemesasPeru

# Archivos de Configuración "tsconfig.json"

```
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "compileOnSave": false,
  "compilerOptions": {
    
    //----------Configuración AQUI (dejar este comentario, NO afecta al archivo)----------
    "resolveJsonModule": true,
    "esModuleInterop": true,
    //----------Configuración AQUI (dejar este comentario, NO afecta al archivo)----------

    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
```

# Archivos de Dependencias "package.json"

```
{
    "name": "remesas-peru",
    "version": "0.0.0",
    "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build",
        "watch": "ng build --watch --configuration development",
        "test": "ng test"
    },
    "private": true,
    "dependencies": {
        "@angular/animations": "~12.2.0",
        "@angular/common": "~12.2.0",
        "@angular/compiler": "~12.2.0",
        "@angular/core": "~12.2.0",
        "@angular/forms": "~12.2.0",
        "@angular/platform-browser": "~12.2.0",
        "@angular/platform-browser-dynamic": "~12.2.0",
        "@angular/router": "~12.2.0",

        //----------Dependencias AQUI (quitar este comentario, SI afecta al archivo)----------
        "@walletconnect/web3-provider": "^1.8.0",
        "assert": "^2.0.0",
        "bootstrap": "^5.3.2",
        "crypto-browserify": "^3.12.0",
        "express": "^4.18.2",
        "https-browserify": "^1.0.0",
        "install": "^0.13.0",
        "json": "^11.0.0",
        "os-browserify": "^0.3.0",
        "rxjs": "~6.6.0",
        "stream-browserify": "^3.0.0",
        "stream-http": "^3.2.0",
        "tslib": "^2.3.0",
        "url": "^0.11.0",
        "util": "^0.12.4",
        "web3": "^1.7.0",
        "zone.js": "~0.11.4"
        //----------Dependencias AQUI (quitar este comentario, SI afecta al archivo)----------
    },
```
