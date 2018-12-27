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

let events = [{ title: 'today', start: '2018-12-12' }];

$(document).ready(function () {
  database.ref("events").on("child_added", function (childSnapshot) {
    const child = childSnapshot.val();
    const time = child.eventDate + ', ' + child.eventTime;
    const newTime = moment(time).toISOString();
    const newEvent = {
      title: child.eventName,
      start: newTime
    }
    console.log(time, newTime, newEvent);
    events.push(newEvent);
    console.log(events);
    $('#calendar').fullCalendar({
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: events,
      // [
      //   {
      //     title: 'today',
      //     start: '2018-12-12'
      //   },{
      //     title: 'Food Truck',
      //     start: '2018-12-15T18:00:00.000Z'
      //   }
      // ]
    });
  });
});

