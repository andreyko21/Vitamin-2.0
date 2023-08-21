import $ from 'jquery';

$(document).ready(function () {
  $('.input-block.file .input-block__file-button').on('click', function () {
    $(this)
      .closest('.input-block')
      .find(".input-block__input[type='file']")
      .click();
  });

  $(".input-block.file .input-block__input[type='file']").on(
    'change',
    function () {
      const $inputBlock = $(this).closest('.input-block');
      const $fileNameInput = $inputBlock.find('.input-block__input#fileName');

      const fileName = $(this).val().split('\\').pop();
      $fileNameInput.val(fileName);
    }
  );
});