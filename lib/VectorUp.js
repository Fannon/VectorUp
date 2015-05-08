(function (mw, $) {

    try {

        /**
         * VectorUp Namespace
         *
         * @type {Object}
         */
        mw.libs.VectorUp = {};



        // Add View / Formedit button to main hierachy of chameleon menu
        if ($('#ca-nstab-main').length > 0 && !($('body').hasClass('action-view'))) {
            $($('.navbar-collapse > .navbar-nav')[1]).append($('#ca-nstab-main').clone());
        }
        if ($('#ca-form_edit').length > 0 && !($('body').hasClass('action-formedit'))) {
            $($('.navbar-collapse > .navbar-nav')[1]).append($('#ca-form_edit').clone());
        }







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

        $('.smwtable td:contains("falsch")').addClass('td-false');
        $('.smwtable td:contains("wahr")').addClass('td-true');


        // Trims all Input fields
        // TODO: REMOVE console.logs in production
        // mw.hook('sf.formValidationBefore').add(function() {
        //     console.log('sf.formValidationBefore');
        //     var $inputFields = $('#sfForm input');

        //     $inputFields.each(function() {
        //         var val = $(this).val();
        //         var trim = val.trim();
        //         if (val !== trim) {
        //             $(this).val(trim);
        //             console.log('Trimmed "' + val + '" to "' + trim + '"');
        //         }
        //     });
        // });


        var makeTag = function(propertyName, title){

            var el = $('[data-property=' + propertyName + ']');

            if (el && el.length > 0 && el.attr('data-value') === 'Ja') {
                url = mw.config.get('wgScript') + '/Spezial:Suche_mittels_Attribut/' + propertyName + '/wahr';
                $('#firstHeading').append('<a class="mobo-tag mobo-tag-' + propertyName + '" href="' + url + '">' + title + '</div>');
            }

        }


        // Tag Quality informations
        if ($('.formdata-Qualitaet').length > 0) {
            makeTag('inBearbeitung', 'In Bearbeitung');
            makeTag('falsch', 'Vermutlich falsch');
            makeTag('ungenuegend', 'Ungenügend');
            makeTag('veraltet', 'Veraltet');

            // Free tags (semicolon separated list)
            var tags = $('[data-property=tag]');
            if (tags.length > 0) {
                var val = tags.attr('data-value');

                if (val.trim()) {
                    $.each(val.split(';'), function(index, value) {
                        value = value.trim();
                        url = mw.config.get('wgScript') + '/Spezial:Suche_mittels_Attribut/Tag/' + value;
                        $('#firstHeading').append('<a class="mobo-tag mobo-tag-tag" href="' + url + '">' + value + '</a>');
                    });
                }


            }
        }


        $(document).ready(function() {

            // Hide empty tables
            $('.wikitable.formdata').each(function(i, el) {
                // console.log(el);
            });

            // Hide empty tabs
            var $headertabs = $('#headertabs')
            if ($headertabs.length > 0) {
                var style = '<style>';

                $headertabs.children().each(function(i, el) {

                    // Hide all Tabs that don't contain data from forms or ask queries
                    if (el.id) {
                        console.log(el.id);
                        var formContent = $(el).find('.formdata, .smwtable');
                        if (formContent.length === 0) {
                            console.log('Hiding Tab: ' + el.id);
                            style += 'li[aria-controls=' + el.id + '] {display: none;} ';
                        }
                    }

                });
                style += '</style>';
                $('html > head').append($(style));
            }
        });



    } catch (e) {
        console.error('VectorUp.js crashed');
        console.error(e);
    }

}(mediaWiki, jQuery));