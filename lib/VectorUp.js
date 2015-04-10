(function (mw, $) {

    try {

        /**
         * VectorUp Namespace
         *
         * @type {Object}
         */
        mw.libs.VectorUp = {};

        // QUICK-FIX: The parend container of a select2 widget is a block div by default.
        // This moves potential info icons down to the next row.
        // To avoid this, make the element an inline-block.
        // Since CSS doesn't support selecting a parent, this is done through JavaScript.
        $('sf-select2-container').parent().css({
            'display': 'inline-block'
        });

        // Checklist Hack: If the body contains the word "Checkliste", increase the min-width of the labels
        var bodyClasses = document.body.className;

        if (bodyClasses.indexOf("Checkliste") > -1) {
            console.log('CHECKLIST!');
            $('#sfForm').addClass('checklistForm');

            $('.formdata td').each(function() {
                $(this).addClass($(this).text().trim());
            });
        }


        // Trims all Input fields
        // TODO: REMOVE console.logs in production
        mw.hook('sf.formValidationBefore').add(function() {
            console.log('sf.formValidationBefore');
            var $inputFields = $('#sfForm input');

            $inputFields.each(function() {
                var val = $(this).val();
                var trim = val.trim();
                if (val !== trim) {
                    $(this).val(trim);
                    console.log('Trimmed "' + val + '" to "' + trim + '"');
                }
            });
        });


        var makeTag = function(propertyName, title){

            var el = $('[data-property=' + propertyName + ']');

            if (el && el.length > 0 && el.attr('data-value') === 'Ja') {
                $('#firstHeading').append('<div class="mobo-tag mobo-tag-' + propertyName + '">' + title + '</div>');
            }

        }


        // Tag Quality informations
        if ($('.formdata-Qualitaet').length > 0) {
            makeTag('inBearbeitung', 'IN BEARBEITUNG');
            makeTag('falsch', 'FALSCH');
            makeTag('ungenuegend', 'UNGENÜGEND');
            makeTag('veraltet', 'VERALTET');
        }



    } catch (e) {
        console.error('VectorUp.js crashed');
        console.error(e);
    }

}(mediaWiki, jQuery));