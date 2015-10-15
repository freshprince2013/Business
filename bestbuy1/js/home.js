/**
 * Name: Satish Sekar
 * Home JS file
 */

(function() {
    $(document).ready( function() {
        var container = $("div#container");
        var xml = "xml/" + container.attr('class') + ".xml";
        var str = {};
        var i = 0;

        var updateLanguageStrings = function() {
            i=0;
            $.get(xml, function (data) {/// get the xml data from test.xml
                xml = $($.parseXML(data));// parse the data to xml
                str.language = xml.find('language');
                str.caption = xml.find('caption');
                str.list = xml.find('options');
                str.form = xml.find('form');
                str.options = {};
                str.field = {};

                $.each(str.list[0].childNodes, function () {
                    if (this.nodeName == "option") {
                        str.options[i] = this.innerHTML;
                        i++;
                    }
                });

                i = 0;

                $.each(str.form[0].childNodes, function () {
                    if (this.nodeName == "field") {
                        str.field[i] = this.innerHTML;
                        i++;
                    }

                    if (this.nodeName == "submit") {
                        str.submit = this.innerHTML;
                    }
                });
                fillLangString();
            });
        };

        updateLanguageStrings();

        var fillLangString = function() {
            i=0;
            $("div.languageBlock .label").html(str.language.text());
            $("div.captionBlock span").html(str.caption.text());

            $("div.categoryBlock .cat").each( function() {
                $(this).find(".label a").html(str.options[i]);
                i++;
            });

            i=0;

            $("div.formBlock .input").each( function() {
                $(this).find("input").attr("placeholder", str.field[i]);
                i++;
            });

            $("div.formBlock .submit").find("input").val(str.submit);
        };

        $("div.languageBlock .language").bind("change", function() {
            var opt = $("div.languageBlock .language option:selected").val();
            container.removeClass("en fr").addClass(opt);
            xml = "xml/" + container.attr('class') + ".xml";
            updateLanguageStrings();
        });
    });
})();