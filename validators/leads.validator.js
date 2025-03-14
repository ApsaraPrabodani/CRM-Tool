const { checkSchema } = require('express-validator');
const {locales} = require('../locales');
const {LEAD_SOURCE_TYPES, LEAD_STATUS} = require('../constants/common.contant');


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
            },
            matches: {
                options: [/^\+?[1-9]\d{1,14}$/], //Accepts "+1234567890", "1234567890"
                errorMessage: locales.__('messages.validation.invalid_phone_number')
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
                    expected_values: sourceTypes.join(',')
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
};

const validateGetLeadList = () => {
    const leadStatus = Object.values(LEAD_STATUS);
    return checkSchema({
        status: {
            optional: {options: {nullable: false}},
            isString : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_string',
                    {
                        attribute: 'status'
                    }
                )
            },
            isIn: {
                options: leadStatus,
                errorMessage: locales.__('messages.validation.attribute_is_in', {
                    attribute: 'status',
                    expected_values: leadStatus.join(',')
                })
            }
        },
        agent_id:{
            optional: {options: {nullable: false}},
            isInt : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_integer',
                    {
                        attribute: 'agent_id'
                    }
                )
            },
        },
        agent: {
            optional: {options: {nullable: false}},
            isString : {
                errorMessage:  locales.__(
                    'messages.validation.attribute_is_string',
                    {
                        attribute: 'agent'
                    }
                )
            },
        }
    });
};

module.exports = {
    validateCreateLead,
    validateAssignLead,
    validateGetLeadList
}