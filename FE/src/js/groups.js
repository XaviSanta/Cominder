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
    li.querySelector('a').onclick = function() { 
      openChat(g);
    }
    container.appendChild(li); //to the DOMs
  });
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