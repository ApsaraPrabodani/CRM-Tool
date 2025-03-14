class CommonConstants {
    static get LEAD_SOURCE_TYPES() {
        return {
            THIRD_PARTY: 'third_party',
            MARKETING_CAMPAIGN: 'marketing_compaign',
            COMPANY_LANDING_PAGE: 'landing_page'
        };
    }
    static get LEAD_STATUS() {
        return  Object.freeze({
            UNASSIGNED: 'unassigned',
            ASSIGNED: 'assigned',
            RESERVED: 'reserved',
            FINANCIAL_APPROVED: 'financial approved',
            LEGAL_FINALIZED: 'legal finalized',
            SOLD: 'sold'
        });
    }
}

module.exports = CommonConstants;