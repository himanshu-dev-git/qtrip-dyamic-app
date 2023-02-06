import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);

  return param.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const adventDetail = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    const data = await adventDetail.json();

    return data;
  }
  catch (err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const nameId = document.getElementById('adventure-name');
  nameId.textContent = adventure.name;

  const subTitle = document.getElementById('adventure-subtitle');
  subTitle.textContent = adventure.subtitle;

  adventure.images.forEach(image => {

    const img = document.createElement('img');
    img.setAttribute('src', image);
    
    
    img.classList.add('activity-card-image');

    document.getElementById('photo-gallery').append(img);
  });

  const content = document.getElementById('adventure-content');
  content.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById('photo-gallery');

  const carouselStarter = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    
    <div id="carousel-indicator" class="carousel-indicators"></div>

    <div id="carousel-inner" class="carousel-inner"></div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `
  photoGallery.innerHTML = carouselStarter;

  images.forEach( (image, index) => {

    const carouselIndicator = document.getElementById("carousel-indicator");
    const btnEle = document.createElement('button');
    btnEle.setAttribute('type', 'button');
    btnEle.setAttribute('data-bs-target', "#carouselExampleIndicators");
    btnEle.setAttribute('data-bs-slide-to', `${index}`);

    if(index === 0){
      btnEle.className = 'active';
      btnEle.setAttribute('aria-current', "true");
    }

    btnEle.setAttribute('aria-label', `Slide ${(index + 1)}`);

    carouselIndicator.append(btnEle);
    
    const div = document.createElement('div');

    index === 0
      ? div.classList.add('carousel-item', 'active')
      : div.classList.add('carousel-item');
    
    div.innerHTML = `<div><img src=${image} class="activity-card-image"></div>`;


    const carouselInner = document.getElementById("carousel-inner");
    carouselInner.append(div);
    
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display = 'none';
    document.getElementById('reservation-panel-available').style.display = 'block';

    document.getElementById('reservation-person-cost').textContent = adventure.costPerHead;
  }
  else {
    document.getElementById('reservation-panel-available').style.display = 'none';
    document.getElementById('reservation-panel-sold-out').style.display = 'block';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById('reservation-cost').textContent = persons*adventure.costPerHead;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form = document.getElementById('myForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formElements = form.elements;

    let formData = {
      name : formElements["name"].value,
      date : formElements["date"].value,
      person : formElements["person"].value,
      adventure : adventure.id 
    }

    let url = config.backendEndpoint + '/reservations/new';

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    try {
      let res = await fetch(url, options);

      if(res.ok){
        alert("Success!");
        window.location.reload();
      }else {
        // let data = await res.json();
        // alert(`Failed! - ${data.message}`);
        alert(`Failed!`);
      }
    }catch (err) {
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = 'block';
  }else {
    document.getElementById('reserved-banner').style.display = 'none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
