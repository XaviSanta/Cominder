function updateOffersCarousel() {
  var container = document.querySelector('.offers');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append offers to the container
  offers.forEach(o => {
    appendOffer(container, o);
  });
}

function appendOffer(container, o) {
  var temp = document.querySelector('#templates .card-offer');
  var card = temp.cloneNode(true);
  card.querySelector('.card-header').innerText = `${o.title}`;
  card.querySelector('.card-text').innerText = o.description;
  card.querySelector('.text-muted').innerText = o.extraInfo;
  card.onclick = function() { 
    var restaurant = geojson.features.filter(r => r.properties.title === o.restaurant)
    var coordinates = restaurant[0].geometry.coordinates;
    goAndShowRestaurant(coordinates, o.restaurant);
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
    restaurant,
    title,
    description,
    extraInfo,
  }
  addOffer(offer);
});

function addOffer(offer) {
  // TODO: Post offer
  var container = document.querySelector('.offers');
  appendOffer(container, offer);
  $('.create-offer').modal('hide');
}