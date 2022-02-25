const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photoArray = [];
let initialLoad=true;
function displayPhoto() {
  imagesLoaded =0;
  //Create Element For Links and display into the DOM
  photoArray.forEach((photo) => {
    totalImages=photoArray.length;
    console.log(totalImages);
    //create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html); //for link back to unsplash photo
    item.setAttribute("target", "_blank");

    //create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    //Event Listener, check when each image is finished loaded
    img.addEventListener('load', imageLoaded);
    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img); // put image into item
    imageContainer.appendChild(item); //put item into imageContainer
  });
}

//Check if all image were load
function imageLoaded(){
 imagesLoaded++;
 console.log(imagesLoaded);
 if(imagesLoaded === totalImages)
 {
   ready =true;
   loader.hidden=true;
   initialLoad=false;
   console.log('ready=', ready);
 }
}
// get API
const count=5;
const apiKey = "-SWsYYzByjB1l_PE-rAdBPO9mfPXh90K7pvab4fPHD8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//get photo form Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhoto();
    console.log(photoArray);
  } catch (error) {
    
  }
}

//Check to see scrolling near bottom of the page nad load more photo
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && ready
  ) {
    ready =false;
    getPhotos();
  }
});

//on Load
getPhotos();
