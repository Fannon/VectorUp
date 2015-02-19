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

        }

    } catch (e) {
        console.error('VectorUp.js crashed');
        console.error(e);
    }

}(mediaWiki, jQuery));