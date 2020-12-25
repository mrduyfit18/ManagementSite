function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            $('#coverImage').attr('src', e.target.result);

        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#cover").change(function() {
    $('#coverImage')[0].hidden = false;
    readURL(this);
});



function addPreview(input) {
    let count = 0;
    const preview = document.getElementById('previewProductImages');
    const { files } = input

    Array.from(files).forEach(file => {
        const reader = new FileReader()

        reader.onload = e => {
            const img = document.createElement('img')

            img.src = e.target.result
            img.width = 200
            img.height = 200
            img.alt = `file-${++count}`

            preview.appendChild(img)
        }

        reader.readAsDataURL(file)
    })
}