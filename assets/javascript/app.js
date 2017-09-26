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

				var fireName = childSnapshot.val().name;
				var fireDestination = childSnapshot.val().destination;
				var fireFrequency = childSnapshot.val().frequency;
				var fireFirstTrain = childSnapshot.val().firstTrain;

				var differenceTimes = moment().diff(moment(fireFirstTrain), "minutes");
				var remainder = moment().diff(moment(fireFirstTrain), "minutes") % fireFrequency ;
				var minutes = fireFrequency - remainder;
				var arrival = moment().add(minutes, "m").format("hh:mm A");
				$(".table").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
	});
});
