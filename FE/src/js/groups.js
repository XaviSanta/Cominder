function openGroupsOfRestaurant(RID) {
  // Hide the list of restaurants when opening the groups
  $('.tab-pane.fade.active.show').removeClass('active');
  $('.tab-pane.fade.active.show').removeClass('show');
  
  $('#list-groups').tab('show');
  $('.mapboxgl-ctrl-geocoder').hide();
  $('#list-map').removeClass('active');
  $('#list-map').removeClass('show');
  
  updateGroupsList(groupsList, RID);
}

function updateGroupsList(groups, RID = null) {
    var container = document.querySelector('#groups-list-group');
    removeChilds(container);
    
    // Change name of title
    var title = (RID === null) ? 
      'Groups' : 
      `Groups in ${points.find(p => p.properties.RID == RID).properties.title}`;

    $('#list-title-group').text(title);

    if(RID !== null) {
      groups = groups.filter(g => g.restaurantID == RID);
    }

    groups.forEach(g => {
      var temp = document.querySelector('#templates .group-li');
      var li = temp.cloneNode(true);
      li.querySelector('.name-group-template').innerText = g.title;
      li.querySelector('.badge').innerText = `${g.members}/${g["max-members"]}`;
      li.querySelector('a').onclick = function() { 
        // Get the chat info from Server: (name, users, messages)
        console.log(g.id)
        getChat(g.id);
        console.log('Group clicked:', g)
      }
      container.appendChild(li); //to the DOMs
    });
  
}


$('#createGroupModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('rest-name'); // Extract info from data-* attributes
  var restId = button.data('rest-id'); 
  var modal = $(this);
  modal.find('.modal-title').text('New group to ' + recipient);
  // modal.find('.modal-title').attr('RestaurantAttr', recipient);
  modal.find('.modal-title').attr('RestaurantID', restId);
  modal.find('#recipient-name').attr('placeholder', 'Type your group name here');
});

$('#btn-create-group').on('click', function () {
  var restaurantID = $('#createGroupModal').find('.modal-title').attr('RestaurantID');
  var groupName = $('#recipient-name').val();
  var maxMembers = $('#max-num-members').val();
  addGroupToRestaurantAsync(restaurantID, groupName, maxMembers);
})

async function addGroupToRestaurantAsync(restaurantID, groupName, maxMembers) {
  var newGroupRef = db.collection('groups').doc();
  var group = {
    id: newGroupRef.id +'',
    restaurantID,
    'title': groupName,
    'members' : 1,
    'max-members' : maxMembers,
    'users': [username],
  };

  var restaurantRef = await db.collection('points').doc(restaurantID);
  // Add new groupID to the list
  restaurantRef.update({
    groups: firebase.firestore.FieldValue.arrayUnion(newGroupRef.id +'')
  });
  updateGroupsList(groupsList, restaurantID);
  newGroupRef.set(group);
  $('#createGroupModal').modal('hide');
  if (popup !== undefined) {
    popup.remove();
  }

  // Add new Chat into the db
  db.collection('chats').doc(newGroupRef.id).set({
    id: newGroupRef.id + '',
    title: groupName, // TODO: Remove this as we already have the ID
    userLimit: maxMembers,
    usersJoined: 1,
    messages: [
      {
        author: '',
        content: `${username} created the group`
      },
    ],
  });
}

// Listener of database changes
db.collection('groups').onSnapshot(snapShot => {
  groupsList = [];
  snapShot.forEach(doc =>  {
    groupsList.push(doc.data());
  });
  console.log('asdfasdf')
  updateGroupsList(groupsList);
});