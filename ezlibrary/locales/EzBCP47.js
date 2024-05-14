/**
 * @class
 * Provides BCP-47 Language Code Information
 * See also:
 *  1) https://appmakers.dev/bcp-47-language-codes-list/
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzBCP47 } from '/ezlibrary/locales/EzBCP47.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzBCP47 {
    /**
     * Array of BCP-47 Language Codes
     */
    static get EzBCP47LangugageCodes() {
        return [
            'ar-SA', // Arabic Saudi Arabia
            'cs-CZ', // Czech Czech Republic
            'da-DK', // Danish Denmark
            'de-DE', // German Germany
            'el-GR', // Modern Greek Greece
            'en-AU', // English Australia
            'en-GB', // English United Kingdom
            'en-IE', // English Ireland
            'en-US', // English United States
            'en-ZA', // English South Africa
            'es-ES', // Spanish Spain
            'es-MX', // Spanish Mexico
            'fi-FI', // Finnish Finland
            'fr-CA', // French Canada
            'fr-FR', // French France
            'he-IL', // Hebrew Israel
            'hi-IN', // Hindi India
            'hu-HU', // Hungarian Hungary
            'id-ID', // Indonesian Indonesia
            'it-IT', // Italian Italy
            'ja-JP', // Japanese Japan
            'ko-KR', // Korean Republic of Korea
            'nl-BE', // Dutch Belgium
            'nl-NL', // Dutch Netherlands
            'no-NO', // Norwegian Norway
            'pl-PL', // Polish Poland
            'pt-BR', // Portuguese Brazil
            'pt-PT', // Portuguese Portugal
            'ro-RO', // Romanian Romania
            'ru-RU', // Russian Russian Federation
            'sk-SK', // Slovak Slovakia
            'sv-SE', // Swedish Sweden
            'th-TH', // Thai Thailand
            'tr-TR', // Turkish Turkey
            'zh-CN', // Chinese China
            'zh-HK', // Chinese Hong Kong
            'zh-TW', // Chinese Taiwan
        ];
    }

    /**
     * Map of BCP-47 Language Codes to Display Name
     */
    static get LanguageCodesToDisplayNameMap() {
        return {
            'ar-SA': 'Arabic Saudi Arabia',
            'cs-CZ': 'Czech Czech Republic',
            'da-DK': 'Danish Denmark',
            'de-DE': 'German Germany',
            'el-GR': 'Modern Greek Greece',
            'en-AU': 'English Australia',
            'en-GB': 'English United Kingdom',
            'en-IE': 'English Ireland',
            'en-US': 'English United States',
            'en-ZA': 'English South Africa',
            'es-ES': 'Spanish Spain',
            'es-MX': 'Spanish Mexico',
            'fi-FI': 'Finnish Finland',
            'fr-CA': 'French Canada',
            'fr-FR': 'French France',
            'he-IL': 'Hebrew Israel',
            'hi-IN': 'Hindi India',
            'hu-HU': 'Hungarian Hungary',
            'id-ID': 'Indonesian Indonesia',
            'it-IT': 'Italian Italy',
            'ja-JP': 'Japanese Japan',
            'ko-KR': 'Korean Republic of Korea',
            'nl-BE': 'Dutch Belgium',
            'nl-NL': 'Dutch Netherlands',
            'no-NO': 'Norwegian Norway',
            'pl-PL': 'Polish Poland',
            'pt-BR': 'Portuguese Brazil',
            'pt-PT': 'Portuguese Portugal',
            'ro-RO': 'Romanian Romania',
            'ru-RU': 'Russian Russian Federation',
            'sk-SK': 'Slovak Slovakia',
            'sv-SE': 'Swedish Sweden',
            'th-TH': 'Thai Thailand',
            'tr-TR': 'Turkish Turkey',
            'zh-CN': 'Chinese China',
            'zh-HK': 'Chinese Hong Kong',
            'zh-TW': 'Chinese Taiwan',
        };
    }
}