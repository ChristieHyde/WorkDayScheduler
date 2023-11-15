// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var scheduleContainer = $("#schedule-container");
    var dayHeadingEl = $("#current-day");

    var currentDate = dayjs().format("dddd, MMMM D");
    var currentDay = parseInt(dayjs().format("D"));
    var currentHour = dayjs().format("HH");

    // Display the current day at the top of the page
    currentDate += getDateSuffix(currentDay);
    $(dayHeadingEl).text(currentDate);

    // Apply the styling to the blocks, dependent on the current time
    for (i=0; i<scheduleContainer.children().length; i++) {
        applyTimeClass(scheduleContainer.children()[i], currentHour);
    }

    // Add event listener to the schedule container
    scheduleContainer.on("click", function(event) {
        if(event.target.matches(".saveBtn")) {
            saveEvent($(event.target).parent());
        }
    });

    // Load events from local storage to the page
    loadEvents();

    // Function to get 'st', 'nd', or 'th' suffix for the date display
    function getDateSuffix(day) {
        var st = [1, 21, 31];
        var nd = [2, 22];

        if (st.find((d) => day === d)) {
            return "st";
        } else if (nd.find((d) => day === d)) {
            return "nd";
        } else {
            return "th";
        }
    }
    
    // Function to add the past, present or future class to determine the style color
    function applyTimeClass(scheduleBlock, currentHour) {
        var blockHour = $(scheduleBlock).attr('id').slice(-2);

        // If currentHour is greater than blockHour, then blockHour is in the past
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
    }

    // Function to save the contents of a text area to local storage as a calendar event
    function saveEvent(block) {
        var id = block.attr("id");
        var textBlockEl = $(block.children(".description")[0]);
        var calendarEvent = textBlockEl.val();

        localStorage.setItem(id, calendarEvent);
    }

    // Function to load the calendar events in local storage to the page
    function loadEvents() {
        for (i = 9; i < 18; i++) {
            var hourId = "hour-" + i.toLocaleString('en-US',
            {minimumIntegerDigits: 2, useGrouping: false})
            if (localStorage.hasOwnProperty(hourId)) {
                var hourBlockEl = $("#" + hourId);
                var hourTextEl = $(hourBlockEl.children(".description")[0]);
                hourTextEl.val(localStorage[hourId]);
            }
        }
    }
});
