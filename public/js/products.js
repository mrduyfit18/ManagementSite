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


function filterChanged(sortOption) {
    const manufacturer = $('#manufacturer-select').val()
    const type = $('#type-select').val();
    const name = $('#searchTextBox').val();
    let queryString = '?';
    if(name !== '') {
        queryString += 'name=' + name + '&';
    }

    if (type !== '') {
        queryString += "type=" + type + '&';
    }
    if (manufacturer !== '') {
        queryString += "manufacturer=" + manufacturer + '&';
    }
    queryString += 'page=1';

    $.ajax({
        url: '/products/get' + queryString,
        type: 'GET',
        method: 'GET',
        success: function (result) {
            $('#productsList').html(result);
            window.history.pushState("object or string", "Title", queryString);
        }
    });

}
