function updateOffersCarousel() {
  var container = document.querySelector('.offers');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append offers to the container
  offers.forEach(o => {
    appendOfferAsync(container, o);
  });
}

async function appendOfferAsync(container, o) {
  var temp = document.querySelector('#templates .card-offer');
  var card = temp.cloneNode(true);
  card.querySelector('.card-header').innerText = `${o.title}`;
  card.querySelector('.card-text').innerText = o.description;
  card.querySelector('.text-muted').innerText = o.extraInfo;
  var restDoc = await db.collection('points').doc(o.restaurantID).get();
  var coordinates = restDoc.data().geometry.coordinates;
  if(restDoc.exists) {
    card.onclick = function() { 
      goAndShowRestaurant(coordinates, o.restaurantID);
    }
  }

  container.appendChild(card); //to the DOM
}

function offersShow() {
  if($('.offers').css('display') == 'none') {
    $('.offers').show(800);
  } else {
    $('.offers').hide(800);
  }
}

$('.create-offer').on('show.bs.modal', function (event) {
  var modal = $(this);
  modal.find('.modal-title').text('New offer in ' + restName);
  modal.find('#offer-title-form').attr('placeholder', `${restName} 30%`);
});

$('#btn-create-offer').on('click', function () {
  var title = $('#offer-title-form').val();
  var description = $('#offer-description-form').val();
  var extraInfo = $('#offer-extraInfo-form').val();
  var restaurant = restName;

  var offer = {
    restaurantID: myRestID,
    restaurant,
    title,
    description,
    extraInfo,
  }

  db.collection('offers').add(offer);
  $('.create-offer').modal('hide');
});

// Listener of database changes
db.collection('offers').onSnapshot(function (snapShot) {
  offers = [];
  snapShot.forEach(doc =>  {
    offers.push(doc.data());
  });
  updateOffersCarousel();
});
