import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides HTML character encoding/decoding abilities
    ---------------------------------------------------------------------------
    Import with:
        import { EzHtmlChar } from '/public/javascript/common/ez-html-char.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzHtmlChar.ezApiName] &&
        globalThis.ezApi.ezclocker[EzHtmlChar.ezApiName].ready
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzHtmlChar.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezHtmlChar
    ---------------------------------------------------------------------------
    @deprecated
    Migrate to EzString's encodeHtml, decodeHtml methods instead
 */
export class EzHtmlChar extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezHtmlChar';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzHtmlChar_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzHtmlChar}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzHtmlChar.ezApiName])
        ? globalThis.ezApi.ezclocker[EzHtmlChar.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzHtmlChar}
     */
    static get ezInstance() {
        return EzHtmlChar.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzHtmlChar} instance
     */
    static set ezInstance(instance) {
        if (null != EzHtmlChar.#ezInstance) {
            throw new Error('EzHtmlChar\'s singleton instance is already reigstered with EzApi.');
        }

        EzHtmlChar.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzHtmlChar.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzHtmlChar.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzHtmlChar.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzHtmlChar.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzHtmlChar.ezInstance &&
            EzRegistrationState.REGISTERED === EzHtmlChar.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzHtmlChar.#ezCanRegister && !EzHtmlChar.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzHtmlChar, EzHtmlChar.ezApiName);
        }

        return EzHtmlChar.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzHtmlChar.ezApiName
            2) Property getter EzHtmlChar.ezEventNames
            3) Property getter EzHtmlChar.ezInstance
            4) Property setter EzHtmlChar.ezInstance
            5) Property getter EzHtmlChar.ezApiRegistrationState
            6) Property setter EzHtmlChar.ezApiRegistrationState
            7) Property getter EzHtmlChar.#ezCanRegister
            8) Property getter EzHtmlChar.#ezIsRegistered
            9) Method EzHtmlChar.#ezRegistrator()
     */
    static {
        if (!EzHtmlChar.#ezIsRegistered) {
            EzHtmlChar.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzHtmlChar.#ezRegistrator()) {
                document.addEventListener(
                    EzHtmlChar.ezOnEzApiReadyEventName,
                    EzHtmlChar.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezHtmlChar.
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        Gets the map of HTML character code to character
        @returns {object}
     */
    get ezHtmlSpecialCharToChar() {
        return {
            '&#33;': '!',
            '&#34;': '"',
            '&#38;': '&',
            '&#39;': '\'',
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
            '&#9830;': '♦'
        };
    }

    /*
        @public @readonly @property
        Gets the map of character to ASCII Integer value
     */
    get ezSpecialChar() {
        return {
            '!': '33',
            '"': '34',
            '&': '38',
            '\'': '39',
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
            'ª': '170',
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
            'ÿ': '255',
            'ƒ': '402',
            'Α': '913',
            'Β': '914',
            'Γ': '915',
            'Δ': '916',
            'Ε': '917',
            'Ζ': '918',
            'Η': '919',
            'Θ': '920',
            'Ι': '921',
            'Κ': '922',
            'Λ': '923',
            'Μ': '924',
            'Ν': '925',
            'Ξ': '926',
            'Ο': '927',
            'Π': '928',
            'Ρ': '929',
            'Σ': '931',
            'Τ': '932',
            'Υ': '933',
            'Φ': '934',
            'Χ': '935',
            'Ψ': '936',
            'Ω': '937',
            'α': '945',
            'β': '946',
            'γ': '947',
            'δ': '948',
            'ε': '949',
            'ζ': '950',
            'η': '951',
            'θ': '952',
            'ι': '953',
            'κ': '954',
            'λ': '955',
            'μ': '956',
            'ν': '957',
            'ξ': '958',
            'ο': '959',
            'π': '960',
            'ρ': '961',
            'ς': '962',
            'σ': '963',
            'τ': '964',
            'υ': '965',
            'φ': '966',
            'χ': '967',
            'ψ': '968',
            'ω': '969',
            'ϑ': '977',
            'ϒ': '978',
            'ϖ': '982',
            '•': '8226',
            '…': '8230',
            '′': '8242',
            '″': '8243',
            '‾': '8254',
            'ℑ': '8465',
            '℘': '8472',
            'ℜ': '8476',
            'ℵ': '8501',
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
            '♦': '9830'
        };
    }

    /**
        @public @method
        Replaces special HTML characters with their &# replacement value.
        @param {string} htmlString
        @returns {string}
     */
    ezEncodeHtml(htmlString) {
        if (!EzString.stringHasLength(htmlString)) {
            return EzString.EMPTY;
        }

        let result = htmlString;
        for (let aChar of htmlString) {
            if (ezApi.ezIsValid(EzHtmlChar.ezInstance.ezSpecialChar[aChar])) {
                let char = EzHtmlChar.ezInstance.ezSpecialChar[aChar];
                if ('\'' === aChar) {
                    result = result.replace('\'', `&#${char};`);
                } else {
                    let regExReplace = RegExp(aChar);
                    result = result.replace(regExReplace.global, `&#${char};`);
                }
            }
        }

        return result;
    }

    /**
        @public @method
        Replaces the &# character encoding tags with the actual characters.
        @param {string} htmlString
        @returns {string}
     */
    ezEncodeHtmlDelimitQuotes(htmlString) {
        if (!EzString.stringHasLength(htmlString)) {
            return EzString.EMPTY;
        }

        let result = htmlString;

        for (let aChar of htmlString) {
            if (ezApi.ezIsValid(EzHtmlChar.ezInstance.ezSpecialChar[aChar])) {
                let char = EzHtmlChar.ezInstance.ezSpecialChar[aChar];

                if ('\'' === aChar) {
                    result = result.replace('\'', '\\\'');
                } else if ('"' === aChar) {
                    result = result.replace('\'', '\\"');
                } else {
                    let regExReplace = RegExp(aChar);
                    result = result.replace(regExReplace.global, `&#${char};`);
                }
            }
        }

        return result;
    }

    /**
        @public @method
        Replaces special HTML characters with their &# replacement value.
        @param {String} htmlString
        @returns {String}
     */
    ezDecodeHtml(htmlEncodedString) {
        if (!EzString.stringHasLength(htmlEncodedString)) {
            return EzString.EMPTY;
        }

        let result = htmlEncodedString;

        for (let key in EzHtmlChar.ezInstance.ezHtmlSpecialCharToChar) {
            let regExReplace = RegExp(key, 'g');

            result = result.replace(
                regExReplace,
                EzHtmlChar.ezInstance.ezHtmlSpecialCharToChar[key]);
        }

        return result;
    }
}
