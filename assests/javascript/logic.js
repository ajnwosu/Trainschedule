
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtAkcDZ27ZXtESdqiiuGoqHTNZZQAUPKI",
    authDomain: "traingame-5ed7d.firebaseapp.com",
    databaseURL: "https://traingame-5ed7d.firebaseio.com",
    projectId: "traingame-5ed7d",
    storageBucket: "",
    messagingSenderId: "855122759288"
  };
  firebase.initializeApp(config);
  

  var database = firebase.database();

  console.log(database)

// 2. Create button for adding new trains - then update the html + update the databas

$("#add-Train-btn").on('click',function(event){

  event.preventDefault()

 // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainfirst = moment($("#first-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  var trainfreq = $("#frequency-input").val().trim();



  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDes,
    first: trainfirst,
    frequency: trainfreq
  };

   // Uploads train data to the database
  database.ref().push(newTrain);

// Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newEmp.frequency);




  // Alert
  alert("Train added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
  return false;
});

// 3. Create a way to retrieve employees from the employee database.



database.ref().on("child_added", function(childSnapshot, prevChildKey) {

 alert(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainfirst = childSnapshot.val().first;
  var trainfreq = childSnapshot.val().frequency;



  console.log (trainName);
  console.log (trainDes);
  console.log (trainfirst);
  console.log (trainfreq)

// 4. Create a way to calculate the months worked. Using difference between start and current time.

 // Prettify the employee start
  var diffTime = moment().diff(moment.unix(trainfirst), "minutes");

  // Calculate  when the next train will arrive
  // To calculate the months worked
  var timeRemainder = moment().diff(moment.unix(trainfirst, "X"), "minutes") % trainfreq;
  console.log(timeRemainder);

  // Calculate the total billed rate
 var minutes = trainfreq - timeRemainder;
  console.log(minutes);


  var nextArrival = moment().add(minutes, "m").format("hh:mm A");

  console.log(nextArrival);
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Append train info to table on page
    // $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" +  trainDes + "</td><td>" + trainFreq + " mins" + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");

// Add each train's data into the table
  $("#Train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" +
  diffTime + "</td><td>" + timeRemainder + "</td><td>" + nextArrival + "</td><td>" + nextArrival+ "</td></tr>");

});

