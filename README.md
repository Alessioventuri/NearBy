ENG
# NearBy
Mobile application developed with Ionic. 
The goal of this project is to offer users the opportunity to know which points of interest such as generic shops and restaurants surround them and to reach them in the center / station area.

### Dependencies
 * [Ionic 6.16.3](https://www.npmjs.com/package/@ionic/cli/v/6.16.3)
 * [Node.js](https://nodejs.org/en/)
 * [Capacitor 7.13.0](https://capacitorjs.com/docs/getting-started/with-ionic)
 * [Google Firebase](https://firebase.google.com/) Used to store the data 
 * [Google Cloud Platform](https://cloud.google.com/) Used to make a custom map
 
Inside Ionic, we have installed some dependecies like angular, geolocation

### Pre-requisited

To use my database, you have to contact me. I will give you the credentials to use Google Firebase and Google Cloud Platform.

### Usage 

To use locally, you have to download the project. Once downloaded, open the terminal and go to the project folder.
 * `cd Nearby`
 * `ionic serve ` to visualize the project on the browser or
 * `ionic serve -l` to visualize the project on mobile inside the browser

To run the project in Android mobile, you have to download the project. Once downloaded, open the terminal and go to the project folder.
 * `cd Nearby`
 * `ionic cap add android` (inside the project, it should already be installed)
 * `ionic cap build`
 * `ionic cap sync`
 * `ionic cap open android`

Android studio is now open. Connect you android mobile, check if it is connected and press play to install the project in your android mobile.
On your android mobile, you will see those interface :
![1](img/1.png)

