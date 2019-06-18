# **Whaler** - CS374 Project

## **Index**
1. [Description](#description)
2. [Progress](#progress)
3. [Coding Guides](#coding-guides)
4. [Dev Instructions](#dev-instructions)
5. [Appendix](#Appendix)

## **Description**
Whaler is a crowdsourcing platform for collecting data about bins around the world. Our website allows members to submit records about bins that they know--location, types of bins, together with a photo of the bin as a supporting evidence--and let other members help verify the data with a voting system. We also reward contributors with points which could be redeemed for real-world prizes in form of gift cards. The implementation is done using React.js in JavaScript ES6 and SCSS, supplied by firebase backend. Whaler is primarily designed to be used with smartphones, but it could also work on latest version of PC browsers (Safari, Chrome) smoothly.

**Codebase** : ![](https://img.shields.io/badge/npm-6.4.1-yellow.svg)
![](https://img.shields.io/badge/react-16.8.6-red.svg)
![](https://img.shields.io/badge/firebase-5.10.1-blue.svg)<br>
**Live Demo** : https://whaler.netlify.com ([mirror](https://whalerz.netlify.com))

## **Progress**
![](https://img.shields.io/badge/status-completed-green.svg)
<br>as of 2019/06/18, this repository (including its mirror) will no longer be updated
## **Coding Guides**
* This project is implemented with ReactJS framework with SASS/SCSS stylesheet. All the JavaScript file can be found in `/src/` folder, and assets such as fonts and third-party js/css are put in `/public/`. The base directory from here on will refer to `/src/`

* Each page component can be found in the directory. This include `index.js` which calls render, `Map.js` for rendering map page, `Redeem.js` for rendering redeem page, and so on.

* Each page is reduced into several subcomponents that can be found in folder `/components`


* The backend/database controls are kept in `/firebase`

* `/helper.js` is used to keep the file for helper functions used in several place across the application

* `/constants`is for declaring constants.

* Other subfolders are used to keep the file implemented in the use of third-party libraries, such as react-redux or font-awesome

## **Dev Instructions**
Please read the instruction on this file before working on the project.

### HOW TO
Here, we are using **ReactJS** and **CSS/SCSS** stylesheet.

1. To start working, first clone the repository, then go to the project folder (where package.json is) and then run `npm ci` and `npm start`. note that we are using `npm ci` instead of `npm install` because it will install package according to the package-lock file and will not rewrite it.
<br><br>After the first pull, you can run project with only `npm start`.

2. We are using sass/scss, so you also have to install sass package for scss reference. I've already added the package, but sometimes it doesn't work--in that case just run the command the npm prompt you when trying to run the project (sth abour node-sass)

3. The directory we'll be working on is `src` and `public`. React and JavaScript files are kept in `/src`, and stylesheets are kept in `/src/assets/scss`. Downloaded Fonts and assets should be kept in `public`. Creating a new folder in the dir is fine if you need it. Just try to be as organized as possible.

4. Before pulling and start working for the day, please review any pull request that is still pending and merge them if you think there is no problem. This is just to make sure that we will be as much as possible on the same version on each branch and have to solve less conflict.

5. During working, if you found a part that someone else should be working on, please mark it with `TODO:` and add it to TODO section *(refer to Guide section below for more information)*

5. If you want to use any library that is not yet included in the work, please install it using`npm install` and add the name of the library to *React Library* Section. Including css file and stuffs using linking are fine, but please see if there exists a react plugin to be installed (just because it is easier)<b

6. Please create your own branch and use git PULL REQUEST instead of pushing to master. You can decide to merge it yourself if you have already test the code or are confident, but please keep buggy/unfinished to pull request until they are reviewed.

## **Appendix**

### **Index**
1. [Appendix: Additionally Installed Library & Framework](#Libraries-and-Framework)
2. [Appendix: Public Assets](#Assets)

### Libraries and Framework
you can also find the list in `package.json` file
- [firebase](https://firebase.google.com/?gclid=Cj0KCQiAxNnfBRDwARIsAJlH29DkGiYpDh3s0DOPre_sJG9q66-aNFBNOoSL3MEp3OAXBUAlu4ejy_YaAly4EALw_wcB)
- [formik](https://jaredpalmer.com/formik/)
- [google-map-react](https://github.com/google-map-react/google-map-react)
- [node-sass](https://github.com/sass/node-sass)
- [react](https://reactjs.org)
- [react-bootstrap](https://react-bootstrap.netlify.com)
- [react-fontawesome](https://fontawesome.com)
- [react-router](https://reacttraining.com/react-router/core/guides/philosophy)
- ~~[redux](https://redux.js.org)~~ *unused at the moment*
- [react-animations](https://github.com/FormidableLabs/react-animations)
- [react-tagsinput](https://github.com/olahol/react-tagsinput)
- [react-toastify](https://fkhadra.github.io/react-toastify)
- [styled-component](https://www.styled-components.com)
- [yup](https://github.com/jquense/yup)
- [@react-firebase/database](https://react-firebase-js.com)

### Assets
- **Title Font**: [Oswald](https://fonts.google.com/specimen/Oswald)
- **Default, Context Font**: [Open Sans](https://fonts.google.com/specimen/Open+Sans)

---
