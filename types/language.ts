export type LanguageCode = 'ru' | 'kg';

export interface Language {
  code: LanguageCode;
  name: string;
}

interface SortOptions{
    nameAsc: string;
    nameDesc: string;
    dateDesc: string;
    dateAsc: string;
}

interface Statuses{
    active: string;
    expired: string;
}

interface Levels{
    all: string,
    bachelor: string,
    master: string,
    specialist: string
}

interface Tabs{
    general: string;
    contacts: string;
    statistics: string;
    mission: string;
    documents: string;
}

interface FormLabels{
    name: string;
    nameKg: string;
    address: string;
    addressKg: string;
    regCertificate: string;
    taxId: string;
    director: string;
    directorContact: string;
    website: string;
    foundationYear: string;
    studentCount: string;
    facultiesCount: string;
    programsCount: string;
    teachersCount: string;
    teachersWithPhD: string;
    missionStatement: string;
    missionStatementKg: string;
    attachments: string;
}

export interface Translations {
    title: string;
    titleProgramms: string;
    titleQuestionnaireInstitution: string;
    subtitle: string;
    subtitleQuestionnaireInstitution: string;
    subtitleProgramms: string;
    saveAsDraft: string;
    submit: string;
    backToHome: string;
    switchLanguage: string;
    searchPlaceholder: string;
    searchPlaceholderProgramms: string;
    institutions: string;
    programsInfo: string;
    institutionsCount: string;
    programsCount: string;
    questionnaire: string;
    accreditation: string;
    viewInstitutions: string;
    viewProgramms: string;
    language: string;
    popularPrograms: string;
    recentlyAccredited: string;

    //login
    login: string;
    loginName: string;
    registrationName: string;
    autorization: string;
    titleLogin: string;
    email: string;
    password: string;
    roleUser: string;
    admin: string;
    niarsRep: string;
    institutionRep: string;
    guest: string;
    rememberMe: string;
    forgotPassword: string;
    loginLoading: string;
    noAccount: string;
    register: string;
    createNewUser: string;
    name: string;
    lastName: string;
    organization: string;
    repeatPassword: string;
    selectRole: string;
    

    //accreditation-application
    questionnaireApplicationTitle: string;
    writeAccredApplicationTitle: string;
    formAccredApplicationTitle: string;
    getInfoAboutOrg: string;
    generalInfo: string;
    nameUniTitle: string;
    writeFullnameUni: string;
    typeAccred: string;
    selectTypeAccred: string;
    programmAccredVPO: string
    uniAccredVPO: string;
    selectTypeAccredGet: string;
    cipherEduProgramm: string;
    exampleCode: string;
    nameEduProgramm: string;
    levelEduProgramm: string;
    selectLevelEduProgamm: string;
    licenseDoc: string;
    licenseNum: string;
    dateAtLicense: string;
    uploadDoc: string;
    downloadTemplate: string;
    downloadInstuction: string;
    uploadedFile: string;
    contactInfo: string;
    fioContact: string;
    positionContact: string;
    emailContact: string;
    phoneContact: string;
    legalAddress: string
    exampleAddress: string;
    detailsInfo:string;



    filters: string;
    sortBy: string;
    location: string;
    accreditationDate: string;
    expiryDate: string;
    programs: string;
    details: string;
    totalFound: string;
    sortOptions: SortOptions;
    tabs: Tabs;
    formLabels: FormLabels;
    requiredDocuments: Record<string, string>;
    successMessage: string;
    level: string;
    levels: Levels;
    institution: string;
    status: string;
    statuses: Statuses;
    code: string;
    programName: string;
    filterByInstitution: string;
    searchName: string;
    about:string;
    contacts:string;
    law:string;
}

export interface LanguageState {
  currentLanguage: LanguageCode;
  supportedLanguages: Language[];
}
