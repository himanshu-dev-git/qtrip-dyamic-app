
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventuresList = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    const data = await adventuresList.json();
    return data;
  } catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  
  adventures.forEach((adventure) => {
    const ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4 position-relative";
    ele.innerHTML = `      
            <a href="detail/?adventure=${adventure.id}" id="${adventure.id}"">
              <div class="category-banner">${adventure.category}</div>
              <div class="activity-card">
                <img src="${adventure.image}" class="activity-card-image"/>
                 
                <div class="d-flex justify-content-between p-1" >
                  <div>${adventure.name}</div>
                  <div>₹${adventure.costPerHead}</div>
                </div>
            
                <div class="d-flex justify-content-between p-1">
                  <div>Duration</div>
                  <div>${adventure.duration} Hours </div>
                </div> 
              </div>
            </a>       
      `;
      document.getElementById("data").appendChild(ele);
    })
  


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredDur = list.filter( (advent) => {
    return advent.duration >= low && advent.duration < high;
  });

  return filteredDur;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // people.filter((obj) => obj.firstName === firstName);
  return list.filter(advent => categoryList.includes(advent.category));
}
// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 1.1 Handling filter by category 
  
  let filterListCat;
  let filterListDur;
  
  if(filters.category.length > 0 && filters.duration.length > 0) {
    let categoryList = filters.category;
    
    filterListCat = filterByCategory(list, categoryList);
    let duration = filters.duration;
    let array = duration.split("-");
    let low = parseInt(array[0]), high = parseInt(array[1]);
    filterListDur = filterByDuration(filterListCat, low, high);
    return filterListDur'
  }
  else if(filters.category.length > 0) {
    let categoryList = filters.category;
    
    filterListCat = filterByCategory(list, categoryList);
    return filterListCat;
  }
  else if(filters.duration.length > 0) {
    let duration = filters.duration;
    let array = duration.split("-");
    let low = parseInt(array[0]), high = parseInt(array[1]);
    filterListDur = filterByDuration(list, low, high);
    return filterListDur;
  }
 
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filtersLS = localStorage.getItem("filters");
  // console.log(filtersLS);
  // Place holder for functionality to work in the Stubs
  return JSON.parse(filtersLS);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  let categoryList = document.getElementById("category-list");
  filters.category.forEach((i) => {
    let wrap = document.createElement("div");
    wrap.setAttribute("class", "d-flex");
    let div = document.createElement("div");
    wrap.classList.add("category-filter");
    div.textContent = i;
    let x = document.createElement("button");
    x.classList.add("text-warning");
    x.classList.add("ms-2");
    x.classList.add("btn");
    x.classList.add("py-0");
    x.classList.add("pe-0");
    x.innerHTML = "x";
    let id= i.toLowerCase(i);
    x.setAttribute("id", id)
    x.setAttribute("onclick", "removeCategory(event)");
    wrap.append(div);
    wrap.append(x);
    categoryList.append(wrap);
  });
  
  let durationArr = ["", "0-2", "2-6", "6-12", "12-99"];
  document.getElementById("duration-select").selectedIndex = durationArr.indexOf(filters.duration); 
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
