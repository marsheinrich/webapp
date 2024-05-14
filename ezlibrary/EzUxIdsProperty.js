/**
    Object that represents the value of the ezUxIds property in ezClocker Classes
 */
export class EzUxIdsProperty {
    /**
        Creates a new instance of EzUxIdsProperty
        @param {String|null} dialogId
     */
    constructor(ezDialogId) {
        this.ezDialogId = ezDialogId;
    }

    /**
        @private @field
        Stores the dialog id
        @type {string}
     */
    #ezDialogId;

     /**
        @public @field
        Stores parent ids
        @type {object}
     */
    parentIds = {};

    /**
        @public @field
        Stores class names
        @type {object}
     */
    classNames = {};

    /**
        @public @field
        Stores button ids
        @type {object}
     */
    buttonIds = {};

    /**
        @public @field
        Stores input ids
        @type {object}
     */
    inputIds = {};

    /**
        @public @field
        Stores element ids
        @type {object}
     */
    elementIds = {};

    /**
        @public @property @getter
        Returns the dialog id
        @returns {string}
     */
    get ezDialogId() {
        return this.#ezDialogId;
    }

    /**
        @public @property @setter
        sets the dialog id
        @param {string}
     */
    set ezDialogId(ezDialogId) {
        if (ezDialogId && 'string' === typeof ezDialogId && 0 != ezDialogId.length) {
            this.#ezDialogId = ezDialogId;
        } else {
            this.#ezDialogId = `EzUXId_${new Date().getMilliseconds()}`;
        }
    }
}