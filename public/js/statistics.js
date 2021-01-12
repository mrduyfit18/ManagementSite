function DateChange() {
    const option = $('#statistics-option').val();
    const date = $('#datepicker').val();
    if(date.length !== 0) {
        $.ajax({
            url: '/statistics/get',
            type: 'GET',
            method: 'GET',
            data: {
                option: option,
                date: date,
            },
            success: function (result) {
                $('#statistic').html(result);
            }
        });
    }
}
