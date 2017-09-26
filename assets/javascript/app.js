$(document).ready(function () {

	var database = firebase.database();

	var table = $(".table");

	database.ref().on("child_added", function (snapshot) {

		var snap = snapshot.val();

		var tr = $("<tr>");
		var trainName = $("<td></td>").text(snap.name).addClass("train");
		var trainDestination = $("<td></td>").text(snap.destination).addClass("train");
		var firstTrainTime = $("<td></td>").text(snap.firstTrainTime).addClass("train");
		var nextArrival = $("<td></td>").text("test").addClass("train");
		var frequency = $("<td></td>").text(snap.frequency).addClass("train");

		tr.append(trainName);
		tr.append(trainDestination);
		tr.append(firstTrainTime);
		tr.append(nextArrival);
		tr.append(frequency);
		table.append(tr);

	});

	$("#add").on("click", function (event) {
		var name = $("#name").val();
		var destination = $("#destination").val();
		var firstTrainTime = $("firstTrainTime").val();
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
	var currentTime = (moment().format("m/d/YY hh:mm A"));
	console.log(currentTime);

// for remove button
	// $("body").on("click", ".remove-train", function(){
	//      $(this).closest ('tr').remove();
	//      getKey = $(this).parent().parent().attr('id');
	//      dataRef.child(getKey).remove();
});
