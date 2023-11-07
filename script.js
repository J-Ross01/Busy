$(document).ready(function () {

    function handleSaveClick() {
        var parentID = $(this).parent().attr("id");

        if (!parentID) {
            console.error('Parent ID not found');
            return;
        }

        var hour = parentID.split("-")[1];
        var eventText = $(this).siblings(".description").val();
        var events = JSON.parse(localStorage.getItem("events")) || {};

        events[hour] = eventText;
        localStorage.setItem("events", JSON.stringify(events));

        var toast = new bootstrap.Toast(document.getElementById('eventSavedToast'));
        toast.show();

        $(this).find("i").addClass("saved");
        setTimeout(() => {
            $(this).find("i").removeClass("saved");
        }, 1000);
    }

    function colorCodeBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var hour = parseInt($(this).attr("id").split("-")[1]);
            if (hour < currentHour) {
                $(this).addClass("past");
            } else if (hour === currentHour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            }
        });
    }

    function displaySavedEvents() {
        var events = JSON.parse(localStorage.getItem("events")) || {};

        $(".time-block").each(function () {
            var hour = $(this).attr("id").split("-")[1];
            var savedEvent = events[hour];
            if (savedEvent) {
                $(this).find(".description").val(savedEvent);
            }
        });
    }
    
    $('[data-bs-toggle="tooltip"]').tooltip();
    $(".saveBtn").on("click", handleSaveClick);
    $('#refresh-btn').on('click', function () {
        localStorage.clear();
        location.reload();
    });

    
    displaySavedEvents();

    colorCodeBlocks();
});
