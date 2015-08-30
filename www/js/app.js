/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...

window.onload = function(){

    
    //Set Event Listeners
    addEventListeners();
    localStorage.setItem("images",0);
    
//document.getElementById('currentLocation').innerHTML = "Image "+localStorage.getItem("images");
};


function addEventListeners(){
    //Attach Take Pic Event Listener
    $('#id_button_take_pic').bind('click',capturePic);
    $('#id_img_captured_pic').bind('click',capturePic);
}

function capturePic(){
   navigator.camera.getPicture(cameraSuccess,cameraFail,{ quality: 50,destinationType: Camera.DestinationType.FILE_URI});
}

function cameraSuccess(imageData){
   
    var images = localStorage.getItem("images");
    images++;
    localStorage.setItem("images",images);
    
    
    var imgSrcUrl = "" +imageData;
  
    localStorage.setItem("images_urls_"+localStorage.getItem("images"),imgSrcUrl);
    
    var capturedImages = "";
    for(var count = 0;count < localStorage.getItem("images"); count ++){
        capturedImages +=' <div  class="widget uib_w_2 scale-image d-margins" data-uib="media/img" data-ver="0"><figure class="figure-align"><img src="' +localStorage.getItem("images_urls_"+(count +1)) +'" alt="No Picture" id="id_img_captured_pic_1" /><figcaption data-position="bottom"></figcaption></figure></div>';
    }
   
    document.getElementById('img_gallery').innerHTML = capturedImages;
    
    navigator.geolocation.getCurrentPosition(currentLocationSuccess(location),currentLocationError(error),false);
}

function currentLocationSuccess(location) {
var longitude = location.coords.longitude;
var latitude = location.coords.latitude;
    
 document.getElementById('currentLocation').innerHTML = "Latitude : "+latitude +"<br />Longitude : "+longitude;
}
function currentLocationError(error){
    document.getElementById('currentLocation').innerHTML = error;
}
function cameraFail(failMessage){
//toast("Failed!","Could not  capture picture <br /><strong>Error:</strong><i>"+failMessage+"</i>");
}
function toast(title, message){
intel.xdk.notification.alert(message,title,"CLose");}