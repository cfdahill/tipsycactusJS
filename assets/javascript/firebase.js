const config = {
  apiKey: "AIzaSyApyWq58g0nNEc03Q_AaIpzSeBuwmeMj4w",
  authDomain: "tipsycactus-67709.firebaseapp.com",
  databaseURL: "https://tipsycactus-67709.firebaseio.com",
  projectId: "tipsycactus-67709",
  storageBucket: "tipsycactus-67709.appspot.com",
  messagingSenderId: "495034837228"
};

firebase.initializeApp(config);

const database = firebase.database();

let beerInfo = {
  beerName: "",
  brewery: "",
  style: "",
  abv: 0.0,
  ounces: 0,
  price: "",
  botm: ""
};

let eventInfo = {
  eventName: "",
  eventDate: "",
  eventTime: "",
  eventDesc: ""
}

let number = 0;
const taps = 9;
//make this equal to number of taps

$(document).ready(function () {
  //make beer list
  function makeRow(item, id) {
    console.log(id);
    let deleteButton = "";

    if ($(".beerlist").is("#editable-beer-list")) {
      deleteButton = "<td><button value='" + id + "' class='delete'>Delete</td>"
    };

    $(".beerlist").append("<tr id='beer" + number + "'><td>" +
      item.beerName + "</td><td>" +
      item.brewery + "</td><td>" +
      item.style + "</td><td>" +
      item.abv + "</td><td>" +
      item.ounces + "</td><td>" +
      item.price + "</td><td>" +
      item.botm + "</td>" +
      deleteButton + "</tr>");

    number++;
    if (number >= taps) {
      console.log("triggered");
      $("#beerForm").html(
        "TOO MANY BEERS"
      )
    }
  }

  //saves beer info put in
  $("#save").click(function (event) {
    event.preventDefault();
    beerInfo.beerName = $("#beer").val().trim();
    beerInfo.brewery = $("#brewery").val().trim();
    beerInfo.style = $("#style").val().trim();
    beerInfo.abv = $("#abv").val().trim();
    beerInfo.ounces = $("#ounces").val().trim();
    beerInfo.price = $("#price").val().trim();
    
    if($("#botm").is(':checked')) {
      beerInfo.botm="X";
      $("#botm").not(':checked');
    }
    
    database.ref("beers")
      .push(beerInfo)
      .then(
        beerInfo = {
          // type: "beer",
          beerName: "",
          brewery: "",
          style: "",
          abv: 0.0,
          ounces: 0,
          price: "",
          botm: ""
      });
  });

  //delete row
  $(document).on("click", ".delete", function (event) {
    event.preventDefault();
    const key = this.value;
    database.ref("beers").child(key).remove();
    location.reload();
  });

  //create table
  $(".beerlist").empty();
  database.ref("beers").on("child_added", function (childSnapshot) {
    const child = childSnapshot.val();
    const key = childSnapshot.key;
    makeRow(child, key);
  });

  //calendar
  //calendar
  $( function() {
    $( "#datepicker" ).datepicker();
    $('#timepicker').timepicker({'scrollDefault': '14:30', 'timeFormat': 'h:i A'});
  } );
  
  function makeEventRow(item, id) {
    console.log(item);
    const deleteButton = "<td><button value='" + id + "' class='delete'>Delete</td>"

    $(".eventlist").append("<tr id='event" + number + "'><td>" +
      item.eventName + "</td><td>" +
      item.eventDate + "</td><td>" +
      item.eventTime + "</td><td>" +
      item.eventDesc + "</td>" +
      deleteButton + "</tr>");
  }

  //saves event info put in
  $("#save-event").click(function (event) {
    event.preventDefault();
    eventInfo.eventName = $("#event-title").val().trim();
    eventInfo.eventDate = $("#datepicker").val().trim();
    eventInfo.eventTime = $("#timepicker").val().trim();
    eventInfo.eventDesc = $("#event-desc").val().trim();

    console.log(eventInfo);
    
    database.ref("events")
      .push(eventInfo)
      .then(
        eventInfo = {
          eventName: "",
          eventDate: "",
          eventDesc: ""
        });
  });

  //delete row
  $(document).on("click", ".delete", function (event) {
    event.preventDefault();
    const key = this.value;
    database.ref("events").child(key).remove();
    location.reload();
  });

  //create table
  $(".eventlist").empty();
  database.ref("events").on("child_added", function (childSnapshot) {
    const child = childSnapshot.val();
    const key = childSnapshot.key;
    makeEventRow(child, key);
  });
});