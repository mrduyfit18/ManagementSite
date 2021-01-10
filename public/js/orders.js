$('#order-status').on('change', function() {
    $.post( window.location.href + "/update", { status: this.value} );
});