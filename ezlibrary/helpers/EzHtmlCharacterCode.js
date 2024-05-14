/*
    ---------------------------------------------------------------------------
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    ---------------------------------------------------------------------------
    import { ... } from '/ezlibrary/helpers/EzHelpers.js'
    ---------------------------------------------------------------------------
*/

import {
    EzBadParamException,
    EzNotSupportedException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzCharacterEncoding
} from '/ezlibrary/enums/EzCharacterEncoding.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzString } from '/ezlibrary/helpers/EzString.js';

/**
 * @class
 * @description
 * Provided UTF-8 Character to HTML Character Code mapping
 * ---------------------------------------------------------------------------
 * Import with:
 *     import {
 *         // ... other helper imports ...,
 *         EzHtmlCharacterCode
 *     } from '/ezlibrary/helpers/EzHelpers.js';
 * ---------------------------------------------------------------------------
 */
export class EzHtmlCharacterCode extends EzStaticClass {
    /**
     * @public @readonly @property
     * Gets a map of a sub-set of UTF-8 encoded characters (32 through 255) to their
     * HTML character code Decimal Code
     * @returns {object}
     */
    static get UTF8_CHAR_TO_HTML_DECIMAL_CODE_MAP() {
        return {
            ' ': '32',
            '!': '33',
            '"': '34',
            '#': '35',
            '$': '36',
            '%': '37',
            '&': '38',
            '\'': '39',
            '(': '40',
            ')': '41',
            '*': '42',
            '+': '43',
            ',': '44',
            '-': '45',
            '.': '46',
            '/': '47',
            '0': '48',
            '1': '49',
            '2': '50',
            '3': '51',
            '4': '52',
            '5': '53',
            '6': '54',
            '7': '55',
            '8': '56',
            '9': '57',
            ':': '58',
            ';': '59',
            '<': '60',
            '=': '61',
            '>': '62',
            '?': '63',
            '@': '64',
            'A': '65',
            'B': '66',
            'C': '67',
            'D': '68',
            'E': '69',
            'F': '70',
            'G': '71',
            'H': '72',
            'I': '73',
            'J': '74',
            'K': '75',
            'L': '76',
            'M': '77',
            'N': '78',
            'O': '79',
            'P': '80',
            'Q': '81',
            'R': '82',
            'S': '83',
            'T': '84',
            'U': '85',
            'V': '86',
            'W': '87',
            'X': '88',
            'Y': '89',
            'Z': '90',
            '[': '91',
            '\\': '92',
            ']': '93',
            '^': '94',
            '_': '95',
            '`': '96',
            'a': '97',
            'b': '98',
            'c': '99',
            'd': '100',
            'e': '101',
            'f': '102',
            'g': '103',
            'h': '104',
            'i': '105',
            'j': '106',
            'k': '107',
            'l': '108',
            'm': '109',
            'n': '110',
            'o': '111',
            'p': '112',
            'q': '113',
            'r': '114',
            's': '115',
            't': '116',
            'u': '117',
            'v': '118',
            'w': '119',
            'x': '120',
            'y': '121',
            'z': '122',
            '{': '123',
            '|': '124',
            '}': '125',
            '~': '126',
            '¡': '161',
            '¢': '162',
            '£': '163',
            '¤': '164',
            '¥': '165',
            '¦': '166',
            '§': '167',
            '¨': '168',
            '©': '169',
            'ª': '170',
            '«': '171',
            '¬': '172',
            '®': '174',
            '¯': '175',
            '°': '176',
            '±': '177',
            '²': '178',
            '³': '179',
            '´': '180',
            'µ': '181',
            '¶': '182',
            '·': '183',
            '¸': '184',
            '¹': '185',
            'º': '186',
            '»': '187',
            '¼': '188',
            '½': '189',
            '¾': '190',
            '¿': '191',
            'À': '192',
            'Á': '193',
            'Â': '194',
            'Ã': '195',
            'Ä': '196',
            'Å': '197',
            'Æ': '198',
            'Ç': '199',
            'È': '200',
            'É': '201',
            'Ê': '202',
            'Ë': '203',
            'Ì': '204',
            'Í': '205',
            'Î': '206',
            'Ï': '207',
            'Ð': '208',
            'Ñ': '209',
            'Ò': '210',
            'Ó': '211',
            'Ô': '212',
            'Õ': '213',
            'Ö': '214',
            '×': '215',
            'Ø': '216',
            'Ù': '217',
            'Ú': '218',
            'Û': '219',
            'Ü': '220',
            'Ý': '221',
            'Þ': '222',
            'ß': '223',
            'à': '224',
            'á': '225',
            'â': '226',
            'ã': '227',
            'ä': '228',
            'å': '229',
            'æ': '230',
            'ç': '231',
            'è': '232',
            'é': '233',
            'ê': '234',
            'ë': '235',
            'ì': '236',
            'í': '237',
            'î': '238',
            'ï': '239',
            'ð': '240',
            'ñ': '241',
            'ò': '242',
            'ó': '243',
            'ô': '244',
            'õ': '245',
            'ö': '246',
            '÷': '247',
            'ø': '248',
            'ù': '249',
            'ú': '250',
            'û': '251',
            'ü': '252',
            'ý': '253',
            'þ': '254',
            'ÿ': '255'
        };
    }

    /**
     * @public @readonly @property
     * Gets a map of HTML character decimal code to
     * UTF-8 encoded character
     * @returns {object}
     */
    static get HTML_DECIMAL_CODE_TO_UTF8_CHAR_MAP() {
        return {
            '32': ' ',
            '33': '!',
            '34': '"',
            '35': '#',
            '36': '$',
            '37': '%',
            '38': '&',
            '39': '\'',
            '40': '(',
            '41': ')',
            '42': '*',
            '43': '+',
            '44': ',',
            '45': '-',
            '46': '.',
            '47': '/',
            '48': '0',
            '49': '1',
            '50': '2',
            '51': '3',
            '52': '4',
            '53': '5',
            '54': '6',
            '55': '7',
            '56': '8',
            '57': '9',
            '58': ':',
            '59': ';',
            '60': '<',
            '61': '=',
            '62': '>',
            '63': '?',
            '64': '@',
            '65': 'A',
            '66': 'B',
            '67': 'C',
            '68': 'D',
            '69': 'E',
            '70': 'F',
            '71': 'G',
            '72': 'H',
            '73': 'I',
            '74': 'J',
            '75': 'K',
            '76': 'L',
            '77': 'M',
            '78': 'N',
            '79': 'O',
            '80': 'P',
            '81': 'Q',
            '82': 'R',
            '83': 'S',
            '84': 'T',
            '85': 'U',
            '86': 'V',
            '87': 'W',
            '88': 'X',
            '89': 'Y',
            '90': 'Z',
            '91': '[',
            '92': '\\',
            '93': ']',
            '94': '^',
            '95': '_',
            '96': '`',
            '97': 'a',
            '98': 'b',
            '99': 'c',
            '100': 'd',
            '101': 'e',
            '102': 'f',
            '103': 'g',
            '104': 'h',
            '105': 'i',
            '106': 'j',
            '107': 'k',
            '108': 'l',
            '109': 'm',
            '110': 'n',
            '111': 'o',
            '112': 'p',
            '113': 'q',
            '114': 'r',
            '115': 's',
            '116': 't',
            '117': 'u',
            '118': 'v',
            '119': 'w',
            '120': 'x',
            '121': 'y',
            '122': 'z',
            '123': '{',
            '124': '|',
            '125': '}',
            '126': '~',
            '161': '¡',
            '162': '¢',
            '163': '£',
            '164': '¤',
            '165': '¥',
            '166': '¦',
            '167': '§',
            '168': '¨',
            '169': '©',
            '170': 'ª',
            '171': '«',
            '172': '¬',
            '174': '®',
            '175': '¯',
            '176': '°',
            '177': '±',
            '178': '²',
            '179': '³',
            '180': '´',
            '181': 'µ',
            '182': '¶',
            '183': '·',
            '184': '¸',
            '185': '¹',
            '186': 'º',
            '187': '»',
            '188': '¼',
            '189': '½',
            '190': '¾',
            '191': '¿',
            '192': 'À',
            '193': 'Á',
            '194': 'Â',
            '195': 'Ã',
            '196': 'Ä',
            '197': 'Å',
            '198': 'Æ',
            '199': 'Ç',
            '200': 'È',
            '201': 'É',
            '202': 'Ê',
            '203': 'Ë',
            '204': 'Ì',
            '205': 'Í',
            '206': 'Î',
            '207': 'Ï',
            '208': 'Ð',
            '209': 'Ñ',
            '210': 'Ò',
            '211': 'Ó',
            '212': 'Ô',
            '213': 'Õ',
            '214': 'Ö',
            '215': '×',
            '216': 'Ø',
            '217': 'Ù',
            '218': 'Ú',
            '219': 'Û',
            '220': 'Ü',
            '221': 'Ý',
            '222': 'Þ',
            '223': 'ß',
            '224': 'à',
            '225': 'á',
            '226': 'â',
            '227': 'ã',
            '228': 'ä',
            '229': 'å',
            '230': 'æ',
            '231': 'ç',
            '232': 'è',
            '233': 'é',
            '234': 'ê',
            '235': 'ë',
            '236': 'ì',
            '237': 'í',
            '238': 'î',
            '239': 'ï',
            '240': 'ð',
            '241': 'ñ',
            '242': 'ò',
            '243': 'ó',
            '244': 'ô',
            '245': 'õ',
            '246': 'ö',
            '247': '÷',
            '248': 'ø',
            '249': 'ù',
            '250': 'ú',
            '251': 'û',
            '252': 'ü',
            '253': 'ý',
            '254': 'þ',
            '255': 'ÿ'
        };
    }

    /**
     * @public @readonly @property
     * Gets a map of HTML character decimal code to
     * UTF-8 encoded character
     * @returns {object}
     */
    static get HTML_DECIMAL_CODE_VALUE_TO_UTF8_CHAR() {
        return {
            '&#32;': ' ',
            '&#33;': '!',
            '&#34;': '"',
            '&#35;': '#',
            '&#36;': '$',
            '&#37;': '%',
            '&#38;': '&',
            '&#39;': '\'',
            '&#40;': '(',
            '&#41;': ')',
            '&#42;': '*',
            '&#43;': '+',
            '&#44;': ',',
            '&#45;': '-',
            '&#46;': '.',
            '&#47;': '/',
            '&#48;': '0',
            '&#49;': '1',
            '&#50;': '2',
            '&#51;': '3',
            '&#52;': '4',
            '&#53;': '5',
            '&#54;': '6',
            '&#55;': '7',
            '&#56;': '8',
            '&#57;': '9',
            '&#58;': ':',
            '&#59;': ';',
            '&#60;': '<',
            '&#61;': '=',
            '&#62;': '>',
            '&#63;': '?',
            '&#64;': '@',
            '&#65;': 'A',
            '&#66;': 'B',
            '&#67;': 'C',
            '&#68;': 'D',
            '&#69;': 'E',
            '&#70;': 'F',
            '&#71;': 'G',
            '&#72;': 'H',
            '&#73;': 'I',
            '&#74;': 'J',
            '&#75;': 'K',
            '&#76;': 'L',
            '&#77;': 'M',
            '&#78;': 'N',
            '&#79;': 'O',
            '&#80;': 'P',
            '&#81;': 'Q',
            '&#82;': 'R',
            '&#83;': 'S',
            '&#84;': 'T',
            '&#85;': 'U',
            '&#86;': 'V',
            '&#87;': 'W',
            '&#88;': 'X',
            '&#89;': 'Y',
            '&#90;': 'Z',
            '&#91;': '[',
            '&#92;': '\\',
            '&#93;': ']',
            '&#94;': '^',
            '&#95;': '_',
            '&#96;': '`',
            '&#97;': 'a',
            '&#98;': 'b',
            '&#99;': 'c',
            '&#100;': 'd',
            '&#101;': 'e',
            '&#102;': 'f',
            '&#103;': 'g',
            '&#104;': 'h',
            '&#105;': 'i',
            '&#106;': 'j',
            '&#107;': 'k',
            '&#108;': 'l',
            '&#109;': 'm',
            '&#110;': 'n',
            '&#111;': 'o',
            '&#112;': 'p',
            '&#113;': 'q',
            '&#114;': 'r',
            '&#115;': 's',
            '&#116;': 't',
            '&#117;': 'u',
            '&#118;': 'v',
            '&#119;': 'w',
            '&#120;': 'x',
            '&#121;': 'y',
            '&#122;': 'z',
            '&#123;': '{',
            '&#124;': '|',
            '&#125;': '}',
            '&#126;': '~',
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
            '&#255;': 'ÿ'
        };
    }

    /**
     * @static
     * @public @method
     * Returns the HTML character code equivlant of the provided character in the provided encoding.
     * @param {string} utf8Character
     * A UTF-8 encoded character to return the HTML character code for
     * If no  match is found the character provided is returned.
     * Character code returned as: '&#{HTML_CHAR_CODE};'
     * @return {string}
     * Returns the matching HTML character code or
     */
    static characterToAsHtmlCharacterCode(character, ezCharacterEncoding) {
        if (!EzString.stringHasLength(character)) {
            return character;
        }

        if (EzCharacterEncoding.UTF_8 === EzCharacterEncoding.ezAsEnum(ezCharacterEncoding)) {
            return EzHtmlCharacterCode.utf8ToHtmlCharacterCode(character);
        }

        throw new EzNotSupportedException(`Character encoding ${ezCharacterEncoding} is not yet supported in EzHtmlCharacterCode.`);
    }

    /**
     * @static
     * @public @method
     * Returns the HTML character code equivlant of the provided character in the provided encoding.
     * @param {string} utf8Character
     * A UTF-8 encoded character to return the HTML character code for
     * If no  match is found the character provided is returned.
     * Character code returned as: '&#{HTML_CHAR_CODE};'
     * @return {string}
     * Returns the matching HTML character code or
     */
    static htmlCharacterCodeToCharacter(character, ezCharacterEncoding) {
        if (!EzString.stringHasLength(character)) {
            return character;
        }

        if (EzCharacterEncoding.UTF_8 === EzCharacterEncoding.ezAsEnum(ezCharacterEncoding)) {
            return EzHtmlCharacterCode.utf8ToHtmlCharacterCode(character);
        }

        throw new EzNotSupportedException(`Character encoding ${ezCharacterEncoding} is not yet supported in EzHtmlCharacterCode.`);
    }

    /**
     * @static
     * @public @method
     * Returns the HTML character code equivlant of the provided UTF-8 encoded character.
     * @param {string} utf8Character
     * A UTF-8 encoded character to return the HTML character code for
     * If no  match is found the character provided is returned.
     * Character code returned as: '&#{HTML_CHAR_CODE};'
     * @return {string}
     * Returns the matching HTML character code or
     */
    static utf8CharAsHTMLCharCode(utf8Character) {
        if (!EzString.hasLength(utf8Character)) {
            throw new EzBadParamException(
                'utf8Character',
                EzHtmlCharacterCode,
                EzHtmlCharacterCode.ezCharToHtmlCode);
        }

        return EzHtmlCharacterCode?.UTF8_CHAR_TO_HTML_DECIMAL_CODE_MAP?.[utf8Character]
            ? `&#${EzHtmlCharacterCode.UTF8_CHAR_TO_HTML_DECIMAL_CODE_MAP[utf8Character]}`
            : utf8Character;
    }

    /**
     * @static
     * @public @method
     * Returns the HTML character code equivlant of the provided UTF-8 encoded character.
     * @param {string} utf8Character
     * A UTF-8 encoded character to return the HTML character code for
     * If no  match is found the character provided is returned.
     * Character code returned as: '&#{HTML_CHAR_CODE};'
     * @return {string}
     * Returns the matching HTML character code or
     */
    static htmlCharCodeToUTF8Char(htmlCharCode) {
        if (0 !== htmlCharCode.indexOf('&#')) {
            throw new EzBadParamException(
                'htmlCharCode',
                EzHtmlCharacterCode,
                EzHtmlCharacterCode.htmlCharCodeToUTF8Char);
        }

        if (!EzString.hasLength(htmlCharCode)) {
            return htmlCharCode;
        }

        return EzHtmlCharacterCode?.HTML_DECIMAL_CODE_VALUE_TO_UTF8_CHAR?.[htmlCharCode]
            ? EzHtmlCharacterCode?.HTML_DECIMAL_CODE_VALUE_TO_UTF8_CHAR?.[htmlCharCode]
            : htmlCharCode;
    }
}
