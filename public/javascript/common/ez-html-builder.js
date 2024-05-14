/**
 * Creates a new instance of EzHtmlBuilder
 * Assists in build html within Javascript code.
 *
 * @returns {EzHtmlBuilder}
 */
function EzHtmlBuilder() {
    this.ready = true;

    this.ezHtml = '';

    /**
     * Builds a new elementId from the current date that should be 'mostly' unique.
     *
     * @returns {String}
     */
    this.ezNewElementId = function() {
        var cDate = new Date();
        return 'EzHtmlBuilder' + cDate.getUTCFullYear() + cDate.getUTCMonth() + cDate.getUTCDay() + cDate.getUTCHours() +
            cDate.getUTCMinutes() + cDate.getUTCSeconds() + cDate.getUTCMilliseconds();
    };

    /**
     * @public
     * Returns the provided aId if not null, undefined, or empty. Otherwise, returns this.ezNewElementId() result.
     *
     * @param {String|null|undefined} aId
     *
     * @returns {String}
     */
    this.ezElementId = function(aId) {
        return 'undefined=' === aId || null === aId || 0 === aId.length
            ? this.ezNewElementId()
            : aId;
    };

    /**
     * @public
     * Creates a new props object and it's id property is set equal to EzHtmlBuilder.ezElementId(aId)
     *
     * @param {String|undefined|null} aId
     *
     * @returns {String}
     */
    this.ezCreateProps = function(aId) {
        return null === aId || 'undefined=' === aId || 0 >= aId.length
            ? {
                id: this.ezNewElementId()
            }
            : {
                id: this.ezElementId(aId)
            };
    };

    /**
     * If the aProps is null or undefined then ezCreateProps is set equal to EzHtmlBuilder.ezCreateProps(aId)
     * If aProps's id property is null, undefined, or empty property then set to EzHtmlBuilder.ezElementId(aId).
     *
     * Finally, the aProps object is returned.
     *
     * @param {String|null|undefined} aId
     * @param {Object|null|undefined} aProps
     *
     * @returns {String}
     */
    this.ezProps = function(aProps, aId) {
        if (!aProps) {
            return this.ezCreateProps(aId);
        }

        if ('undfined' == aProps.id || null == aProps.id || 0 === aProps.id.length) {
            aProps.id = this.ezElementId(aId);
        }

        return aProps;
    };

    /**
     * Builds an HTML tag
     *
     * @param {*} elementName
     * @param {*} elementProps
     *
     * @returns {String}
     * "<{elementName {elementProps...}>{elementProps.content}</elementName>"
     */
    this.ezElement = function(elementName, elementProps) {
        if (!elementName || 0 === elementName.lenth) {
            // Mising the element name
            throw {
                errorCode: 500,
                message: 'A valid elementName param is required in call to EzHtmlBuilder.ezElement()'
            };
        }

        this.ezHtml += '<' + elementName + ' ';
        var contentToUse = null;

        if (elementProps) {
            for (var propName in elementProps) {
                if (ezApi.ezHasOwnProperty(elementProps, propName)) {
                    var propValue = elementProps[propName];
                    if ('content' === propName) {
                        contentToUse = propValue;
                    } else {
                        this.ezHtml += propName;
                        this.ezHtml += null !== propValue
                            ? '="' + propValue + '" '
                            : ' ';
                    }
                }
            }
        }

        this.ezHtml += contentToUse && 0 !== contentToUse.length
            ? '>' + contentToUse + '</' + elementName + '>'
            : '/>';

        return this;
    };

    /**
     * @public
     * Builds the HTML <div> tag
     *
     * @param {*} id
     * @param {*} aProps
     *
     * @returns {String}
     * "<div {props...}>{props.content}</div>"
     */
    this.ezDiv = function(id, aProps) {
        this.ezElement('div', this.ezProps(aProps, id));
        return this;
    };

    /**
     * @public
     * Builds the HTML <button> tag.
     *
     * @param {String|null|undefined*} id
     * @param {*} aProps
     *
     * @returns {String}
     * "<button {props...}>{props.content}</button>"
     */
    this.ezButton = function(id, aProps) {
        this.ezElement('button', this.ezProps(aProps, id));
        return this;
    };

    this.ezTable = function(id, aProps) {
        this.ezElement('table', this.ezProps(aProps, id));
        return this;
    };
    this.ezTable = function(id, aProps) {
        this.ezElement('tr', this.ezProps(aProps, id));
        return this;
    };
    this.ezTable = function(id, aProps) {
        this.ezElement('td', this.ezProps(aProps, id));
        return this;
    };

    this.ezSelect = function(id, aProps) {
        this.ezElement('select', this.ezProps(aProps, id));
        return this;
    };
    this.ezOption = function(id, aProps) {
        this.ezElement('option', this.ezProps(aProps, id));
        return this;
    };

    this.ezSpan = function(id, aProps) {
        this.ezElement('span', this.ezProps(aProps, id));
        return this;
    };

    this.ezLabel = function(id, aProps) {
        this.ezElement('label', this.ezProps(aProps, id));
        return this;
    };

    /**
     * Appends the provided  rawText as-is to the html.
     * @param {String} rawText
     */
    this.ezRaw = function(rawText) {
        this.ezHtml += rawText;
    };

    /**
     * Builds the html <img> tag
     *
     * @param {String|null|undefined} id
     * @param {Object|null|undefined} aProps
     *
     * @returns {String}
     * "<img {aProps...} />"
     */
    this.ezImg = function(id, aProps) {
        aProps.content = null;
        this.ezElement('img', this.ezProps(aProps, id));
        return this;
    };

    /**
     * @public
     * Builds the HTML comment <!-- --> tag.
     *
     * @param {String|undefined|null} comment
     *
     * @returns {String}
     * "<!-- {comment} -->"
     */
    this.ezComment = function(comment) {
        if (!comment || 0 === comment.length) {
            this.html += '<!-- -->';
        }

        this.html += '<!-- ' + comment + ' -->';
        return this;
    };

    /**
     * @public
     * Returns the HTML string
     *
     * @returns {String}
     */
    this.ezBuild = function() {
        return this.ezHtml;
    };

    return this;
}

/**
 * Register with ezApi
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterApi('ezHtml', function ezHtml() {
        return new EzHtmlBuilder();
    });
});