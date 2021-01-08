$('#add-manufacturer-form').submit(function(){
    event.preventDefault();
    const data = new FormData(this);
    $.ajax({
        url: '/products/add-manufacturer',
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        method: 'POST',
        data: data,
        success: function (result) {
            const option = new Option(result.name, result._id);
            $(option).html(result.name);
            $("#manufacturer").append(option);
            $("#Manufacturer-Modal").modal('hide');
            $('#add-manufacturer-form').trigger('reset');
        }
    });
})