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
  price: ""
};
let number = 0;
const taps = 3;
//make this equal to number of taps

$(document).ready(function () {

  function makeRow(item, id) {
    console.log(item);
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
      item.price + "</td>" +
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
    database.ref().push({
      beerInfo
    });
  });

  //delete row
  $(document).on("click", ".delete", function (event) {
    event.preventDefault();
    const key = this.value;
    database.ref().child(key).remove();
    location.reload();
  });

  //create table
  $(".beerlist").empty();
  database.ref().on("child_added", function (childSnapshot) {
    const child = childSnapshot.val();
    const key = childSnapshot.key;
    makeRow(child.beerInfo, key);
  });
});