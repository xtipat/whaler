# **Whaler** - CS374 Project
## **Update**
* 19/05/10 Add Live Demo Link
* 19/05/09
  * Remove Circular Action Button (Not compatible with react web)
  * Add react-animations
* 19/05/05 Add Circular Action Button Dependencies
* 19/04/30 Initial Construction & add README.MD

## **Index**
1. [Description](#description)
2. [Progress](#progress)
3. [Coding Guides](#coding-guides)
4. [Dev Instructions](#dev-instructions)
5. [Appendix](#Appendix)
6. [React Command Guide](#React-Command-Guide)

## **Description**
![](https://img.shields.io/badge/status-work%20in%20progress-green.svg)

**Codebase** : ![](https://img.shields.io/badge/npm-6.4.1-yellow.svg)
![](https://img.shields.io/badge/react-16.8.6-red.svg)
![](https://img.shields.io/badge/firebase-5.10.1-blue.svg)<br>
**Live Demo** : https://whaler.netlify.com

## **Progress**
### To-do List
- [ ] Make decisions about minor styles
  - [ ] hover action
- [ ] Complete Router Link
- [ ] Considering Redux Integration (Use or Remove)
- [x] Discuss about design choices
  - [x] Primary Color
  - [x] Fonts

### Implementation
- [ ] Map Page
  - [x] add Google Map
  - [ ] Bin Details Modal
  - [ ] Add Bin Modal
- [ ] Explore
- [ ] Redeem Page
  - [ ] Reward List
  - [ ] Redeem Reward
- [ ] Profile Page
  - [ ] Profile Display
  - [ ] Statistics
  - [ ] Edit Profile
- [ ] Menu Bar
  - [ ] Extended Menu Trigger
  - [x] Layout
  - [x] Router Link on main menu

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

7. **In the last, all the files in this repository will be packed using webpack to get `bundle.js` and `bundle.css`**, but we will wait until front-end and API are finished before packing.

## **Appendix**

### **Index**
1. [Appendix: Additionally Installed Library & Framework](#Libraries-and-Framework)
2. [Appendix: Public Assets](#Assets)

### Libraries and Framework
you can also find the list in `package.json` file
- [firebase](https://firebase.google.com/?gclid=Cj0KCQiAxNnfBRDwARIsAJlH29DkGiYpDh3s0DOPre_sJG9q66-aNFBNOoSL3MEp3OAXBUAlu4ejy_YaAly4EALw_wcB)
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
- [@react-firebase/database](https://react-firebase-js.com)

### Assets
- **Title Font**: [Lato](https://fonts.google.com/specimen/Lato)
- **Default, Context Font**: [Open Sans](https://fonts.google.com/specimen/Open+Sans)

---

## React Command Guide

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts
This is from the official README file. In the project directory, you can run:

```bash
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Firebase introduction [Firebase Realtime Database](https://firebase.google.com/products/realtime-database/?authuser=0)
