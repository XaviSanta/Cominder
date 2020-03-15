var points = [{
    "type": "Feature",
    "properties": {
      "title": "El Mussol",
      "description": "A restaurant to eat owls"
    },
    "geometry": {
      "coordinates": [
        2.1915381401222476,
        41.40480971528061
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "title": "Tagliatella",
      "description": "A fancy restaurant to eat good pasta"
    },
    "geometry": {
      "coordinates": [
        2.192299385042361,
        41.404939986348154
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "title": "McDonalds",
      "description": "Fast food"
    },
    "geometry": {
      "coordinates": [
        2.19197539002451,
        41.404880106141974
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "title": "Upf",
      "description": "microones"
    },
    "geometry": {
      "coordinates": [
        2.1935697072043183,
        41.40395813954839
      ],
      "type": "Point"
    }
  },
  {
    "type": "Feature",
    "properties": {
      "title": "TaElWei",
      "description": "Nunca supe como se escribía"
    },
    "geometry": {
      "coordinates": [
        2.192999189543883,
        41.40525216893715
      ],
      "type": "Point"
    }
  }
];

var groupsList = [
  {
    "id": 1,
    "restaurant": "El Mussol",
    "title": "Student group",
    "members": 2,
    "max-members": 4,
    "users": [
      "xavi",
      "ann",
    ]
  },
  {
    "id": 2,
    "restaurant": "El Mussol",
    "title": "English group",
    "members": 1,
    "max-members": 4,
    "users": [
      "Imane",
    ]
  },
  {
    "id": 3,
    "restaurant": "El Mussol",
    "title": "Date3",
    "members": 1,
    "max-members": 2,
    "users": [
      "Xavi",
      "Imane",
    ]
  },
  {
    "id": 4,
    "restaurant": "Tagliatella",
    "title": "Date",
    "members": 2,
    "max-members": 3,
    "users": [
      "Xavi",
      "Imane",
    ]
  },
  {
    "id": 5,
    "restaurant": "Tagliatella",
    "title": "Over 25",
    "members": 2,
    "max-members": 4,
    "users": [
      "Xavi",
      "Imane",
    ]
  },
  {
    "id": 6,
    "restaurant": "Upf",
    "title": "tuppers",
    "members": 2,
    "max-members": 6,
    "users": [
      "Xavi",
      "Imane",
    ]
  },
  {
    "id": 7,
    "restaurant": "McDonalds",
    "title": "russians",
    "members": 2,
    "max-members": 3,
    "users": [
      "Xaviaasdfasfd",
      "Imane",
    ]
  },
  {
    "id": 8,
    "restaurant": "TaElWei",
    "title": "Coronavirus",
    "members": 2,
    "max-members": 3,
    "users": [
      "Xavi",
      "Imane",
    ]
  },
];

var offersList = [{
    restaurant: 'El Mussol',
    title: 'El Mussol 30%',
    description: '30% for big groups (+4 people).',
    extraInfo: 'Oferta válida hasta 20/03/2020'
  },
  {
    restaurant: 'Tagliatella',
    title: 'Tagliatella 50%',
    description: "Use the code 'COMINDER2' and come with another person for a 50% discount.",
    extraInfo: 'Only in March'
  },
  {
    restaurant: 'TaElWei',
    title: 'TaElWei 80%',
    description: 'Come with an asian friend and get a 80% discount in the next meal!!',
    extraInfo: 'A-pass only valid until coronavirus ends.'
  },
  {
    restaurant: 'McDonalds',
    title: 'McDonalds 30%',
    description: '30% for big groups (+4 people).',
    extraInfo: 'Oferta válida hasta 20/03/2020'
  },
];

var chatsList = [
  {
    id: 'ZesHuP6BX1J0kOGgAaAX',
    title: 'Student group',
    userLimit: 4,
    usersJoined: 2,
    messages: [
      {
        author: 'Xavi',
        content: 'Hola que tal tot com estaola que tal tot comola que tal tot coms si?'
      },
      {
        author: 'Imane',
        content: 'Adeu'
      },
      {
        author: 'Xavi',
        content: 'ola que tal tot comvola que tal tot comola que tal tot comola que tal tot comola que tal tot com'
      },

      {
        author: 'Imane',
        content: 'Adeu'
      },
      {
        author: 'Xavi',
        content: 'Holsdfe tal tot com estas si?'
      },
    ]
  },
  {
    id: 2,
    title: 'English group',
    userLimit: 4,
    usersJoined: 1,
    messages: [
      {
        author: 'Xavi',
        content: 'Hola que tal tot com estaola que tal tot comola que tal tot coms si?'
      },
      {
        author: 'Imane',
        content: 'Adeu'
      },
      {
        author: 'Xavi',
        content: 'ola que tal tot comvola que tal tot comola que tal tot comola que tal tot comola que tal tot com'
      },

      {
        author: 'Imane',
        content: 'Adeu'
      },
      {
        author: 'Xavi',
        content: 'Holsdfe tal tot com estas si?'
      },
    ]
  }
];

module.exports = {
  points,
  groupsList,
  offersList,
  chatsList,
}