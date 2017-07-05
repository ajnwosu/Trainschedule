// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6fLKGLhqdIih3ud3rbHcHVp41eFbhnxo",
    authDomain: "aj-awesome-project.firebaseapp.com",
    databaseURL: "https://aj-awesome-project.firebaseio.com",
    projectId: "aj-awesome-project",
    storageBucket: "aj-awesome-project.appspot.com",
    messagingSenderId: "738648408624"
  };
  firebase.initializeApp(config)

  var database = firebase.database();

// 2. Create button for adding new trains - then update the html + update the databas

$("#add-Train-btn").on('click',function(event){

 // Grabs user input
  var trainName = $("#Train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainfirst = moment($("#first-input").val().trim(), "DD/MM/YY").format("X");
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
 console.log("newTrain: " + newTrain);
  console.log("Name: " + newTrain.name);
  console.log("Destination: " +  newTrain.destination);
  console.log("First Time:" + newTrain.first);
  console.log("Frequency: " +newEmp.frequency);




  // Alert
  alert("train  added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create a way to retrieve employees from the employee database.



database.ref().on("child_added", function(childSnapshot, prevChildKey) {

 console.log("Child Snapshot Value: " + childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;


  console.log (trainName);
  console.log (trainDes);
  console.log (trainFirst);
  console.log (trainFreq)

// 4. Create a way to calculate the Train time srrival. Using difference between start and current time.

 // Current Time
var currentTime = moment();
  console.log(moment(currentTime).format("hh:mm"));

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "days");
console.log(firstTimeConverted);

 // Time apart (remainder)
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime)

  // Calculate  when the next train will arrive
  // To calculate the months worked
  var timeRemainder =  diffTime % trainFreq;
  console.log("Time Til Train: " + timeRemainder);

  // Calculate the total billed rate
 var minutes = trainFreq - timeRemainder;
 console.log("MINUTES TILL TRAIN: " + minutes);


  var nextArrival = moment().add(minutes, "minutes");
  console.log("Next arrival: " + moment(nextArrival).format("hh:mm"));
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed


// Add each train's data into the table
  // $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" +
  // diffTime + "</td><td>" + timeRemainder + "</td><td>" + nextArrival + "</td><td>" + nextArrival+ "</td></tr>");


  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes  + "</td><td>" + trainFreq + "</td><td>" + moment(nextArrival).format("hh:mm") + "</td><td>" + minutes);

  return false;