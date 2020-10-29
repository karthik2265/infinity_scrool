const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let countOfImages = 3;
const apiKey = 'dK5qL0z4mZzEH33O3hmuzLnyju3-aKK2Aozoqa-IeyQ';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countOfImages}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count_after_initially_loaded = 30;
        countOfImages = count_after_initially_loaded;
        console.log('ready= ', ready);
    }
}

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });
        // Create <img> for photo 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });
        // Event listener , check when each is finished 
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a> , then put both inside imageContainer div
        item.appendChild(img);
        imageContainer.appendChild(item);



    });
}
// Get photos from Unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of page then load more images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});

// On load
getPhotos();