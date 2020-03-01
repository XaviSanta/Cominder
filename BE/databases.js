var points = {
  "type":"FeatureCollection",
  "features":[
     {
        "type":"Feature",
        "properties":{
           "title":"El Mussol",
           "description":"A restaurant to eat owls"
        },
        "geometry":{
           "coordinates":[
              2.1915381401222476,
              41.40480971528061
           ],
           "type":"Point"
        }
     },
     {
        "type":"Feature",
        "properties":{
           "title":"Tagliatella",
           "description":"A fancy restaurant to eat good pasta"
        },
        "geometry":{
           "coordinates":[
              2.192299385042361,
              41.404939986348154
           ],
           "type":"Point"
        }
     },
     {
        "type":"Feature",
        "properties":{
           "title":"McDonalds",
           "description":"Fast food"
        },
        "geometry":{
           "coordinates":[
              2.19197539002451,
              41.404880106141974
           ],
           "type":"Point"
        }
     },
     {
        "type":"Feature",
        "properties":{
           "title":"Upf",
           "description":"microones"
        },
        "geometry":{
           "coordinates":[
              2.1935697072043183,
              41.40395813954839
           ],
           "type":"Point"
        }
     },
     {
        "type":"Feature",
        "properties":{
           "title":"TaElWei",
           "description":"Nunca supe como se escribía"
        },
        "geometry":{
           "coordinates":[
              2.192999189543883,
              41.40525216893715
           ],
           "type":"Point"
        }
     }
  ]
}

var restaurantSales = {
  "El Mussol" : [
    {
      "coordinates": [2.1915381401222476, 41.40480971528061],
      "discount": 20,
      "members" : 4,
    },
  ],
  "Tagliatella": [
    {
      "coordinates": [2.192299385042361, 41.404939986348154],
      "discount": 15,
      "members" : 3 
    },
  ],
}

var groupsList = [
  {
    "restaurant": "El Mussol",
    "title": "Student group",
    "members" : 2,
    "max-members" : 4,
  },
  {
    "restaurant": "El Mussol",
    "title": "English group",
    "members" : 1,
    "max-members" : 4,
  },
  {
    "restaurant": "El Mussol",
    "title": "Date",
    "members" : 1,
    "max-members" : 2,
  },
  {
    "restaurant": "Tagliatella",
    "title": "Date",
    "members" : 1,
    "max-members" : 2,
  },
  {
    "restaurant": "Tagliatella",
    "title": "Over 25",
    "members" : 3,
    "max-members" : 4,
  },
  {
    "restaurant": "Upf",
    "title": "tuppers",
    "members" : 3,
    "max-members" : 6,
  },
  {
    "restaurant": "McDonalds",
    "title": "russians",
    "members" : 1,
    "max-members" : 3,
  },
  {
    "restaurant": "TaElWei",
    "title": "Coronavirus",
    "members" : 1,
    "max-members" : 3,
  },
];

module.exports = {
  points,
  restaurantSales,
  groupsList
}