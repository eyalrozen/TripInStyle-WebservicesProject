# TripInStyle-WebservicesProject
Webservices project

###GET methods:

URL:

https://tripinstyle2016.herokuapp.com/getAllCategories //Returns all Categories

Response sample:
```
[
  {
    _id: "57585253dcba0f052b3895d5",
    title: "shows",
    image: "images/shows.png"
  },
  {
    _id: "5758527bdcba0f052b3895f8",
    title: "festivals",
    image: "images/festivals.png"
  },
  {
    _id: "575852d5dcba0f052b389641",
    title: "sport",
    image: "images/sport.png"
  },
  {
    _id: "575852ecdcba0f052b389648",
    title: "art",
    image: "images/art.png"
  },
  {
    _id: "57585305dcba0f052b389656",
    title: "fashion",
    image: "images/fashion.png"
  }
]
```
URL:

https://tripinstyle2016.herokuapp.com/getAllStates //Returns all States in db

Response sample:

```
[
  {
    "_id": "575bdaebdcba0f71fd3fc1eb",
    "name": "United State",
    "image": "images/state/US.png"
  },
  {
    "_id": "575bdb70dcba0f71fd3fc1fe",
    "name": "United Kingdom",
    "image": "images/state/UnitedKingdom.png"
  },
  {
    "_id": "575bdb7cdcba0f71fd3fc204",
    "name": "Israel",
    "image": "images/state/Israel.png"
  },
  {
    "_id": "575bdb88dcba0f71fd3fc20e",
    "name": "France",
    "image": "images/state/France.png"
  },
  {
    "_id": "575bdb95dcba0f71fd3fc212",
    "name": "Germany",
    "image": "images/state/Germany.png"
  }
]
```
URL:

https://tripinstyle2016.herokuapp.com/getAllEvents // Returns all events in db

Response sample:
```
[
  {
    _id: "5755dc41dcba0f2aab5c8d5c",
    title: "Katy Perry",
    description: "Katy Perry appears in London as part of her tour with her new album 'PRISM'. This performance is all the sensory experience, her poems to accompany visuals are impressive and allow the stage to be set up Katy Perry to be closer to her fans ever.",
    state: "united kingdom",
    city: "London",
    place: "The O2",
    startDate: "11.02.16",
    endDate: "11.02.16",
    startTime: "20:30",
    endTime: "23:00",
    price: 80,
    coin: "USD",
    image: "images/shows/KettyPerry.jpg",
    category: "shows",
    tickets: 
    [
      {
        row: "A",
        seat: 10,
        id: 9334334104008
        },
        {
        row: "A",
        seat: 11,
        id: 9334334104009
      }
    ]
  }
]
```

### POST METHODS:

URL:

https://tripinstyle2016.herokuapp.com/getEventsByCategory //Get events by category

Params:

Key:"category" ,Value:"festivals,shows"

Response sample:
```
[
  {
    "_id": "5755dc41dcba0f2aab5c8d5c",
    "title": "Katy Perry",
    "description": "Katy Perry appears in London as part of her tour with her new album 'PRISM'. This performance is all the sensory experience, her poems to accompany visuals are impressive and allow the stage to be set up Katy Perry to be closer to her fans ever.",
    "state": "united kingdom",
    "city": "London",
    "place": "The O2",
    "startDate": "11.02.16",
    "endDate": "11.02.16",
    "startTime": "20:30",
    "endTime": "23:00",
    "price": 80,
    "coin": "USD",
    "image": "images/shows/KettyPerry.jpg",
    "category": "shows",
    "tickets": [
      {
        "row": "A",
        "seat": 10,
        "id": 9334334104008
      },
      {
        "row": "A",
        "seat": 11,
        "id": 9334334104009
      }
    ]
  }
  ]
```

URL:

https://tripinstyle2016.herokuapp.com/getEventsByState    //Return all events by state & category
Params:

Key:category , Value:"Festivals,Shows"

Key:state , Value:"israel"

Response sample:
```
[
  {
    "_id": "575aec29dcba0f71fd3f7a83",
    "title": "Sia",
    "description": "Sia Kate Isobelle Furler, referred to mononymously as Sia, is an Australian singer and songwriter. She started her career as a singer in the local Adelaide acid jazz band Crisp in the mid-1990s",
    "state": "israel",
    "city": "Tel Aviv",
    "place": "Yarkon",
    "startDate": "11.08.16",
    "endDate": "11.08.16",
    "startTime": "19:00",
    "endTime": "23:00",
    "price": 100,
    "coin": "USD",
    "image": "images/shows/Sia.jpg",
    "category": "shows",
    "tickets": [
      {
        "row": "C",
        "seat": 10,
        "id": 7334334104008
      },
      {
        "row": "C",
        "seat": 11,
        "id": 7334334104009
      }
    ]
  }
]
```
Parse categories list on bad format cause error response

Error response sample:
```
{
	error: "Unable to parse categories on request format"
}
```


