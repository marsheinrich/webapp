import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Enumeration for common media types.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...
 *         EzHttpMediaType
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into other enumeration classes with:
 *     import { EzHttpMediaType } from '/ezlibrary/enums/EzHttpMediaType.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static access only with:
 *      EzHttpMediaType.{PROPERTY_NAME}
 *      EzHttpMediaType.ezNames()
 *      EzHttpMediaType.ezValues()
 *      EzHttpMediaType.ezData(EzHttpMediaType.{PROPERTY_NAME})
 *      EzHttpMediaType.ezNameOf({PROPERTY_VALUE})
 *      EzHttpMediaType.ezValueOf({PROPERTY_VALUE})
 *      EzHttpMediaType.ezAsEnum({PROPERTY_VALUE})
 *      EzHttpMediaType.ezEnumData(EzHttpMediaType.{PROPERTY_NAME})
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHttpMediaType extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzHttpMediaType}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzHttpMediaType.#ezEnumerationSingleton) {
            EzHttpMediaType.#ezEnumerationSingleton = new EzHttpMediaType(
                // Enum property names
                [
                    'UNKNOWN',
                    'ANY',
                    'APPLICATION_XHTML_XML',
                    'APPLICATION_XML',
                    'APPLICATION_JSON',
                    'APPLICATION_FORM_URLENCODED',
                    'APPLICATION_OCTET_STREAM',
                    'APPLICATION_PDF',
                    'APPLICATION_RSS_XML',
                    'APPLICATION_XALM_XML',
                    'APPLICATION_JAVASCRIPT',
                    'APPLICATION_OGG',
                    'AUDIO_ALL',
                    'AUDIO_WEBM',
                    'AUDIO_WAV',
                    'TEXT_HTML',
                    'TEXT_MARKDOWN',
                    'TEXT_PLAIN',
                    'TEXT_XML',
                    'TEXT_EVENT_STREAM',
                    'TEXT_CSS',
                    'IMAGE_ALL',
                    'IMAGE_SVG_XML',
                    'IMAGE_GIF',
                    'IMAGE_JPEG',
                    'IMAGE_PNG',
                    'IMAGE_WEBP',
                    'IMAGE_APNG',
                    'IMAGE_PJPEG',
                    'IMAGE_JXR',
                    'IMAGE_X_XBITMAP',
                    'IMAGE_AVIF',
                    'VIDEO_ALL',
                    'VIDEO_WEBM',
                    'VIDEO_OGG',
                    'MULTIPART_FORM_DATA'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    // 'UNKNOWN'
                    '*/*;q=0.8',
                    '*/*',
                    // 'APPLICATION_XHTML_XML'
                    'application/xhtml+xml',
                    // 'APPLICATION_XML'
                    'application/xhtml+xml',
                    // 'APPLICATION_JSON'
                    'application/json',
                    // 'APPLICATION_FORM_URLENCODED'
                    'application/x-www-form-urlencoded',
                    // 'APPLICATION_OCTET_STREAM'
                    'application/octet-stream',
                    // 'APPLICATION_PDF'
                    'application/pdf',
                    // 'APPLICATION_RSS_XML'
                    'application/rss+xml',
                    // 'APPLICATION_XALM_XML'
                    'application/xaml+xml',
                    // 'APPLICATION_JAVASCRIPT'
                    'application/javascript',
                    //'APPLICATION_OGG'
                    'application/ogg;q=0.7',
                    // 'AUDIO_ALL'
                    'audio/*;q=0.9',
                    // 'AUDIO_WEBM'
                    'audio/webm',
                    // 'AUDIO_WAV'
                    'audio/wav',
                    // 'TEXT_HTML'
                    'text/html',
                    // 'TEXT_MARKDOWN'
                    'text/markdown',
                    // 'TEXT_PLAIN'
                    'text/plain',
                    //'TEXT_XML',
                    'text/xml',
                    //'TEXT_EVENT_STREAM'
                    'text/event-stream',
                    // 'TEXT_CSS'
                    'text/css',
                    // 'IMAGE_ALL'
                    'image/*;q=0.8',
                    // 'IMAGE_SVG_XML'
                    'image/svg+xml',
                    // 'IMAGE_GIF'
                    'image/gif',
                    // 'IMAGE_JPEG'
                    'image/jpeg',
                    // 'IMAGE_PNG'
                    'image/png',
                    // 'IMAGE_WEBP'
                    'image/webp',
                    // 'IMAGE_APNG'
                    'image/apng',
                    // 'IMAGE_PJPEG'
                    'image/pjpeg',
                    // 'IMAGE_JXR'
                    'image/jxr',
                    // 'IMAGE_X_XBITMAP'
                    'image/x-xbitmap',
                    // 'IMAGE_AVIF'
                    'image/avif',
                    // 'VIDEO_ALL'
                    'video/*;q=0.8',
                    // 'VIDEO_WEBM'
                    'video/webm',
                    //'VIDEO_OGG'
                    'video/ogg',
                    // 'MULTIPART_FORM_DATA'
                    'multipart/form-data'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
     * @static
     * @public @method
     * Builds a media type string from the provided mediaType and subType params.
     * @param {string} mediaType
     * @param {string} subType
     */
    static ezOtherMediaType(mediaType, subType) {
        if (!EzString.stringHasLength(mediaType)) {
            throw new EzBadParamException(
                'mediaType',
                this,
                this.ezOtherMediaType);
        }
        if (!EzString.stringHasLength(subType)) {
            throw new EzBadParamException(
                'subType',
                this,
                this.ezOtherMediaType);
        }

        return `${mediaType}/${subType}`;
    }
}