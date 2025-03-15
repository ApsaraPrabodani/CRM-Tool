class CommonConstants {
    static get LEAD_SOURCE_TYPES() {
        return {
            THIRD_PARTY: 'third_party',
            MARKETING_CAMPAIGN: 'marketing_compaign',
            COMPANY_LANDING_PAGE: 'landing_page'
        };
    }
    static get LEAD_STATUS() {
        // return  Object.freeze({
        return {
            UNASSIGNED: 'unassigned',
            ASSIGNED: 'assigned',
            RESERVED: 'reserved',
            FINANCIAL_APPROVED: 'financial approved',
            LEGAL_FINALIZED: 'legal finalized',
            SOLD: 'sold'
        }
    }

    static get USER_GROUP() {
        return {
            ADMIN: {
                id: 1,
                name: 'Admin',
                displayName: 'Admin'
            },
            SALES_AGENT: {
                id: 2,
                name: 'Sales Agent',
                displayName: 'Agent'
            }
        };
    }
}

module.exports = CommonConstants;