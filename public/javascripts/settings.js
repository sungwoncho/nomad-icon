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
});
