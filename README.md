# Dotory Hackathon Project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


### Compiles and minifies for production
### dist folder is the output location of build sources
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## visual studio code terminal commands

### Firebase
```
firebase login
firebase init
firebase public directory ===> dist
firebase deploy
```

### Git
```
git clone https://github.com/hahahahao/dotory.git
git add *.* : make indexs of all files and folders 
git commit -m "write comments here blablablabla"
git remote add origin https://github.com/hahahahao/dotory.git
git push -u origin master
```




You can use data in `data/` folder to import to `products` node in your firebase app.

## Features

This project implements basic shopping cart features:
* Login / Register
* Pull products list from API
* Add/Remove item to shopping cart

## Technical details

* VueJS [^2.2.1]
* [Bootstrap 4](https://getbootstrap.com/)
* Firebase (auth and realtime database)

## Demo

Checkout demo at [Demo](http://mydb-d09a2.firebaseapp.com)


## Contributing

As I use this for Hedera Hackathon projects, I know this might not be the perfect approach
for all the projects out there. If you have any ideas, just
[open an issue][issues] and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as
you'd like. Pull requests are warmly welcome.
