/**
 * Single source of truth for the legal entity that owns and operates safarisaev.ai.
 * Values must match the Companies House register entry for company no. 16896823
 * character for character — they are cross-checked against public registries.
 */
export const legalEntity = {
    name: "OPTIFLOW LABS LTD",
    companyNumber: "16896823",
    incorporatedOn: "8 December 2025",
    jurisdiction: "England and Wales",
    entityType: "Private Limited Company",
    dunsNumber: "234404330",
    registeredOffice: [
        "Flat 41 Albany Park Court",
        "3 Westwood Road",
        "Southampton",
        "England",
        "SO17 1LA",
    ],
    email: "saf@safarisaev.ai",
    phone: "+44 7715 123595",
    phoneHref: "+447715123595",
    website: "https://safarisaev.ai",
    /** Mobile apps published under the entity — closes the chain entity -> site -> app. */
    apps: ["Kalorii (Калории)"],
    registerUrl:
        "https://find-and-update.company-information.service.gov.uk/company/16896823",
} as const;

/** Compact one-line attribution used in every footer. */
export const legalFooterLine = `${legalEntity.name} // Company No. ${legalEntity.companyNumber} // Registered in ${legalEntity.jurisdiction}`;

export const legalAddressLine = legalEntity.registeredOffice.join(", ");
