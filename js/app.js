$(document).ready(function () {
    var $form = $('form');
    var $formgroups = $($form).find('.form-group');
    var $inputFields = $($formgroups).find('input');
    var $selectFields = $($formgroups).find('select');
    var $radioFields = $($form).find('input:radio');
    var $checkBoxFields = $($form).find('input:checkbox');

    /**
     * create new span element with error message for the passed in element
     * that user not enter value
     * ex: input & select element 
     */
    function createErrorMessageForInputAndSelectFields(element) {
        var $this = element;
        var $dataAttribute = $($this).attr('data-error-text');
        var $idAttribute = $($this).attr('id');
        var $errorMessage = $dataAttribute ? $dataAttribute : $idAttribute + ' is required.';
        var $currentParent = $($this).parent();
        if (!$($this).val().trim()) {
            var $errorSpan = $('<span class="error">' + $errorMessage + '</span>');
            if ($($currentParent).find('span.error').length === 0) {
                $($currentParent).append($errorSpan);
            }
        } else {
            $($currentParent).find('span.error').hide();
        }
    }

    /**
     * create new span element with error message for the passed in element
     * that user not select radio
     * ex: input type radio button
     */
    function createErrorMessageForRadioFields(element) {
        var $this = element;
        var $dataAttribute = $($this).attr('data-error-text');
        var $idAttribute = $($this).attr('id');
        var $errorMessage = $dataAttribute ? $dataAttribute : $idAttribute + ' is required.';
        var $parentElement = $($this).parent().parent();
        if (!$($this).prop('checked')) {
            var $errorSpan = $('<span class="error">' + $errorMessage + '</span>');
            if ($($parentElement).find('span.error').length === 0) {
                $($parentElement).append($errorSpan);
            }
        } else {
            $($parentElement).find('span.error').hide();
        }
    }

    $($form).on('submit', function (event) {
        event.preventDefault();

        $($inputFields).each(function (index, element) {
            createErrorMessageForInputAndSelectFields(element);
        });

        $($selectFields).each(function (index, element) {
            createErrorMessageForInputAndSelectFields(element);
        });

        $($radioFields).each(function (index, element) {
            createErrorMessageForRadioFields(element);
        });

        $($checkBoxFields).each(function (index, element) {
            createErrorMessageForRadioFields(element);
        });
    });
});