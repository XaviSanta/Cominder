var geojson = []; // Points in the map
var groupsList = [];
var popup;
var map;

function goHome() {
  connection === null ? showLanding() : openApp(); 
}

function showLanding() {
  $('.landing').show();

  $('.sign-up').hide();
  $('.main').hide();
  $('.sign-in').hide();
}

function openApp() {
  $('.main').show();
  $('#sign-in-btn').hide();
  $('#sign-up-btn').hide();
  $('#username-btn').html(username);
  $('.btns-after-login').show();

  $('.map').load('./map.html');

  $('.sign-in').hide();
  $('.sign-up').hide();
  $('.landing').hide();
}

function updateMap() {
  getMapPoints();
}

function updateRestaurantList() {
  var container = document.getElementById('restaurant-list-group');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append restaurants to the container list
  var restaurants = geojson.features;
  restaurants.forEach(r => {
    var name = r.properties.title;
    var temp = document.querySelector('#templates .restaurant-li');
    var li = temp.cloneNode(true);
    var numGroups = groupsList.filter(g => g.restaurant === name).length;
    li.getElementsByClassName('badge')[0].innerText = numGroups;
    li.getElementsByClassName('name-group-template')[0].innerText = name;
    li.querySelector('a').onclick = function() { 
      flyTo(r.geometry.coordinates);
      openGroupsOfRestaurant(name);
    }
    container.appendChild(li); //to the DOM
  });
}


function openGroupsOfRestaurant(name) {
  $('#list-groups').tab('show');
  updateGroupsList(name);
}

function updateGroupsList(nameFilter = null) {
  var container = document.getElementById('groups-list-group');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Change name of title
  var title = (nameFilter === null) ? 'Groups' : `Groups in ${nameFilter}`;
  $('#list-title-group').text(title);

  // Append groups to the container list
  var groups = groupsList;
  if(nameFilter !== null) groups = groups.filter(g => g.restaurant === nameFilter);
  groups.forEach(g => {
    var temp = document.querySelector('#templates .group-li');
    var li = temp.cloneNode(true);
    li.getElementsByClassName('name-group-template')[0].innerText = g.title;
    li.getElementsByClassName('badge')[0].innerText = `${g.members}/${g["max-members"]}`;
    container.appendChild(li); //to the DOMs
  });
}

function refreshMap() {
  if(map !== undefined) {
    map.getSource('restaurants-source').setData(geojson); // Refresh map with new coordinate
  }
}

function addRestaurantFromMap(lng, lst) {
  var restaurantName = $('#addGroupInput').val();
  var descriptionGroup = $('#descriptionGroup').val();
  var geoPoint = {
    type: "Feature",
    properties: {
      title: restaurantName,
      description: descriptionGroup
    },
    geometry: {
      coordinates: [
        lng,
        lst
      ],
      type: "Point"
    }
  }
  postRestaurant(geoPoint); 
}

function addGroupToRestaurant(restaurantName, groupName, maxMembers) {
  var group = {
    "restaurant": restaurantName,
    "title": groupName,
    "members" : 1,
    "max-members" : maxMembers,
  };

  groupsList.push(group);
  updateGroupsList(restaurantName);
  postNewGroup(group);
  $('#createGroupModal').modal('hide');
}

$('#createGroupModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('New group to ' + recipient);
  modal.find('.modal-title').attr('RestaurantAttr', recipient);
  modal.find('#recipient-name').attr('placeholder', 'Type your group name here');
});

$('#btn-create-group').on('click', function () {
  var restaurantName = $('#createGroupModal').find('.modal-title').attr('RestaurantAttr');
  var groupName = $('#recipient-name').val();
  var maxMembers = $('#max-num-members').val();
  addGroupToRestaurant(restaurantName, groupName, maxMembers);
})

$('.form-inline').submit(function() {
  var msg = $('#input-message').val();
  sendMessage(msg);
  return false;
});

function sendMessage(msg) {
  appendMessage(msg);
}

function appendMessage(msg) {
  var container = document.getElementById('chat-messages');
  var temp = document.querySelector('#templates .message');
  var div = temp.cloneNode(true);
  div.textContent = msg;
  container.appendChild(div);
  clearInput();
}

function clearInput() {
  document.getElementById('input-message').value = '';
}


