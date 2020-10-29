"use strict";

var imageContainer = document.getElementById('image-container');
var loader = document.getElementById('loader');
var ready = false;
var imagesLoaded = 0;
var totalImages = 0;
var photosArray = []; // Unsplash API

var countOfImages = 3;
var apiKey = 'dK5qL0z4mZzEH33O3hmuzLnyju3-aKK2Aozoqa-IeyQ';
var apiUrl = "https://api.unsplash.com/photos/random/?client_id=".concat(apiKey, "&count=").concat(countOfImages); // check if all images were loaded

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
} // Helper function to set Attributes on DOM elements


function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
} // create elements for links & photos, add to DOM


function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  photosArray.forEach(function (photo) {
    // Create <a> to link to Unsplash
    var item = document.createElement('a'); // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');

    setAttributes(item, {
      'href': photo.links.html,
      'target': '_blank'
    }); // Create <img> for photo 

    var img = document.createElement('img'); // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    setAttributes(img, {
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description
    }); // Event listener , check when each is finished 

    img.addEventListener('load', imageLoaded); // put <img> inside <a> , then put both inside imageContainer div

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
} // Get photos from Unsplash api


function getPhotos() {
  var response;
  return regeneratorRuntime.async(function getPhotos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          photosArray = _context.sent;
          displayPhotos();
          _context.next = 12;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // Check to see if scrolling near bottom of page then load more images


window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
}); // On load

getPhotos();