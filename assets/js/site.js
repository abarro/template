$(function() {
  $(document).ready(function() {
    // Mobile Menu
    $('.button-menu').on('click', function() {
      $('#top-bar ul').toggleClass('show');
    });

    $('#pictures li a').fancybox({
      afterShow: function() {
        var description = $(this.element).children('img').data('description');
        $('<p>', { html: description, class: 'fancybox-description' }).appendTo($('.fancybox-title'));
      }
    });

    // Append gallery images title and description
    $('#gallery li img').each(function() {
      $img = $(this);
      $li = $img.closest('li');

      $('<h3>', { html: $img.prop('title') }).appendTo($li);
      $('<p>', { html: $img.data('description') }).appendTo($li);
    });
  });
});
