// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
    var currentHour = dayjs().format("HH");

    var scheduleContainer = $("#schedule-container");
    for (i=0; i<scheduleContainer.children().length; i++) {
        applyTimeClass(scheduleContainer.children()[i], currentHour);
    }
    
    function applyTimeClass(scheduleBlock, currentHour) {
        var blockHour = $(scheduleBlock).attr('id').slice(-2);

        // If currentHour is greater than blockHour, then blockHour is in the past
        console.log(currentHour > blockHour);
        console.log(currentHour < blockHour);
        if (currentHour > blockHour) {
            $(scheduleBlock).addClass("past");
        }

        // If currentHour is less than blockHour, then blockHour is in the future
        else if (currentHour < blockHour) {
            $(scheduleBlock).addClass("future");
        }

        // Otherwise, this is the present time
        else {
            $(scheduleBlock).addClass("present");
        }
    };

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
