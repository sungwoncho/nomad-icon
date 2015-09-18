$(document).ready(function () {
  function updateEmbedCode() {
    var type = $('.type-select').val();

    $.get('/icon?type=' + type, function (code) {
      $('.embed-code').val(code);
    });
  }

  // Initialize the embed code
  updateEmbedCode();

  // Update embed code on every selection
  $('.type-select').change(updateEmbedCode);

  $(document).on('click', '.embed-code', function () {
    this.select();
  });

  $(document).on('submit', '.location-form', function (e) {
    e.preventDefault();

    var form = $(this);
    var location = $('input[name=location]').val();

    $.ajax({
      url: form.attr('action'),
      type: 'PUT',
      data: form.serialize(),
      success: function (result) {
        var preview = $('.icon-preview');
        var currentSrc = preview.attr('src');

        // Refresh the preview
        preview.attr('src', currentSrc + '?timestamp' + new Date().getTime());
      }
    });
  });
});
