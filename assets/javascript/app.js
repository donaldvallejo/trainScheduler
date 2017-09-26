$(document).ready(function () {

	var database = firebase.database();

	var table = $(".table");

	$("#add").on("click", function (event) {
		var name = $("#name").val();
		var destination = $("#destination").val();
		var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequency = $("#frequency").val();

		event.preventDefault();
		database.ref().push({
			name: name,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});
	});

	database.ref().on("child_added", function (childSnapshot) {
		console.log(childSnapshot.val());

				// assign firebase variables to snapshots.
				var fireName = childSnapshot.val().name;
				var fireDestination = childSnapshot.val().destination;
				var fireFrequency = childSnapshot.val().frequency;
				var fireFirstTrain = childSnapshot.val().firstTrain;


				var differenceTimes = moment().diff(moment(fireFirstTrain), "minutes");
				var remainder = moment().diff(moment(fireFirstTrain), "minutes") % fireFrequency ;
				var minutes = fireFrequency - remainder;

				var arrival = moment().add(minutes, "m").format("hh:mm A");
				console.log(minutes);
				console.log(arrival);

				console.log(moment().format("hh:mm A"));
				console.log(arrival);
				console.log(moment().format("X"));

				// Append train data to table
				$(".table").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

	});
});
// var snap = snapshot.val();
//
// var tr = $("<tr>");
// var trainName = $("<td></td>").text(snap.name).addClass("train");
// var trainDestination = $("<td></td>").text(snap.destination).addClass("train");
// var firstTrainTime = $("<td></td>").text(snap.firstTrainTime).addClass("train");
// var nextArrival = $("<td></td>").text("test").addClass("train");
// var frequency = $("<td></td>").text(snap.frequency).addClass("train");
//
// tr.append(trainName);
// tr.append(trainDestination);
// tr.append(firstTrainTime);
// tr.append(nextArrival);
// tr.append(frequency);
// table.append(tr);
