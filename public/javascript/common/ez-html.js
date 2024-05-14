/* DEPRECATED: Do not use this any more, use the tick templates. Example: `<a href="${url}">my url</a>`

/**
 * Provides HTML tag building utilitiy functions.
 *
 * Script:
 * <script data-coreuxjs-order="1" src="/public/javascript/common/ez-html.js?v=r42-3"></script>
 */
class EzHtml {
    constructor() {
        this.ready = false;

        this.NO_ID = null;
        this.NO_CLASS = null;
        this.NO_STYLE = null;
        this.NO_CONTENT = null;
    }

    /**
     * @protected
     * Initializes EzHtml
     * @returns {EzHtml}
     */
    ezInit() {
        var self = ezApi.ezclocker[EzHtml.ezApiName];

        self.ready = true;

        return self;
    }

    /**
     * @protected
     * If stringToEval is empty/null, returns aString. Otherwise, returns bString.
     * @param {string} aString
     * @param {string} bString
     * @returns {string}
     */
    ezIsEmptyAB(stringToEval, aString, bString) {
        aString = ezApi.ezIsEmptyString(aString) ? '' : aString;
        bString = ezApi.ezIsEmptyString(bString) ? '' : bString;

        return ezApi.ezIsEmptyString(stringToEval) ? aString : bString;
    }

    /**
     * @public
     * Returns an HTML tag property with a preceeding space.
     *  {pName}="{pValue}"
     *
     * If pName is null/empty, returns empty string.
     * If pValue is null/empty, returns: {name}
     *
     * @param {null|string} pName
     * @param {string} pValue
     * @returns {string}
     */
    ezProp(pName, pValue) {
        if (ezApi.ezIsNotValid(pName) && ezApi.ezIsNotValid(pValue)) {
            return ''; // passing in null pValue will skip the property
        }
        pValue = window.ezHtml.ezIsEmptyAB(pValue, '', '="' + pValue + '"');
        if (ezApi.ezIsEmptyString(pValue) && ('disabled' != pName)) {
            return ''; // property not valid
        }
        var prop = ' ' + pName + pValue;
        return window.ezHtml.ezIsEmptyAB(pName, '', prop);
    }

    /**
     * @public
     * Returns an HTML tag property with a preceeding space.
     *  {pName}="{pValue}"
     *
     * If pName is null/empty, returns empty string.
     * If pValue is null/empty, returns: {name}
     *
     * @param {null|string} pName
     * @param {string} pValue
     * @returns {string}
     */
    ezProperty(pName, pValue) {
        if (ezApi.ezIsNotValid(pName) && ezApi.ezIsNotValid(pValue)) {
            return ''; // passing in null pValue will skip the property
        }
        pValue = window.ezHtml.ezIsEmptyAB(pValue, '', '="' + pValue + '"');
        if (ezApi.ezIsEmptyString(pValue) && ('disabled' != pName)) {
            return ''; // property not valid
        }
        var prop = ' ' + pName + pValue;
        return window.ezHtml.ezIsEmptyAB(pName, '', prop);
    }

    /**
     * @public
     * Wraps the tagInnerData passed in between < and > characters:
     *
     * <{tagInnerData}>
     *
     * Use ezEndTag or ezx to generate the ending tag as: </{tageInnerData}>
     *
     * NOTE: Does not validate tagInnerData for null.
     *
     * @param {string} tagInnerData
     * @returns {string}
     */
    ezTag(tagInnerData) {
        return '<' + tagInnerData + '>';
    }

    /**
     * @public
     * Wraps the tagInnerData passed in between < and > characters,
     * apppends tagContent, and then wraps htmlTagName in </ and > tags:
     * <{tagInnerData}>{tagContent}</{htmlTagName}>
     *
     * NOTE: Does not validate tagInnerData, tagContent, or htmlTagName for null
     * @param {string} tagInnerData
     * @returns {string}
     */
    ezHtmlTag(tagInnerData, tagContent, htmlTagName) {
        return '<' + tagInnerData + '>' + tagContent + '</' + htmlTagName + '>';
    }

    /**
     * @public
     * Returns the self closing HTML tag:
     * <{tag} id="{id}" class={cssClassesToUse} />
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} additionalProps
     * @returns {string}
     */
    ezc$(htmlTagName, idToUse, cssClassesToUse, additionalProps) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;
        return '<' + htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            additionalProps + '/>';
    }

    /**
     * @public
     * Returns the self closing HTML tag:
     * <{tag} id="{id}" class={cssClassesToUse} />
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} additionalProps
     * @returns {string}
     */
    ezClosedTag(htmlTagName, idToUse, cssClassesToUse, additionalProps) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;
        return '<' + htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            additionalProps + '/>';
    }

    /**
     * @public
     * Returns an open ended HTML tag (with space at end):
     * <{htmlTagName} id="{idToUse}" class="{cssClassesToUse}"
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezo$(htmlTagName, idToUse, cssClassesToUse) {
        return '<' + htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) + ' ';
    }

    /**
     * @public
     * Returns an open ended HTML tag (with space at end):
     * <{htmlTagName} id="{idToUse}" class="{cssClassesToUse}"
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezOpenedTag(htmlTagName, idToUse, cssClassesToUse) {
        return '<' + htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) + ' ';
    }

    /**
     * @public
     * Returns HTML starting tag:
     * <{htmlTagName} id="{idToUse}" class="{cssClassesToUse}">
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezs$(htmlTagName, idToUse, cssClassesToUse) {
        return window.ezHtml.ezTag(
            htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse));
    }

    /**
     * @public
     * Returns HTML starting tag:
     * <{htmlTagName} id="{idToUse}" class="{cssClassesToUse}">
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezStartTag(htmlTagName, idToUse, cssClassesToUse) {
        return window.ezHtml.ezTag(
            htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse));
    }

    /**
     * @public
     * Returns HTML tag ending: </{tag}>
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @returns {string}
     */
    ezx$(htmlTagName) {
        return '</' + htmlTagName + '>';
    }

    /**
     * @public
     * Returns HTML tag ending: </{tag}>
     *
     * Note: htmlTagName is NOT validated for null/empty!
     *
     * @param {string} htmlTagName
     * @returns {string}
     */
    ezEndTag(htmlTagName) {
        return '</' + htmlTagName + '>';
    }

    /**
     * @public
     * Returns the full HTML tag (open and close), with content:
     *
     * <{htmlTagName} id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</{htmlTagName}>
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$(htmlTagName, idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezHtmlTag(
            htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse),
            ezApi.ezIsEmptyString(contentToUse) ? '' : contentToUse,
            htmlTagName);
    }

    /**
     * @public
     * Returns the full HTML tag (open and close), with content:
     *
     * <{htmlTagName} id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</{htmlTagName}>
     *
     * @param {string} htmlTagName
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezFullTag(htmlTagName, idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezHtmlTag(
            htmlTagName +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse),
            ezApi.ezIsEmptyString(contentToUse) ? '' : contentToUse,
            htmlTagName);
    }

    /**
     * @public
     * Starts the HTML table tag:
     *
     * <table id="{idToUse}" class="cssClassesToUse">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    table(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('table', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML table tag:
     *
     * <table id="{idToUse}" class="cssClassesToUse">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezs$Table(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('table', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML td tag: </table>
     * @returns {string}
     */
    xtable() {
        return window.ezHtml.ezx$('table');
    }

    /**
     * @public
     * Ends the HTML td tag: </table>
     * @returns {string}
     */
    ezx$Table() {
        return window.ezHtml.ezx$('table');
    }

    /**
     * @public
     * Returns the full html table tag with content:
     *
     * <table id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</table>
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $table(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('table', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Returns the full html table tag with content:
     *
     * <table id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</table>
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Table(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('table', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Starts the HTML thead tag:
     *
     * <thead id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    thead(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('thead', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML thead tag:
     *
     * <thead id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezs$Thead(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('thead', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML thead tag:
     *
     * </thead>
     *
     * @returns {string}
     */
    xthead() {
        return window.ezHtml.ezx$('thead');
    }

    /**
     * @public
     * Ends the HTML thead tag:
     *
     * </thead>
     *
     * @returns {string}
     */
    ezx$TBody() {
        return window.ezHtml.ezx$('thead');
    }

    /**
     * @public
     * Returns the full html tbody tag with content:
     *
     * <thead id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</thead>
     *
     * NOTE: contentToUse is not validated for null
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $thead(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('thead', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Returns the full html tbody tag with content:
     *
     * <thead id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</thead>
     *
     * NOTE: contentToUse is not validated for null
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Thead(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('thead', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Starts the HTML tbody tag:
    
     * <tbody id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    tbody(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('tbody', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML tbody tag:
    
     * <tbody id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezs$TBody(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('tbody', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML tbody tag:
    
     * </tbody>
    
     * @returns {string}
     */
    xtbody() {
        return window.ezHtml.ezx$('tbody');
    }

    /**
     * @public
     * Returns the full html tbody tag with content:
    
     * <tbody id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</tbody>
     *
     * NOTE: contentToUse is not validated for null
    
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $tbody(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('tbody', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Returns the full html tbody tag with content:
    
     * <tbody id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</tbody>
     *
     * NOTE: contentToUse is not validated for null
    
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Tbody(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('tbody', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Starts the HTML tr tag:
     *
     * <tr id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    tr(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('tr', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML tr tag:
     *
     * <tr id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezs$Tr(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('tr', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML tr tag: </tr>
     *
     * @returns {string}
     */
    xtr() {
        return window.ezHtml.ezx$('tr');
    }

    /**
     * @public
     * Ends the HTML tr tag: </tr>
     *
     * @returns {string}
     */
    ezx$Tr() {
        return window.ezHtml.ezx$('tr');
    }

    /**
     * @public
     * Returns the full html td tag with content:
    
     * <tr id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</tr>
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $tr(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('tr', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Returns the full html td tag with content:
    
     * <tr id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</tr>
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Tr(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('tr', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Starts the HTML td tag:
     *
     * <td id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClasses
     * @returns {string}
     */
    td(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('td', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML td tag:
     *
     * <td id="{idToUse}" class="{cssClassesToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClasses
     * @returns {string}
     */
    ezs$Td(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('td', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML td tag: </td>
    
     * @returns {string}
     */
    xtd() {
        return window.ezHtml.ezx$('td');
    }

    /**
     * @public
     * Ends the HTML td tag: </td>
    
     * @returns {string}
     */
    ezx$Td() {
        return window.ezHtml.ezx$('td');
    }

    /**
     * @public
     * Returns the full html td tag with content:
     *
     * <td id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</td>
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $td(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('td', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Returns the full html td tag with content:
     *
     * <td id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</td>
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Td(idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$('td', idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Starts the HTML div tag:
     *
     * <div id="idToUse" class="cssClassesToUse">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    div(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('div', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML div tag:
     *
     * <div id="idToUse" class="cssClassesToUse">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezsDiv(idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$('div', idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML div tag: </div>
    
     * @returns {string}
     */
    xdiv() {
        return window.ezHtml.ezx$('div');
    }

    /**
     * @public
     * Ends the HTML div tag: </div>
    
     * @returns {string}
     */
    ezxDiv() {
        return window.ezHtml.ezx$('div');
    }

    /**
     * @public
     * Returns the complete DIV tag:
    
     * <div id="idToUse" class="cssClassesToUse">{contentToUse}</div>
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @param {null|string} divStylesToUse
     * @param {null|string} divTitleToUse
     * @returns {string}
     */
    $div(idToUse, cssClassesToUse, contentToUse, divStylesToUse, divTitleToUse) {
        var htmlDiv = window.ezHtml.ezo$('div', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(divTitleToUse)) {
            htmlDiv += window.ezHtml.ezProp('title', divTitleToUse);
        }
        if (ezApi.ezIsNotEmptyString(divStylesToUse)) {
            htmlDiv += window.ezHtml.ezProp('style', divStylesToUse);
        }
        htmlDiv += '>';
        if (ezApi.ezIsNotEmptyString(contentToUse)) {
            htmlDiv += contentToUse;
        }
        htmlDiv += window.ezHtml.ezEndTag('div');

        return htmlDiv;
    }

    /**
     * @public
     * Returns the complete DIV tag:
    
     * <div id="idToUse" class="cssClassesToUse">{contentToUse}</div>
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @param {null|string} divStylesToUse
     * @param {null|string} divTitleToUse
     * @returns {string}
     */
    ezf$Div(idToUse, cssClassesToUse, contentToUse, divStylesToUse, divTitleToUse) {
        var htmlDiv = window.ezHtml.ezo$('div', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(divTitleToUse)) {
            htmlDiv += window.ezHtml.ezProp('title', divTitleToUse);
        }
        if (ezApi.ezIsNotEmptyString(divStylesToUse)) {
            htmlDiv += window.ezHtml.ezProp('style', divStylesToUse);
        }
        htmlDiv += '>';
        if (ezApi.ezIsNotEmptyString(contentToUse)) {
            htmlDiv += contentToUse;
        }
        htmlDiv += window.ezHtml.ezEndTag('div');

        return htmlDiv;
    }

    /**
     * @public
     * Creates an HTML from the provided props object
     *
     * {
     *  id: '{string},
     *  class: '{classToUse}',
     *  style: '{stylesToUse}',
     *  title: '{titleToUse}',
     *  content: [
     *      {contentToUse1},
     *      {contentToUse2}
     *  ]
     * }
     *
     * @param {Object} props
     */
    ezDiv(props) {
        if (ezApi.ezIsNotValid(props)) {
            return window.ezHtml.ezNode({
                tag: 'div'
            });
        }
        props.tag = 'div';
        return window.ezHtml.ezNode(props);
    }

    /**
     * @public
     *
     * Builds an HTML tag from the provided props object. If the provided props object is null or undefined OR
     * the tag property is not provided an empty string is returned.
     *
     * {
     *  tag: '{htmlTagToUse - REQUIRED}',
     *  id: '{idToUse}',
     *  class: '{classToUse}',
     *  style: '{styleToUse}',
     *  content: [
     *      '{contentToUse1}',
     *      '{contentToUse2}
     *  ]
     * }
     */
    ezNode(props) {
        if (ezApi.ezIsNotValid(props) || ezApi.ezIsEmptyString(props.tag)) {
            return '';
        }
        //<div <div Clock In Status</div><div Clock In Status</div></div>
        var htmlNode = '<' + props.tag;

        var tagProps = Object.keys(props);
        tagProps.forEach(function(prop) {
            if ('clazz' === prop) {
                htmlNode += window.ezHtml.ezProp('class', ezApi.ezReturnValidOrNull(props[prop]));
            }
            if ('tag' !== prop && 'content' !== prop) {
                htmlNode += window.ezHtml.ezProp(prop, ezApi.ezReturnValidOrNull(props[prop]));
            }
        });
        htmlNode += '>';

        if (ezApi.ezIsNotEmptyArray(props.content)) {
            props.content.forEach(function(contentToUse) {
                htmlNode += contentToUse;
            });
        }

        htmlNode += '</' + props.tag + '>';

        return htmlNode;
    }

    /**
     * @public
     * Returns the html button start tag:
     * <button id="{idToUse}" class="{cssClassesToUse}" type="{buttonType}" onclick="{onClickToUse}">
     *
     * If buttonType is null or empty, the 'button' value is used.
     * If additionalProps is not null or empty, it is appended to the tag before the closing >
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} buttonType
     * Should be one of: button, reset, submit
     * @param {null|string} additionalProps
     * @returns {string}
     */
    button(idToUse, cssClassesToUse, buttonType, onClickToUse, additionalProps) {
        buttonType = ezApi.ezIsEmptyString(buttonType) ? 'button' : buttonType;
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezs$('button',
            window.ezHtml.ezProp('id', idToUse) +
                window.ezHtml.ezProp('class', cssClassesToUse) +
                window.ezHtml.ezProp('type', buttonType) +
                ezApi.ezIsEmptyString(onClickToUse) ? ' ' : window.ezHtml.ezProp('onclick', onClickToUse) +
                additionalProps);
    }

    /**
     * @public
     * Returns the html button start tag:
     * <button id="{idToUse}" class="{cssClassesToUse}" type="{buttonType}" onclick="{onClickToUse}">
     *
     * If buttonType is null or empty, the 'button' value is used.
     * If additionalProps is not null or empty, it is appended to the tag before the closing >
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} buttonType
     * Should be one of: button, reset, submit
     * @param {null|string} additionalProps
     * @returns {string}
     */
    ezsButton(idToUse, cssClassesToUse, buttonType, onClickToUse, additionalProps) {
        buttonType = ezApi.ezIsEmptyString(buttonType) ? 'button' : buttonType;
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezs$('button',
            window.ezHtml.ezProp('id', idToUse) +
                window.ezHtml.ezProp('class', cssClassesToUse) +
                window.ezHtml.ezProp('type', buttonType) +
                ezApi.ezIsEmptyString(onClickToUse) ? ' ' : window.ezHtml.ezProp('onclick', onClickToUse) +
                additionalProps);
    }

    /**
     * @public
     * Ends the HTML button tag: </button>
     * @returns {string}
     */
    xbutton() {
        return window.ezHtml.ezx$('button');
    }

    /**
     * @public
     * Ends the HTML button tag: </button>
     * @returns {string}
     */
    ezxButton() {
        return window.ezHtml.ezx$('button');
    }

    /**
     * @public
     * Returns the complete button tag:
     * <button id="{idToUse}" class="{cssClassesToUse}" onclick="{onClickToUse}">{contentToUse}</button>
     *
     * If buttonType is null or empty, the 'button' value is used.
     * If additionalProps is not null or empty, it is appended to the tag before the first closing >
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} buttonType
     * Should be one of: button, reset, submit
     * @param {null|string} onClickToUse
     * @param {null|string} additionalProps
     * @param {string} contentToUse
     * @returns {string}
     */
    $button(idToUse, cssClassesToUse, buttonType, onClickToUse, additionalProps,
        contentToUse) {
        buttonType = ezApi.ezIsEmptyString(buttonType) 
            ? 'button' 
            : buttonType;
        return window.ezHtml.ezTag('button ' +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            window.ezHtml.ezProp('type', buttonType) +
            window.ezHtml.ezProp('onclick', onClickToUse) +
            additionalProps) +
            contentToUse +
            '</button>';
    }

    /**
     * @public
     * Returns the complete button tag:
     * <button id="{idToUse}" class="{cssClassesToUse}" onclick="{onClickToUse}">{contentToUse}</button>
     *
     * If buttonType is null or empty, the 'button' value is used.
     * If additionalProps is not null or empty, it is appended to the tag before the first closing >
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} buttonType
     * Should be one of: button, reset, submit
     * @param {null|string} onClickToUse
     * @param {null|string} additionalProps
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Button(idToUse, cssClassesToUse, buttonType, onClickToUse, additionalProps,
        contentToUse) {
        buttonType = ezApi.ezIsEmptyString(buttonType) ? 'button' : buttonType;
        return window.ezHtml.ezTag('button ' +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            window.ezHtml.ezProp('type', buttonType) +
            window.ezHtml.ezProp('onclick', onClickToUse) +
            additionalProps) +
            contentToUse +
            '</button>';
    }

    /**
     * @public
     * Returns the html select start tag:
     * <select id="{idToUse}" class="{cssClassesToUse}" {additionalProps}>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the closing >
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} additionalProps
     * @returns {string}
     */
    select(idToUse, cssClassesToUse, additionalProps) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezs$('select',
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            additionalProps);
    }

    /**
     * @public
     * Returns the html select start tag:
     * <select id="{idToUse}" class="{cssClassesToUse}" {additionalProps}>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the closing >
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} additionalProps
     * @returns {string}
     */
    ezsSelect(idToUse, cssClassesToUse, additionalProps) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezs$('select',
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            additionalProps);
    }

    /**
     * @public
     * Ends the HTML select tag: </select>
     * @returns {string}
     */
    xselect() {
        return window.ezHtml.ezx$('select');
    }

    /**
     * @public
     * Ends the HTML select tag: </select>
     * @returns {string}
     */
    ezxSelect() {
        return window.ezHtml.ezx$('select');
    }

    /**
     * @public
     * Returns the complete select tag:
     * <select id="{idToUse}" class="{cssClassesToUse}" {additionalProps}>{contentToUse}</select>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the first closing >
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} additionalProps
     * @param {string} contentToUse
     * @returns {string}
     */
    $select(idToUse, cssClassesToUse, additionalProps, contentToUse) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezHtml.ezTag('select ' +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            additionalProps) +
            contentToUse +
            '</select>';
    }

    /**
     * @public
     * Returns the complete select tag:
     * <select id="{idToUse}" class="{cssClassesToUse}" {additionalProps}>{contentToUse}</select>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the first closing >
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} additionalProps
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Select(idToUse, cssClassesToUse, additionalProps, contentToUse) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezHtml.ezTag('select ' +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            additionalProps) +
            contentToUse +
            '</select>';
    }

    /**
     * @public
     * Returns the html option start tag:
     * <option id="{idToUse}" class="{cssClassesToUse}" value="{valueToUse}" {additionalProps}>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the closing >
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} valueToUse
     * @param {null|string} additionalProps
     * @returns {string}
     */
    option(idToUse, cssClassesToUse, valueToUse, additionalProps) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezs$('option',
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            window.ezHtml.ezProp('value', valueToUse) +
            additionalProps);
    }

    /**
     * @public
     * Returns the html option start tag:
     * <option id="{idToUse}" class="{cssClassesToUse}" value="{valueToUse}" {additionalProps}>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the closing >
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} valueToUse
     * @param {null|string} additionalProps
     * @returns {string}
     */
    ezsOption(idToUse, cssClassesToUse, valueToUse, additionalProps) {
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezs$('option',
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            window.ezHtml.ezProp('value', valueToUse) +
            additionalProps);
    }

    /**
     * @public
     * Ends the HTML option tag: </option>
     * @returns {string}
     */
    xoption() {
        return window.ezHtml.ezx$('option');
    }

    /**
     * @public
     * Ends the HTML option tag: </option>
     * @returns {string}
     */
    ezxOption() {
        return window.ezHtml.ezx$('option');
    }

    /**
     * @public
     * Returns the complete option tag:
     * <option id="{idToUse}" class="{cssClassesToUse}" value="{valueToUse}" {additionalProps}>{contentToUse}</option>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the first closing >
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} valueToUse
     * @param {null|string} additionalProps
     * @param {string} contentToUse
     * @returns {string}
     */
    $option(idToUse, cssClassesToUse, valueToUse, additionalProps, contentToUse) {
        valueToUse = ezApi.ezIsEmptyString(valueToUse) ? null : valueToUse;
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezHtml.ezTag('option ' +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            window.ezHtml.ezProp('value', valueToUse) +
            additionalProps) +
            contentToUse +
            '</option>';
    }

    /**
     * @public
     * Returns the complete option tag:
     * <option id="{idToUse}" class="{cssClassesToUse}" value="{valueToUse}" {additionalProps}>{contentToUse}</option>
     *
     * If additionalProps is not null or empty, it is appended to the tag before the first closing >
     *
     * NOTE: Content is not validated for null
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} valueToUse
     * @param {null|string} additionalProps
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$Option(idToUse, cssClassesToUse, valueToUse, additionalProps, contentToUse) {
        valueToUse = ezApi.ezIsEmptyString(valueToUse) ? null : valueToUse;
        additionalProps = ezApi.ezIsEmptyString(additionalProps) ? '' : additionalProps;

        return window.ezHtml.ezTag('option ' +
            window.ezHtml.ezProp('id', idToUse) +
            window.ezHtml.ezProp('class', cssClassesToUse) +
            window.ezHtml.ezProp('value', valueToUse) +
            additionalProps) +
            contentToUse +
            '</option>';
    }

    /**
     * @public
     * Starts the HTML tr tag:
     * <h{headerLevel} id="{idToUse}" class="{cssClassesToUse}">
     * If headerLevel is null or not a number, h1 is used.
     *
     * @param {null|number} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    h(headerLevel, idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$(
            'h' + ezApi.ezNumberToStringDefault(headerLevel, '1'),
            idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Starts the HTML tr tag:
     * <h{headerLevel} id="{idToUse}" class="{cssClassesToUse}">
     * If headerLevel is null or not a number, h1 is used.
     *
     * @param {null|number} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @returns {string}
     */
    ezs$H(headerLevel, idToUse, cssClassesToUse) {
        return window.ezHtml.ezs$(
            'h' + ezApi.ezNumberToStringDefault(headerLevel, '1'),
            idToUse, cssClassesToUse);
    }

    /**
     * @public
     * Ends the HTML tr tag: </h{headerLevel}>
     * If headerLevel is null or not a number, h1 is used.
     *
     * @param {null|string} headerLevel
     * @returns {string}
     */
    xh(headerLevel) {
        return window.ezHtml.ezx$('h' + ezApi.ezNumberToStringDefault(headerLevel, '1'));
    }

    /**
     * @public
     * Ends the HTML tr tag: </h{headerLevel}>
     * If headerLevel is null or not a number, h1 is used.
     *
     * @param {null|string} headerLevel
     * @returns {string}
     */
    ezx$H(headerLevel) {
        return window.ezHtml.ezx$('h' + ezApi.ezNumberToStringDefault(headerLevel, '1'));
    }

    /**
     * @public
     * Returns the full html td tag with content:
     * <h{headerLevel} id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</h{headerLevel}>
     *
     * If headerLevel is null or not a number, h1 is used.
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $h(headerLevel, idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$(
            'h' + ezApi.ezNumberToStringDefault(headerLevel, '1'),
            idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Returns the full html td tag with content:
     * <h{headerLevel} id="{idToUse}" class="{cssClassesToUse}">{contentToUse}</h{headerLevel}>
     *
     * If headerLevel is null or not a number, h1 is used.
     *
     * NOTE: contentToUse is not validated for null
     * @param {null|string} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$H(headerLevel, idToUse, cssClassesToUse, contentToUse) {
        return window.ezHtml.ezf$(
            'h' + ezApi.ezNumberToStringDefault(headerLevel, '1'),
            idToUse, cssClassesToUse, contentToUse);
    }

    /**
     * @public
     * Starts the HTML tr tag:
     * <a id="{idToUse}" class="{cssClassesToUse}" href="{hrefToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} hrefToUse
     * @returns {string}
     */
    a(idToUse, cssClassesToUse, hrefToUse) {
        var htmlA = window.ezHtml.ezo$('a', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlA += window.ezHtml.ezProp('href', hrefToUse);
        }

        return htmlA + '>';
    }

    /**
     * @public
     * Starts the HTML tr tag:
     * <a id="{idToUse}" class="{cssClassesToUse}" href="{hrefToUse}">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} hrefToUse
     * @returns {string}
     */
    ezs$A(idToUse, cssClassesToUse, hrefToUse) {
        var htmlA = window.ezHtml.ezo$('a', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlA += window.ezHtml.ezProp('href', hrefToUse);
        }

        return htmlA + '>';
    }

    /**
     * @public
     * Ends the HTML tr tag: </a>
     *
     * @returns {string}
     */
    xa() {
        return window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Ends the HTML tr tag: </a>
     *
     * @returns {string}
     */
    ezx$A() {
        return window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Returns the full html a tag with content:
     * <a id="{idToUse}" class="{cssClassesToUse}" href="{hrefToUse}">{contentToUse}</a>
     *
     * @param {null|string} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $a(idToUse, cssClassesToUse, hrefToUse, contentToUse, stylesToUse,
        titleToUse, onClickToUse) {
        var htmlA = window.ezHtml.ezo$('a', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlA += window.ezHtml.ezProp('href', hrefToUse);
        }
        if (ezApi.ezIsNotEmptyString(stylesToUse)) {
            htmlA += window.ezHtml.ezProp('style', stylesToUse);
        }
        if (ezApi.ezIsNotEmptyString(titleToUse)) {
            htmlA += window.ezHtml.ezProp('title', titleToUse);
        }
        if (ezApi.ezIsNotEmptyString(onClickToUse)) {
            htmlA += window.ezHtml.ezProp('onclick', onClickToUse);
        }
        return htmlA + '>' + contentToUse + window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Returns the full html a tag with content:
     * <a id="{idToUse}" class="{cssClassesToUse}" href="{hrefToUse}">{contentToUse}</a>
     *
     * @param {null|string} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$A(idToUse, cssClassesToUse, hrefToUse, contentToUse, stylesToUse,
        titleToUse, onClickToUse) {
        var htmlA = window.ezHtml.ezo$('a', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlA += window.ezHtml.ezProp('href', hrefToUse);
        }
        if (ezApi.ezIsNotEmptyString(stylesToUse)) {
            htmlA += window.ezHtml.ezProp('style', stylesToUse);
        }
        if (ezApi.ezIsNotEmptyString(titleToUse)) {
            htmlA += window.ezHtml.ezProp('title', titleToUse);
        }
        if (ezApi.ezIsNotEmptyString(onClickToUse)) {
            htmlA += window.ezHtml.ezProp('onclick', onClickToUse);
        }
        return htmlA + '>' + contentToUse + window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Creates an HTML link tag
     * <link href="{herfToUse}"" rel="{relToUse}"" type="{typeToUse}"">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} hrefToUse
     * @returns {string}
     */
    link(hrefToUse, relToUse, typeToUse) {
        var htmlLink = window.ezHtml.ezo$('link', null, null);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlLink += window.ezHtml.ezProp('href', hrefToUse);
        }
        if (ezApi.ezIsNotEmptyString(relToUse)) {
            htmlLink += window.ezHtml.ezProp('rel', relToUse);
        }
        if (ezApi.ezIsNotEmptyString(typeToUse)) {
            htmlLink += window.ezHtml.ezProp('type', typeToUse);
        }

        return htmlLink + '>';
    }

    /**
     * @public
     * Creates an HTML link tag
     * <link href="{herfToUse}"" rel="{relToUse}"" type="{typeToUse}"">
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} hrefToUse
     * @returns {string}
     */
    ezs$Link(hrefToUse, relToUse, typeToUse) {
        var htmlLink = window.ezHtml.ezo$('link', null, null);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlLink += window.ezHtml.ezProp('href', hrefToUse);
        }
        if (ezApi.ezIsNotEmptyString(relToUse)) {
            htmlLink += window.ezHtml.ezProp('rel', relToUse);
        }
        if (ezApi.ezIsNotEmptyString(typeToUse)) {
            htmlLink += window.ezHtml.ezProp('type', typeToUse);
        }

        return htmlLink + '>';
    }

    /**
     * @public
     * Produces the entire image tag
     * <img id="{idToUse}" class="{cssClassesToUse}" src="{srcToUse}" alt="{altToUse}"/>
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} srcToUse
     * @param {null|string} altToUse
     * @returns {string}
     */
    img(idToUse, cssClassesToUse, srcToUse, altToUse, titleToUse) {
        return window.ezHtml.ezClosedTag('img', idToUse, cssClassesToUse,
            window.ezHtml.ezProp('src', srcToUse) +
            window.ezHtml.ezProp('alt', altToUse) +
            window.ezHtml.ezProp('title', titleToUse));
    }

    /**
     * @public
     * Produces the entire image tag
     * <img id="{idToUse}" class="{cssClassesToUse}" src="{srcToUse}" alt="{altToUse}"/>
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {null|string} srcToUse
     * @param {null|string} altToUse
     * @returns {string}
     */
    ezs$Img(idToUse, cssClassesToUse, srcToUse, altToUse, titleToUse) {
        return window.ezHtml.ezClosedTag('img', idToUse, cssClassesToUse,
            window.ezHtml.ezProp('src', srcToUse) +
            window.ezHtml.ezProp('alt', altToUse) +
            window.ezHtml.ezProp('title', titleToUse));
    }

    /**
     * @public
     * Produces the entire input tag
     *
     * If contentToUse is null/empty:
     *
     * <input id="{idToUse}" class="{cssClassesToUse}" type="{inputTypeToUse}"
     *        name={nameToUse} value={valueToUse} style="{stylesToUse}"/>
     *
     * If contentToUse is not null/empty
     * <input id="{idToUse}" class="{cssClassesToUse}" type="{inputTypeToUse}"
     *     name={nameToUse} value={valueToUse} style="{stylesToUse}">
     *     {contentToUse}
     * </input>
     *
     * @param {null|string} idToUse
     * @param {null|string} cssClasssesToUse
     * @param {null|string} inputTypeToUse
     * @param {null|string} nameToUse
     * @param {null|string} valueToUse
     * @param {null|string} stylesToUse
     * @param {null|string} contentToUse
     * @returns {string}
     * HTML input tag.
     */
    $input(idToUse, cssClassesToUse, inputTypeToUse, nameToUse, valueToUse, stylesToUse,
        contentToUse) {
        var inputHtml = window.ezHtml.ezo$('input', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(inputTypeToUse)) {
            inputHtml += window.ezHtml.ezProp('type', inputTypeToUse);
        }
        if (ezApi.ezIsNotEmptyString(nameToUse)) {
            inputHtml += window.ezHtml.ezProp('name', nameToUse);
        }
        if (ezApi.ezIsNotEmptyString(valueToUse)) {
            inputHtml += window.ezHtml.ezProp('value', valueToUse);
        }
        if (ezApi.ezIsNotEmptyString(stylesToUse)) {
            inputHtml += window.ezHtml.ezProp('style', stylesToUse);
        }
        if (ezApi.ezIsNotEmptyString(contentToUse)) {
            inputHtml += '>' + contentToUse + window.ezHtml.ezx$('input');
        } else {
            inputHtml += '/>';
        }

        return inputHtml;
    }

    /**
     * @public
     * Creates an html comment tag:
     * <!-- {comment} -->
     *
     * Note: comment is not validated for null
     * @param {string} comment
     * @returns {string}
     */
    $comment(comment) {
        return window.ezHtml.ezTag('!-- ' + comment + ' --');
    }

    /**
     * @public
     * Creates an html comment tag:
     * <!-- {comment} -->
     *
     * Note: comment is not validated for null
     * @param {string} comment
     * @returns {string}
     */
    ezComment(comment) {
        return window.ezHtml.ezTag('!-- ' + comment + ' --');
    }

    /**
     * @public
     * Wraps valueToWrap in delmited quotes:
     * \'{valueToWrap}\'
     *
     * If otherParams is not null or empty a comma plus the otherParams is appended
     * to the result:
     * \'{valueToWrap}\',{otherParams}
     *
     * For use when inserting JS into html tags like the onclick event handler.
     *
     * @param {string} valueToWrap
     * @param {null|boolean} otherParams
     * @returns {string}
     */
    ezQuoteDelimit(valueToWrap, otherParams) {
        if (ezApi.ezIsEmptyString(valueToWrap)) {
            return valueToWrap;
        }
        if (ezApi.isNotEmptyString(otherParams)) {
            return '\'' + valueToWrap + '\',' + otherParams;
        }
        return '\'' + valueToWrap + '\',';
    }

    /**
     * @public
     * Creates an HTML script tag:
     *
     * <script src="{src}"></script>
     *
     * @param {string|null} src
     *
     * @returns {string}
     */
    ezScript(src) {
        return '<script' + window.ezHtml.ezProp('src', src) + '></script>';
    }

    /**
     * @public
     * Ends the HTML tbody tag:
     *
     * </tbody>
     *
     * @returns {string}
     */
    ezx$TBody() {
        return window.ezHtml.ezx$('tbody');
    }


    /**
     * @public
     * Ends the HTML tr tag: </link>
     *
     * @returns {string}
     */
    xa() {
        return window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Ends the HTML tr tag: </link>
     *
     * @returns {string}
     */
    ezx$A() {
        return window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Returns the full html a tag with content:
     * <a id="{idToUse}" class="{cssClassesToUse}" href="{hrefToUse}">{contentToUse}</a>
     *
     * @param {null|string} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    $a(idToUse, cssClassesToUse, hrefToUse, contentToUse, stylesToUse,
        titleToUse, onClickToUse) {
        var htmlA = window.ezHtml.ezo$('a', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlA += window.ezHtml.ezProp('href', hrefToUse);
        }
        if (ezApi.ezIsNotEmptyString(stylesToUse)) {
            htmlA += window.ezHtml.ezProp('style', stylesToUse);
        }
        if (ezApi.ezIsNotEmptyString(titleToUse)) {
            htmlA += window.ezHtml.ezProp('title', titleToUse);
        }
        if (ezApi.ezIsNotEmptyString(onClickToUse)) {
            htmlA += window.ezHtml.ezProp('onclick', onClickToUse);
        }
        return htmlA + '>' + contentToUse + window.ezHtml.ezx$('a');
    }

    /**
     * @public
     * Returns the full html a tag with content:
     * <a id="{idToUse}" class="{cssClassesToUse}" href="{hrefToUse}">{contentToUse}</a>
     *
     * @param {null|string} headerLevel
     * @param {null|string} idToUse
     * @param {null|string} cssClassesToUse
     * @param {string} contentToUse
     * @returns {string}
     */
    ezf$A(idToUse, cssClassesToUse, hrefToUse, contentToUse, stylesToUse,
        titleToUse, onClickToUse) {
        var htmlA = window.ezHtml.ezo$('a', idToUse, cssClassesToUse);
        if (ezApi.ezIsNotEmptyString(hrefToUse)) {
            htmlA += window.ezHtml.ezProp('href', hrefToUse);
        }
        if (ezApi.ezIsNotEmptyString(stylesToUse)) {
            htmlA += window.ezHtml.ezProp('style', stylesToUse);
        }
        if (ezApi.ezIsNotEmptyString(titleToUse)) {
            htmlA += window.ezHtml.ezProp('title', titleToUse);
        }
        if (ezApi.ezIsNotEmptyString(onClickToUse)) {
            htmlA += window.ezHtml.ezProp('onclick', onClickToUse);
        }
        return htmlA + '>' + contentToUse + window.ezHtml.ezx$('a');
    }
}
EzHtml.ezApiName = 'ezHtml';

document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterNewApi(EzHtml, EzHtml.ezApiName);
    ezApi.ezRegisterWindow(EzHtml.ezApiName, ezApi.ezclocker[EzHtml.ezApiName]);
});