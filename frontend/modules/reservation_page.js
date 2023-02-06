import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let res = await fetch(config.backendEndpoint + '/reservations/');
    let data = await res.json();
    return data;
  } catch (err){
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let table = document.getElementById('reservation-table');

  reservations.forEach((reservation, index) => {
    let row = table.insertRow(index);

    let transaction_id = row.insertCell(0);
    transaction_id.innerHTML = `${reservation.id}`;

    let booking_name = row.insertCell(1);
    booking_name.innerHTML = `${reservation.name}`;

    let adventure = row.insertCell(2);
    adventure.innerHTML = `${reservation.adventureName}`;

    let persons = row.insertCell(3);
    persons.innerHTML = `${reservation.person}`;

    let date = row.insertCell(4);
    date.innerHTML = `${new Date(reservation.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })}`;

    let price = row.insertCell(5);
    price.innerHTML = `${reservation.price}`;

    let time = row.insertCell(6);
    time.innerHTML = `${new Date(reservation.time).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    })}`;

    let link = row.insertCell(7);
    link.innerHTML = `<div class= 'reservation-visit-button' id= ${reservation.id}><a href= '../detail/?adventure=${reservation.adventure}'>Visit Adventure</a></div>`;
  });

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0){
    document.getElementById('reservation-table-parent').style.display = 'block';
    document.getElementById('no-reservation-banner').style.display = 'none';
  }else {
    document.getElementById('reservation-table-parent').style.display = 'none';
    document.getElementById('no-reservation-banner').style.display = 'block';
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
