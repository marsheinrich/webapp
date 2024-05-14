/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *     ENGINEERING NOTES
 *     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *     DO NOT IMPORT THE FOLLOWING INTO THIS CLASS:14222222222
 *     import { ... } from '/ezlibrary/helpers/EzHelpers.js'
 *     import { EzApi } from '/public/common/javascript/ezapi.js';
 *     import { EzUI } from '/public/common/javascript/ezui.js';
 *     import { ezUI } from '/public/common/javascript/ezui.js';
 *     import { EzArray } from '/ezlibrary/helpers/EzArray.js';
 *     import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';
 *     import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
 *     import { EzJson } from '/ezlibrary/helpers/EzJson.js';
 *     import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
 *     import { EzAsync } from '/ezlibrary/helpers/EzAsync.js';
 *     import { EzHtmlChar } from '/public/javascript/common/ez-html-char.js';
 *     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @format
 */

import { moment } from 'moment';
import { decode, encode } from 'html-entities';

import { EzBadParamException } from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzRegEx } from '/ezlibrary/helpers/EzRegEx.js';

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * A class of static utility methods and/or properties for string types.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into non-helper classes with:
 *     import {
 *         // ... other helper classes ...,
 *         EzString
 *     } from '/ezlibrary/helpers/EzHelpers.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into other helper classes (that allow it) with:
 *     import { EzString } from '/ezlibrary/helpers/EzString.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static access:
 *     EzString.{property or method}
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzString extends EzStaticClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the empty string value
     * @returns {string}
     */
    static get EMPTY() {
        return '';
    }

    /**
     * @static
     * @public @method
     * Removes all spaces and \n and \r characters from the provided string
     * @value {string} value
     * @returns {string}
     */
    static removeAllSpacesReturnsLineFeeds(value) {
        return EzString.hasLength(value)
            ? value.trim().replaceAll(' ', EzString.EMPTY).replaceAll('\n', EzString.EMPTY).replaceAll('\r', EzString.EMPTY)
            : value;
    }

    /**
     * @static
     * @public @method
     * Removes all spaces from the provided string
     * @value {string} value
     * @returns {string}
     */
    static removeAllSpaces(value) {
        return EzString.hasLength(value) ? value.trim().replaceAll(' ', EzString.EMPTY) : value;
    }

    /**
     * @static
     * @public @method
     * Removes all \n and \r characters from the provided string
     * @value {string} value
     * @returns {string}
     */
    static removeAllReturnsLineFeeds(value) {
        return EzString.hasLength(value) ? value.replaceAll('\n', EzString.EMPTY).replaceAll('\r', EzString.EMPTY) : value;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets string 'n/a' placeholder for data that is 'not available'
     * @returns {string}
     * @deprecated
     * Migrate to:
     *  EzString.NA
     */
    static get na() {
        return EzString.NA;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets string 'n/a' placeholder for data that is 'not available'
     * @returns {string}
     */
    static get NA() {
        return 'n/a';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets string '-' placeholder for data that is 'not available'
     * @returns {string}
     */
    static get DASH() {
        return '-';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the map of HTML character code to character
     * Some mappings not supported (such as @nbsp; )
     * @returns {object}
     */
    static get HTML_ENCODED_CHAR_TO_CHAR_MAP() {
        return {
            // Entity Names
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '2&quote': '"',
            //'&OElig;': '',
            '&oelig;': 'œ',
            '&Scaron;': 'Š',
            '&scaron;': 'š',
            '&Yuml;': 'Ÿ',
            '&fnof;': 'ƒ',
            '&circ;': 'ˆ',
            '&tilde;': '˜',
            //'&ensp;': '',
            //'&emsp;': '',
            //'&thinsp;': '',
            //'&zwnj;': '‌',
            //'&zwj;': '‍',
            //'&lrm;': '‎',
            //'&rlm;': '‏',
            '&ndash;': '–',
            '&mdash;': '—',
            '&lsquo;': '‘',
            '&rsquo;': '’',
            '&sbquo;': '‚',
            '&ldquo;': '“',
            '&rdquo;': '”',
            '&bdquo;': '„',
            '&dagger;': '†',
            '&Dagger;': '‡',
            '&bull;': '•',
            '&hellip;': '…',
            '&permil;': '‰',
            '&prime;': '′',
            '&Prime;': '″',
            '&lsaquo;': '‹',
            '&rsaquo;': '›',
            '&oline;': '‾',
            '&euro;': '€',
            '&trade;': '™',
            '&larr;': '←',
            '&uarr;': '↑',
            '&rarr;': '→',
            '&darr;': '↓',
            '&harr;': '↔',
            '&crarr;': '↵',
            '&lceil;': '⌈',
            '&rceil;': '⌉',
            '&lfloor;': '⌊',
            '&rfloor;': '⌋',
            '&loz;': '◊',
            '&spades;': '♠',
            '&clubs;': '♣',
            '&hearts;': '♥',
            '&diams;': '♦',
            '&forall;': '∀',
            '&part;': '∂',
            '&exist;': '∃',
            '&empty;': '∅',
            '&nabla;': '∇',
            '&isin;': '∈',
            '&notin;': '∉',
            '&ni;': '∋',
            '&prod;': '∏',
            '&sum;': '∑',
            '&minus;': '−',
            '&lowast;': '∗',
            '&radic;': '√',
            '&prop;': '∝',
            '&infin;': '∞',
            '&ang;': '∠',
            '&and;': '∧',
            '&or;': '∨',
            '&cap;': '∩',
            '&cup;': '∪',
            '&int;': '∫',
            '&there4;': '∴',
            '&sim;': '∼',
            '&cong;': '≅',
            '&asymp;': '≈',
            '&ne;': '≠',
            '&equiv;': '≡',
            '&le;': '≤',
            '&ge;': '≥',
            '&sub;': '⊂',
            '&sup;': '⊃',
            '&nsub;': '⊄',
            '&sube;': '⊆',
            '&supe;': '⊇',
            '&oplus;': '⊕',
            '&otimes;': '⊗',
            '&perp;': '⊥',
            '&sdot;': '⋅',
            '&Alpha;': 'Α',
            '&Beta;': 'Β',
            '&Gamma;': 'Γ',
            '&Delta;': 'Δ',
            '&Epsilon;': 'Ε',
            '&Zeta;': 'Ζ',
            '&Eta;': 'Η',
            '&Theta;': 'Θ',
            '&Iota;': 'Ι',
            '&Kappa;': 'Κ',
            '&Lambda;': 'Λ',
            '&Mu;': 'Μ',
            '&Nu;': 'Ν',
            '&Xi;': 'Ξ',
            '&Omicron;': 'Ο',
            '&Pi;': 'Π',
            '&Rho;': 'Ρ',
            '&Sigma;': 'Σ',
            '&Tau;': 'Τ',
            '&Upsilon;': 'Υ',
            '&Phi;': 'Φ',
            '&Chi;': 'Χ',
            '&Psi;': 'Ψ',
            '&Omega;': 'Ω',
            '&alpha;': 'α',
            '&beta;': 'β',
            '&gamma;': 'γ',
            '&delta;': 'δ',
            '&epsilon;': 'ε',
            '&zeta;': 'ζ',
            '&eta;': 'η',
            '&theta;': 'θ',
            '&iota;': 'ι',
            '&kappa;': 'κ',
            '&lambda;': 'λ',
            '&mu;': 'μ',
            '&nu;': 'ν',
            '&xi;': 'ξ',
            '&omicron;': 'ο',
            '&pi;': 'π',
            '&rho;': 'ρ',
            '&sigmaf;': 'ς',
            '&sigma;': 'σ',
            '&tau;': 'τ',
            '&upsilon;': 'υ',
            '&phi;': 'φ',
            '&chi;': 'χ',
            '&psi;': 'ψ',
            '&omega;': 'ω',
            '&thetasym;': 'ϑ',
            '&upsih;': 'ϒ',
            '&piv;': 'ϖ',
            '&Agrave;': 'À',
            '&Aacute;': 'Á',
            '&Acirc;': 'Â',
            '&Atilde;': 'Ã',
            '&Auml;': 'Ä',
            '&Aring;': 'Å',
            '&AElig;': 'Æ',
            '&Ccedil;': 'Ç',
            '&Egrave;': 'È',
            '&Eacute;': 'É',
            '&Ecirc;': 'Ê',
            '&Euml;': 'Ë',
            '&Igrave;': 'Ì',
            '&Iacute;': 'Í',
            '&Icirc;': 'Î',
            '&Iuml;': 'Ï',
            '&ETH;': 'Ð',
            '&Ntilde;': 'Ñ',
            '&Ograve;': 'Ò',
            '&Oacute;': 'Ó',
            '&Ocirc;': 'Ô',
            '&Otilde;': 'Õ',
            '&Ouml;': 'Ö',
            '&Oslash;': 'Ø',
            '&Ugrave;': 'Ù',
            '&Uacute;': 'Ú',
            '&Ucirc;': 'Û',
            '&Uuml;': 'Ü',
            '&Yacute;': 'Ý',
            '&THORN;': 'Þ',
            '&szlig;': 'ß',
            '&agrave;': 'à',
            '&aacute;': 'á',
            '&acirc;': 'â',
            '&atilde;': 'ã',
            '&auml;': 'ä',
            '&aring;': 'å',
            '&aelig;': 'æ',
            '&ccedil;': 'ç',
            '&egrave;': 'è',
            '&eacute;': 'é',
            '&ecirc;': 'ê',
            '&euml;': 'ë',
            '&igrave;': 'ì',
            '&iacute;': 'í',
            '&icirc;': 'î',
            '&iuml;': 'ï',
            '&eth;': 'ð',
            '&ntilde;': 'ñ',
            '&ograve;': 'ò',
            '&oacute;': 'ó',
            '&ocirc;': 'ô',
            '&otilde;': 'õ',
            '&ouml;': 'ö',
            '&oslash;': 'ø',
            '&ugrave;': 'ù',
            '&uacute;': 'ú',
            '&ucirc;': 'û',
            '&uuml;': 'ü',
            '&yacute;': 'ý',
            '&thorn;': 'þ',
            '&yuml;': 'ÿ',
            //'&nbsp;': '',
            '&iexcl;': '¡',
            '&cent;': '¢',
            '&pound;': '£',
            '&curren;': '¤',
            '&yen;': '¥',
            '&brvbar;': '¦',
            '&sect;': '§',
            '&uml;': '¨',
            '&copy;': '©',
            '&ordf;': 'ª',
            '&laquo;': '«',
            '&not;': '¬',
            '&shy;': '­',
            '&reg;': '®',
            '&macr;': '¯',
            '&deg;': '°',
            '&plusmn;': '±',
            '&sup2;': '²',
            '&sup3;': '³',
            '&acute;': '´',
            '&micro;': 'µ',
            '&para;': '¶',
            '&middot;': '·',
            '&cedil;': '¸',
            '&sup1;': '¹',
            '&ordm;': 'º',
            '&raquo;': '»',
            '&frac14;': '¼',
            '&frac12;': '½',
            '&frac34;': '¾',
            '&iquest;': '¿',
            '&times;': '×',
            '&divide;': '÷',
            // Entity Numbers
            '&#33;': '!',
            '&#34;': '"',
            '&#38;': '&',
            '&#39;': "'",
            '&#45;': '-',
            '&#47;': '/',
            '&#60;': '<',
            '&#61;': '=',
            '&#62;': '>',
            '&#64;': '@',
            '&#130;': '‚',
            '&#132;': '„',
            '&#134;': '†',
            '&#135;': '‡',
            '&#137;': '‰',
            '&#139;': '‹',
            '&#145;': '‘',
            '&#146;': '’',
            '&#147;': '“',
            '&#148;': '”',
            '&#153;': '™',
            '&#155;': '›',
            '&#161;': '¡',
            '&#162;': '¢',
            '&#163;': '£',
            '&#164;': '¤',
            '&#165;': '¥',
            '&#166;': '¦',
            '&#167;': '§',
            '&#168;': '¨',
            '&#169;': '©',
            '&#170;': 'ª',
            '&#171;': '«',
            '&#172;': '¬',
            '&#173;': '­',
            '&#174;': '®',
            '&#175;': '¯',
            '&#176;': '°',
            '&#177;': '±',
            '&#178;': '²',
            '&#179;': '³',
            '&#180;': '´',
            '&#181;': 'µ',
            '&#182;': '¶',
            '&#183;': '·',
            '&#184;': '¸',
            '&#185;': '¹',
            '&#186;': 'º',
            '&#187;': '»',
            '&#188;': '¼',
            '&#189;': '½',
            '&#190;': '¾',
            '&#191;': '¿',
            '&#192;': 'À',
            '&#193;': 'Á',
            '&#194;': 'Â',
            '&#195;': 'Ã',
            '&#196;': 'Ä',
            '&#197;': 'Å',
            '&#198;': 'Æ',
            '&#199;': 'Ç',
            '&#200;': 'È',
            '&#201;': 'É',
            '&#202;': 'Ê',
            '&#203;': 'Ë',
            '&#204;': 'Ì',
            '&#205;': 'Í',
            '&#206;': 'Î',
            '&#207;': 'Ï',
            '&#208;': 'Ð',
            '&#209;': 'Ñ',
            '&#210;': 'Ò',
            '&#211;': 'Ó',
            '&#212;': 'Ô',
            '&#213;': 'Õ',
            '&#214;': 'Ö',
            '&#215;': '×',
            '&#216;': 'Ø',
            '&#217;': 'Ù',
            '&#218;': 'Ú',
            '&#219;': 'Û',
            '&#220;': 'Ü',
            '&#221;': 'Ý',
            '&#222;': 'Þ',
            '&#223;': 'ß',
            '&#224;': 'à',
            '&#225;': 'á',
            '&#226;': 'â',
            '&#227;': 'ã',
            '&#228;': 'ä',
            '&#229;': 'å',
            '&#230;': 'æ',
            '&#231;': 'ç',
            '&#232;': 'è',
            '&#233;': 'é',
            '&#234;': 'ê',
            '&#235;': 'ë',
            '&#236;': 'ì',
            '&#237;': 'í',
            '&#238;': 'î',
            '&#239;': 'ï',
            '&#240;': 'ð',
            '&#241;': 'ñ',
            '&#242;': 'ò',
            '&#243;': 'ó',
            '&#244;': 'ô',
            '&#245;': 'õ',
            '&#246;': 'ö',
            '&#247;': '÷',
            '&#248;': 'ø',
            '&#249;': 'ù',
            '&#250;': 'ú',
            '&#251;': 'û',
            '&#252;': 'ü',
            '&#253;': 'ý',
            '&#254;': 'þ',
            '&#255;': 'ÿ',
            '&#402;': 'ƒ',
            '&#913;': 'Α',
            '&#914;': 'Β',
            '&#915;': 'Γ',
            '&#916;': 'Δ',
            '&#917;': 'Ε',
            '&#918;': 'Ζ',
            '&#919;': 'Η',
            '&#920;': 'Θ',
            '&#921;': 'Ι',
            '&#922;': 'Κ',
            '&#923;': 'Λ',
            '&#924;': 'Μ',
            '&#925;': 'Ν',
            '&#926;': 'Ξ',
            '&#927;': 'Ο',
            '&#928;': 'Π',
            '&#929;': 'Ρ',
            '&#931;': 'Σ',
            '&#932;': 'Τ',
            '&#933;': 'Υ',
            '&#934;': 'Φ',
            '&#935;': 'Χ',
            '&#936;': 'Ψ',
            '&#937;': 'Ω',
            '&#945;': 'α',
            '&#946;': 'β',
            '&#947;': 'γ',
            '&#948;': 'δ',
            '&#949;': 'ε',
            '&#950;': 'ζ',
            '&#951;': 'η',
            '&#952;': 'θ',
            '&#953;': 'ι',
            '&#954;': 'κ',
            '&#955;': 'λ',
            '&#956;': 'μ',
            '&#957;': 'ν',
            '&#958;': 'ξ',
            '&#959;': 'ο',
            '&#960;': 'π',
            '&#961;': 'ρ',
            '&#962;': 'ς',
            '&#963;': 'σ',
            '&#964;': 'τ',
            '&#965;': 'υ',
            '&#966;': 'φ',
            '&#967;': 'χ',
            '&#968;': 'ψ',
            '&#969;': 'ω',
            '&#977;': 'ϑ',
            '&#978;': 'ϒ',
            '&#982;': 'ϖ',
            '&#8226;': '•',
            '&#8230;': '…',
            '&#8242;': '′',
            '&#8243;': '″',
            '&#8254;': '‾',
            '&#8465;': 'ℑ',
            '&#8472;': '℘',
            '&#8476;': 'ℜ',
            '&#8501;': 'ℵ',
            '&#8592;': '←',
            '&#8593;': '↑',
            '&#8594;': '→',
            '&#8595;': '↓',
            '&#8596;': '↔',
            '&#8629;': '↵',
            '&#8656;': '⇐',
            '&#8657;': '⇑',
            '&#8658;': '⇒',
            '&#8659;': '⇓',
            '&#8660;': '⇔',
            '&#8704;': '∀',
            '&#8706;': '∂',
            '&#8707;': '∃',
            '&#8709;': '∅',
            '&#8711;': '∇',
            '&#8712;': '∈',
            '&#8713;': '∉',
            '&#8715;': '∋',
            '&#8719;': '∏',
            '&#8721;': '∑',
            '&#8722;': '−',
            '&#8727;': '∗',
            '&#8730;': '√',
            '&#8733;': '∝',
            '&#8734;': '∞',
            '&#8736;': '∠',
            '&#8743;': '∧',
            '&#8744;': '∨',
            '&#8745;': '∩',
            '&#8746;': '∪',
            '&#8747;': '∫',
            '&#8756;': '∴',
            '&#8764;': '∼',
            '&#8773;': '≅',
            '&#8776;': '≈',
            '&#8800;': '≠',
            '&#8801;': '≡',
            '&#8804;': '≤',
            '&#8805;': '≥',
            '&#8834;': '⊂',
            '&#8835;': '⊃',
            '&#8836;': '⊄',
            '&#8838;': '⊆',
            '&#8839;': '⊇',
            '&#8853;': '⊕',
            '&#8855;': '⊗',
            '&#8869;': '⊥',
            '&#8901;': '⋅',
            '&#8968;': '⌈',
            '&#8969;': '⌉',
            '&#8970;': '⌊',
            '&#8971;': '⌋',
            '&#9001;': '〈',
            '&#9002;': '〉',
            '&#9674;': '◊',
            '&#9824;': '♠',
            '&#9827;': '♣',
            '&#9829;': '♥',
            '&#9830;': '♦',
        };
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the map of character to ASCII Integer value
     */
    static get CHAR_TO_ASCII_INTEGER_MAP() {
        return {
            '!': '33',
            '"': '34',
            '&': '38',
            "'": '39',
            '-': '45',
            '/': '47',
            '<': '60',
            '=': '61',
            '>': '62',
            '@': '64',
            '‚': '130',
            '„': '132',
            '†': '134',
            '‡': '135',
            '‰': '137',
            '‹': '139',
            '‘': '145',
            '’': '146',
            '“': '147',
            '”': '148',
            '™': '153',
            '›': '155',
            '¡': '161',
            '¢': '162',
            '£': '163',
            '¤': '164',
            '¥': '165',
            '¦': '166',
            '§': '167',
            '¨': '168',
            '©': '169',
            ª: '170',
            '«': '171',
            '¬': '172',
            '­': '173',
            '®': '174',
            '¯': '175',
            '°': '176',
            '±': '177',
            '²': '178',
            '³': '179',
            '´': '180',
            µ: '181',
            '¶': '182',
            '·': '183',
            '¸': '184',
            '¹': '185',
            º: '186',
            '»': '187',
            '¼': '188',
            '½': '189',
            '¾': '190',
            '¿': '191',
            À: '192',
            Á: '193',
            Â: '194',
            Ã: '195',
            Ä: '196',
            Å: '197',
            Æ: '198',
            Ç: '199',
            È: '200',
            É: '201',
            Ê: '202',
            Ë: '203',
            Ì: '204',
            Í: '205',
            Î: '206',
            Ï: '207',
            Ð: '208',
            Ñ: '209',
            Ò: '210',
            Ó: '211',
            Ô: '212',
            Õ: '213',
            Ö: '214',
            '×': '215',
            Ø: '216',
            Ù: '217',
            Ú: '218',
            Û: '219',
            Ü: '220',
            Ý: '221',
            Þ: '222',
            ß: '223',
            à: '224',
            á: '225',
            â: '226',
            ã: '227',
            ä: '228',
            å: '229',
            æ: '230',
            ç: '231',
            è: '232',
            é: '233',
            ê: '234',
            ë: '235',
            ì: '236',
            í: '237',
            î: '238',
            ï: '239',
            ð: '240',
            ñ: '241',
            ò: '242',
            ó: '243',
            ô: '244',
            õ: '245',
            ö: '246',
            '÷': '247',
            ø: '248',
            ù: '249',
            ú: '250',
            û: '251',
            ü: '252',
            ý: '253',
            þ: '254',
            ÿ: '255',
            ƒ: '402',
            Α: '913',
            Β: '914',
            Γ: '915',
            Δ: '916',
            Ε: '917',
            Ζ: '918',
            Η: '919',
            Θ: '920',
            Ι: '921',
            Κ: '922',
            Λ: '923',
            Μ: '924',
            Ν: '925',
            Ξ: '926',
            Ο: '927',
            Π: '928',
            Ρ: '929',
            Σ: '931',
            Τ: '932',
            Υ: '933',
            Φ: '934',
            Χ: '935',
            Ψ: '936',
            Ω: '937',
            α: '945',
            β: '946',
            γ: '947',
            δ: '948',
            ε: '949',
            ζ: '950',
            η: '951',
            θ: '952',
            ι: '953',
            κ: '954',
            λ: '955',
            μ: '956',
            ν: '957',
            ξ: '958',
            ο: '959',
            π: '960',
            ρ: '961',
            ς: '962',
            σ: '963',
            τ: '964',
            υ: '965',
            φ: '966',
            χ: '967',
            ψ: '968',
            ω: '969',
            ϑ: '977',
            ϒ: '978',
            ϖ: '982',
            '•': '8226',
            '…': '8230',
            '′': '8242',
            '″': '8243',
            '‾': '8254',
            ℑ: '8465',
            '℘': '8472',
            ℜ: '8476',
            ℵ: '8501',
            '←': '8592',
            '↑': '8593',
            '→': '8594',
            '↓': '8595',
            '↔': '8596',
            '↵': '8629',
            '⇐': '8656',
            '⇑': '8657',
            '⇒': '8658',
            '⇓': '8659',
            '⇔': '8660',
            '∀': '8704',
            '∂': '8706',
            '∃': '8707',
            '∅': '8709',
            '∇': '8711',
            '∈': '8712',
            '∉': '8713',
            '∋': '8715',
            '∏': '8719',
            '∑': '8721',
            '−': '8722',
            '∗': '8727',
            '√': '8730',
            '∝': '8733',
            '∞': '8734',
            '∠': '8736',
            '∧': '8743',
            '∨': '8744',
            '∩': '8745',
            '∪': '8746',
            '∫': '8747',
            '∴': '8756',
            '∼': '8764',
            '≅': '8773',
            '≈': '8776',
            '≠': '8800',
            '≡': '8801',
            '≤': '8804',
            '≥': '8805',
            '⊂': '8834',
            '⊃': '8835',
            '⊄': '8836',
            '⊆': '8838',
            '⊇': '8839',
            '⊕': '8853',
            '⊗': '8855',
            '⊥': '8869',
            '⋅': '8901',
            '⌈': '8968',
            '⌉': '8969',
            '⌊': '8970',
            '⌋': '8971',
            '〈': '#9001',
            '〉': '#9002',
            '◊': '9674',
            '♠': '9824',
            '♣': '9827',
            '♥': '9829',
            '♦': '9830',
        };
    }

    /**
     * @static
     * @public @method
     * Determines if the provided aObject is a string type
     * @param {*} aValue
     * @returns {boolean}
     */
    static isString(aValue) {
        return undefined !== aValue && null !== aValue && ('string' === typeof aValue || '[object String]' === Object.prototype.toString.call(aValue));
    }

    /**
     * @static
     * @public @method
     * Returns the provdied aString if it is a valid string. Otherwise, returns an empty string.
     * @param {*} aString
     * @returns {string}
     */
    static stringOrEmpty(aString) {
        return undefined !== aString && null !== aString && 'string' === typeof aString ? aString : EzString.EMPTY;
    }

    /**
     * @static
     * @public @method
     * Returns the provdied aString if it is a valid string with a length. Otherwise, returns an empty string.
     * @param {*} aString
     * @returns {string}
     */
    static stringWithLengthOrEmpty(aString) {
        return EzString.hasLength(aString) ? aString : EzString.EMPTY;
    }

    /**
     * @static
     * @public @method
     * Returns the provdied aString if it is a valid string. Otherwise, returns null;
     * @param {*} aString
     * @returns {string}
     */
    static stringOrNull(aString) {
        return undefined !== aString && null !== aString && 'string' === typeof aString ? aString : null;
    }

    /**
     * @static
     * @public @method
     * Returns the provdied aString if it is a valid string with a length. Otherwise, returns null;
     * @param {*} aString
     * @returns {string}
     */
    static stringWithLengthOrNull(aString) {
        return EzString.hasLength(aString) ? aString : null;
    }

    /**
     * @static
     * @public @method
     * Returns the provdied aString if it is a valid string, otherwise returns the provided aDefault value.
     * @param {*} aString
     * @param {undefined|null|string|*} aDefaultValue
     * Default: EzString.EMPTY
     * @returns {string}
     */
    static stringOrDefault(aString, aDefaultValue = EzString.EMPTY) {
        return EzString.isString(aString) ? aString : aDefaultValue;
    }

    /**
     * @static
     * @public @method
     * Returns the provdied aString if it is a valid string with a length. Otherwise, returns an empty string.
     * @param {*} aString
     * @returns {string}
     */
    static stringWithLengthOrDefault(aString, aDefault) {
        return EzString.hasLength(aString) ? aString : aDefault;
    }

    /**
     * @static
     * @public @method
     * If the provdied aString is a string, then the string is returned after trimming.
     * Otherwise, an empty string is returned.
     * @param {undefined|null|string} aString
     * @returns {string}
     */
    static trimOrEmpty(aString) {
        return EzString.isString(aString) ? aString.trim() : EzString.EMPTY;
    }

    /**
     * @static
     * @public @method
     * If the provdied aString is a string, then the string is returned after trimming.
     * Otherwise, null is returned.
     * @param {undefined|null|string} aString
     * @returns {string}
     */
    static trimOrNull(aString) {
        return EzString.isString(aString) ? aString.trim() : null;
    }

    /**
     * @static
     * @public @method
     * If the provdied aString is a string, then the string is returned after trimming.
     * Otherwise, the provided defaultValue is returned.
     * @param {undefined|null|string} aString
     * @returns {string}
     */
    static trimOrDefault(aString, defaultValue) {
        return EzString.isString(aString) ? aString.trim() : defaultValue;
    }

    /**
     * @static
     * @public @method
        If the provdied value is a string and the string has a length then the value is returned.
        Otherwise, the default value is returned.
     * @param {*} aString
     * @returns {string}
     */
    static textOrDefault(value, defaultValue) {
        return EzString.hasLength(value) ? value : defaultValue;
    }

    /**
     * @static
     * @public @method
     * Determines if the passed aValue is a string type AND the length is greater than zero.
     * @param {*} aValue
     * @returns {boolean}
     * @deprecated
     * Migrate to: EzString.hasLength(...)
     */
    static stringHasLength(aValue) {
        return EzString.hasLength(aValue);
    }

    /**
     * @static
     * @public @method
     * Removes and shorter method name fo EzString.hasLength(aValue)
     * Determines if the passed aValue is a string type AND the length is greater than zero.
     * @param {*} aValue
     * @returns {boolean}
     */
    static hasLength(aValue) {
        return EzString.isString(aValue) && undefined !== aValue && null !== aValue && 0 !== aValue.length;
    }

    /**
     * @static
     * @public @method
     * Determines if the provdied aValue has text and not just 'white space'
     * Supported Whitespace characters: ' ', '\t', '\n', and '\r'
     * @param {string} aValue
     * @returns {boolean}
     */
    static hasText(aValue) {
        return !EzString.isOnlyWhitespace(aValue);
    }

    /**
     * @static
     * @public @method
     * If the provided aValue is not blank and does not only consist of supported white spae characters then
     * the aValue is returned. Otherwise, the defualtValue is returned.
     * @param {string} aValue
     * @param {*|string} defaultValue
     * @returns {*|string}
     */
    static stringWithTextOrDefault(aValue, defaultValue) {
        return !EzString.isOnlyWhitespace(aValue) ? aValue : defaultValue;
    }

    /**
     * @static
     * @public @method
     * If the provided aValue is not blank and does not only consist of supported white spae characters then
     * the aValue is returned. Otherwise, EzString.EMPTY is returned.
     * @param {string} aValue
     * @returns {*|string}
     */
    static stringWithTextOrEmpty(aValue) {
        return !EzString.isOnlyWhitespace(aValue) ? aValue : EzString.EMPTY;
    }

    /**
     * @static
     * @public @method
     * Determines if the provdied aValue is empty or only consists of 'white space' characters
     * Supported Whitespace characters: ' ', '\t', '\n', and '\r'
     * @param {string} aValue
     * @returns {boolean}
     */
    static isOnlyWhitespace(aValue) {
        if (EzString.hasLength(aValue)) {
            for (const aChar of aValue) {
                if (' ' !== aChar && '\t' !== aChar && '\n' !== aChar && '\r' !== aChar) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @public
     * Templated JS String
     * Example use: EzString.build`A string with template variable: ${var1}`;
     *
     * Builds a templated string
     * 1) Removes all extra spaces and extra tabs (aka two tabs in a row will result in one tab) from the data.
     * 2) Trims the string before returning.
     * @param {array} aStrings
     * @param {array} aKeys
     * @returns {string}
     */
    static build(aStrings, ...aKeys) {
        let cleanValues = EzString.EMPTY;

        if (EzObject.isValid(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aKey = x < aKeys.length ? aKeys[x] : EzString.EMPTY;

                aKey = EzObject.isValid(aKey) ? aKey.toString() : EzString.EMPTY;

                cleanValues = `${cleanValues}${aStrings[x]}${aKey}`;

                // Comment in the below to debug results
                // console.log(`aStrings[${x}]=${JSON.stringify(aString)}\naKeys[${x}]=${JSON.stringify(aKey)}\nnextValue=${JSON.stringify(nextValue)}\nStep #${x}=${JSON.stringify(cleanValues)}`);
            }
        }

        // Comment in the below to debug results
        /*
        console.log(`value=${JSON.stringify(cleanValues)}`);
        let trimedValue = cleanValues
            .replace(/(\t{2,})+/g, '\t')
            .replace(/( {2,})+/g, ' ')
            .trim();
        console.log(`trimedValue=${JSON.stringify(trimedValue)}`);
        return trimedValue;
        */

        return cleanValues
            .replace(/(\t{2,})+/g, '\t')
            .replace(/( {2,})+/g, ' ')
            .trim();
    }

    /**
     * @static
     * @public @method
     * Constructs an id with part as a timestamp.
     * Underscore only added if prefix and/or suffix is a string with length.
     * 1) If prefix and suffix is provided:
     *      Template: '{prefix}_{moment().format('x')}_{suffix}'
     * 2) If prefix is undefined, null, or empty string and suffix is a non-empty string:
     *      Template: '{moment().format('x')}_{suffix}'
     * 4) If prefix is a non-empty string and suffix is undefiend, null, or empty string:
     *      Template: '{prefix}_{moment().format('x')}'
     * 3) If prefix AND suffix is undefined, null, or empty string:
     *      Template: '{moment().format('x')}'
     * @param {undefined|null|string} prefix
     * Default: EzString.EMPTY
     * @param {undefined|null|string} suffix
     * Default: EzString.EMPTY
     * @returns {string}
     */
    static buildTimestampId(prefix = EzString.EMPTY, suffix = EzString.EMPTY) {
        const timestampId = EzString.hasLength(prefix) ? `${prefix}_${moment().format('x')}` : moment().format('x');

        return EzString.hasLength(suffix) ? `${timestampId}_${suffix}` : timestampId;
    }

    /**
     * @static @public
     * Templated JS String
     * Example use: EzString.em`A string with template variable: ${var1}`;
     *
     * Alias to the EzString.msg custom Templated string handler.
     *
     * Removes all extract space from the provided aTemplateLitteralValue param. Then returns
     * the value with one space in front, once space at end and a line feed.
     * Result template: ' ${value_with_extra_space_removed} \n';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    static em(aStrings, ...aKeys) {
        return EzString.msg(aStrings, aKeys);
    }

    /**
     * @static @public
     * Templated JS String
     * Example use: EzString.msg`A string with template variable: ${var1}`;
     *
     * Removes all extract space from the provided aTemplateLitteralValue param.
     * Returns the value with:
     * --> One space in front
     * --> One space at end
     * --> One line feed at the end
     * Result template: ' ${value_with_extra_space_removed} \n';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    static msg(aStrings, ...aKeys) {
        let cleanValues = EzString.EMPTY;

        if (EzObject.isValid(aStrings) && 0 !== aStrings.length) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzNumber.isNumber(aString) || EzBoolean.isBoolean(aString)) {
                    aString = aString.toString();
                }

                let aKey = x < aKeys.length ? aKeys[x] : EzString.EMPTY;

                aKey = EzObject.isValid(aKey) ? aKey.toString() : EzString.EMPTY;

                // Remove line feeds, carrage returns, and tabs
                let cleanValue = aString.replace(EzRegEx.MATCH_ALL_LINEFEEDS, ' ');

                cleanValue = cleanValue.replace(EzRegEx.MATCH_ALL_RETURNS_AND_TABS, EzString.EMPTY);

                // Remove extra spaces
                cleanValue = cleanValue.replace(EzRegEx.MATCH_2_OR_MORE_SPACES, ' ');

                cleanValues = `${cleanValues}${cleanValue}${aKey}`;
            }
        }

        return cleanValues.replace(/( {2})+/g, ' ');
    }

    /**
     * @static
     * @public
     * Replaces the matching values with ''
     * Example: EzString.dropChars(/[ \t\n\r]+/g);
     * @param {string} aValue
     * @param {string} regex
     * Provide a valid regex expression
     */
    static drop(aString, regex) {
        if (!EzObject.isValid(regex)) {
            throw new EzBadParamException('regex', EzString, EzString.drop);
        }
        if (!EzString.hasLength(aString)) {
            return aString;
        }

        return aString.replace(regex, EzString.EMPTY);
    }

    /**
     * @static
     * @public
     * Replaces all white space characters with empty string
     * @param {string} aValue
     */
    static dropSTNR(aValue) {
        if (!EzString.hasLength(aValue)) {
            return aValue;
        }

        return EzString.drop(aValue, EzRegEx.MATCH_ALL_WHITESPACE_CHARACTERS);
    }

    /**
     * @static
     * @public
     * Replaces all extra blank spaces, tabs, newlines, and returns with ''
     * @param {string} aValue
     */
    static dropXSTNR(aValue) {
        if (!EzString.hasLength(aValue)) {
            return aValue;
        }

        return EzString.drop(aValue, EzRegEx.MATCH_ALL_2SPACES_TAB_LINEFEED_RETURN);
    }

    /**
     * @static
     * @public
     * Replaces all tabs, newlines, and returns with ''
     * @param {string} aValue
     */
    static dropTNR(aValue) {
        if (!EzString.hasLength(aValue)) {
            return aValue;
        }

        return EzString.drop(aValue, EzRegEx.MATCH_ALL_TAB_LINEFEED_RETURN);
    }

    /**
     * @static
     * @public @method
     * Applies URL decoding to the provided string
     * If the provided value is undefined or null then an empty string is returned.
     * @param {string} value
     * @param {undefined|null|boolean} replacePlusWithSpace
     * If true, replaces any + symbol with a space
     * @returns {string}
     */
    static decodeURL(value, replacePlusWithSpace) {
        if (!EzString.hasLength(value)) {
            return EzString.EMPTY;
        }

        return EzBoolean.isTrue(replacePlusWithSpace) ? decodeURIComponent(value).replaceAll('+', ' ') : decodeURIComponent(value);
    }

    /**
     * @static
     * @public @method
     * Applies URL encoding to the provided string
     * If the provided value is undefined or null then an empty string is returned.
     * @param {string} value
     * @returns {string}
     */
    static encodeURL(value) {
        if (!EzString.hasLength(value)) {
            return EzString.EMPTY;
        }

        return encodeURIComponent(value).replace(EzRegEx.MATCH_ALL_BANG_TICK_PARENTHESIS_ASTRIX, (c) => {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    /**
     * @static
     * @public @method
     * Builds the encoding options object from the provided values.
     * @param {string} level
     * Default: 'all'
     * @param {string} mode
     * Default: 'specialChars'
     * @param {string} numeric
     * Default: 'decimal'
     */
    static buildEncodingOptions(level = 'all', mode = 'specialChars', numeric = 'decimal') {
        level = level || 'all';

        level = level.indexOf('all') || level.indexOf('html5') || level.indexOf('html4') || level.indexOf('xml') ? level : 'all';

        mode = mode || 'extensive';

        mode =
            mode.indexOf('specialChars') ||
            mode.indexOf('nonAscii') ||
            mode.indexOf('nonAsciiPrintable') ||
            mode.indexOf('nonAsciiPrintableOnly') ||
            mode.indexOf('extensive')
                ? mode
                : 'specialChars';

        numeric = numeric || 'decimal';

        numeric = numeric.indexOf('decimal') || numeric.indexOf('hexadecimal') ? numeric : 'decimal';

        return {
            level,
            mode,
            numeric,
        };
    }

    /**
     * @static
     * @public @method
     * Encodes the provided aValue as HTML.
     * Example:
     *  EzChars.htmlEncode('< > " \' & © ∆')
     *  Result: '&lt; &gt; &quot; &apos; &amp; © ∆'
     * @param {string} rawString
     * @param {undefined|null|object} encodingOptions
     * Default:
     *     {
     *      level: 'all',
     *      mode: 'specialChars'
     *      numeric: 'decimal'
     *  }
     * @returns {string}
     * Returns an HTML encoded string
     */
    static htmlEncode(rawString, encodingOptions) {
        if (!EzString.hasLength(rawString)) {
            return EzString.EMPTY;
        }
        if (!EzObject.isValid(encodingOptions)) {
            encodingOptions = EzString.buildEncodingOptions('all', 'specialChars', 'decimal');
        }

        if (0 === rawString?.length) {
            return rawString;
        }

        return encode(rawString, encodingOptions);
    }

    /**
     * @static
     * @public @method
     * Builds the encoding options object from the provided values.
     * @param {string} level
     * Default: 'all'
     * @param {string} scope
     * Default: 'body'
     * @returns {object}
     * Returns object:
     *  {
     *      level: {One of the following string values: 'all', 'html5', 'html4', or 'xml'},
     *      scope: {One of the following string values: 'body', 'attribute', 'strict'},
     *  }
     */
    static buildDecodingOptions(level = 'all', scope = 'body') {
        level = level || 'all';

        level = level.indexOf('all') || level.indexOf('html5') || level.indexOf('html4') || level.indexOf('xml') ? level : 'all';

        scope = scope || 'body';

        scope = scope.indexOf('body') || scope.indexOf('attribute') || scope.indexOf('strict') ? scope : 'body';

        return {
            level,
            scope,
        };
    }

    /**
     * @static
     * @public @method
     * Decodes the provided htmlEncodedValue to a raw string value.
     * Example:
     *  EzChars.htmlDecode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;')
     *  Result: '< > " \' & © ∆'
     * @param {string} htmlEncodedValue
     * @param {undefined|null|object} decodingOptions
     * Default:
     *  {
     *      level: 'all',
     *      scope: 'body'
     *  }
     * @returns {string}
     * Returns an HTML encoded string
     */
    static htmlDecode(htmlEncodedValue, decodingOptions) {
        if (!EzString.hasLength(htmlEncodedValue)) {
            return EzString.EMPTY;
        }
        if (!EzObject.isValid(decodingOptions)) {
            decodingOptions = EzString.buildDecodingOptions('all', 'body');
        }

        if (0 === htmlEncodedValue?.length) {
            return htmlEncodedValue;
        }

        return decode(htmlEncodedValue, decodingOptions);
    }

    /**
     * @static
     * @public @method
     * Replaces occurances of some characters to prevent HTML injection.
     * If the provided value is undefined or null then an empty string is returned.
     * @param {undefined|null|string} value
     * @returns {string}
     * @deprecated
     * Migrate to: EzString.htmlEncode(...)
     */
    static simpleEncodeHtml(value) {
        return EzString.htmlEncode(value);
    }

    /**
     * @public @method
     * Replaces the &# character encoding tags with the actual characters.
     * @param {string} htmlString
     * @returns {string}
     */
    static encodeHtmlDelimitQuotes(htmlString) {
        if (!EzString.hasLength(htmlString)) {
            return EzString.EMPTY;
        }

        let result = EzString.htmlEncode(result);

        for (const aChar of htmlString) {
            if ("'" === aChar) {
                result = result.replace("'", "\\'");
            } else if ('"' === aChar) {
                result = result.replace("'", '\\"');
            }
        }

        return result;
    }

    /**
     * @public @method
     * Replaces special HTML characters with their &# replacement value.
     * @param {String} htmlString
     * @returns {String}
     * @deprecated
     * Migrate to: EzString.htmlDecode(...)
     */
    static decodeHtml(htmlEncodedString) {
        return EzString.htmlDecode(htmlEncodedString);
    }

    /**
     * @static
     * @public @method
     * Replaces special HTML characters with their &# replacement value.
     * @param {string} rawString
     * @returns {string}
     * @deprecated
     * Migrate to: EzString.htmlEncode(...)
     */
    static encodeHtml(rawString) {
        return EzString.htmlEncode(rawString);
    }

    /**
     * @static
     * @public @method
     * Strips all whitespace characters from the provided aValue.
     * This includes all control characters and spaces.
     * @value {string}
     * @returns {string}
     */
    static stripWhitespace(aValue) {
        if (!EzString.hasLength(aValue)) {
            throw new EzBadParamException('aValue', EzString, EzString.stripChars);
        }

        return EzString.drop(aValue, EzRegEx.MATCH_ALL_WHITESPACE_CHARACTERS, EzString.EMPTY);
    }

    /**
     * @static
     * @public @method
     * Strips all control characters from the string (space is not removed)
     * @value {string}
     * @returns {string}
     */
    static stripControlCharacters(aValue) {
        if (!EzString.hasLength(aValue)) {
            throw new EzBadParamException('aValue', EzString, EzString.stripChars);
        }

        return EzString.drop(EzRegEx.MATCH_CONTROL_CHARACTERS, EzString.EMPTY);
    }

    /**
     * @static
     * @public @method
     * Strips all occurances of two or more sequental spaces
     * Example:
     *  EzString.stripExtraSpaces('A sentence   with extra spaces.   ');
     *  Result: 'A sentence with extra spaces. ');
     * @value {string}
     * @returns {string}
     */
    static stripExtraSpaces(aValue) {
        if (!EzString.hasLength(aValue)) {
            throw new EzBadParamException('aValue', EzString, EzString.stripChars);
        }

        return EzString.drop(EzRegEx.MATCH_2_OR_MORE_SPACES, EzString.EMPTY);
    }
}
