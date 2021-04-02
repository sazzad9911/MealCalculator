$(document).ready(function() {
    // screen lock delete----
    $('.lock').click(function(e) {
        var container = $(".notify");

        // If the target of the click isn't the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.lock').hide();
        }
    });
    // add meal button

});