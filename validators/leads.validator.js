const { checkSchema } = require('express-validator');
const {locales} = require('../locales');
const {LEAD_SOURCE_TYPES} = require('../constants/common.contant');


const validateCreateLead = () => {
    const sourceTypes = Object.values(LEAD_SOURCE_TYPES);
    return checkSchema({
        name: {
            exists : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_required',
                    {
                        attribute: 'name'
                    }
                )
            }
        },
        email: {
            optional: {options: {nullable: false}},
            isString : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_string',
                    {
                        attribute: 'email'
                    }
                )
            }
        },
        contact_no: {
            exists : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_required',
                    {
                        attribute: 'contact_no'
                    }
                )
            },
            isString : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_string',
                    {
                        attribute: 'contact_no'
                    }
                )
            }
        },
        source_type :{
            exists : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_required',
                    {
                        attribute: 'source_type'
                    }
                )
            },
            isIn: {
                options: sourceTypes,
                errorMessage: locales.__('messages.validation.attribute_is_in', {
                    attribute: 'source_type',
                    values: sourceTypes.join(',')
                })

            }
        },
        source: {
            optional: {options: {nullable: false}},
            isString : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_string',
                    {
                        attribute: 'source'
                    }
                )
            }
        },
    });
};

const validateAssignLead = () => {
    return checkSchema({
        agent_id: {
            exists : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_required',
                    {
                        attribute: 'agent_id'
                    }
                )
            },
            isInt : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_integer',
                    {
                        attribute: 'agent_id'
                    }
                )
            },
            toInt: true
        },
        lead_id: {
            exists : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_required',
                    {
                        attribute: 'lead_id'
                    }
                )
            },
            isInt : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_integer',
                    {
                        attribute: 'lead_id'
                    }
                )
            },
            toInt: true
        }
    });
}

module.exports = {
    validateCreateLead,
    validateAssignLead
}