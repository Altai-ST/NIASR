export interface EducationalInstitution {
    id: string;
    name: string;
    nameKg: string;
    location: string;
    locationKg: string;
    registrationCertificate: string;
    taxId: string;
    accreditationDate: string;
    certificateDetails: string;
    certificateExpiryDate: string;
    accreditedPrograms: EducationalProgram[];
  }
  
  export interface EducationalProgram {
    id: string;
    code: string;
    name: string;
    nameKg: string;
    level: 'bachelor' | 'master' | 'specialist';
    institutionId: string;
    accreditationDate: string;
    accreditationExpiryDate: string;
    status: 'active' | 'expired';
  }
  
  export interface AccreditationApplication {
    id: string;
    institutionId: string;
    programIds: string[];
    applicationType: 'programmatic' | 'institutional';
    applicationDate: string;
    status: 'pending' | 'in_progress' | 'approved' | 'rejected';
    contractNumber?: string;
    contractDate?: string;
  }
  
  export interface ExpertCommission {
    id: string;
    orderNumber: string;
    orderDate: string;
    chairman: Expert;
    members: Expert[];
    visitDate: string;
    applicationId: string;
  }
  
  export interface Expert {
    id: string;
    fullName: string;
    workplace: string;
    position: string;
    scientificDegree: string;
    accreditationArea: string;
    resumeFile?: string;
    diplomaFiles?: string[];
  }
  
  export interface AccreditationDecision {
    id: string;
    applicationId: string;
    commissionId: string;
    preliminaryDecisionDate: string;
    preliminaryDecision: 'accredit_5_years' | 'accredit_3_years' | 'accredit_1_year' | 'reject';
    councilProtocolDate: string;
    councilProtocolNumber: string;
    finalDecisionDate: string;
    finalDecisionNumber: string;
    finalDecision: 'accredit_5_years' | 'accredit_3_years' | 'accredit_1_year' | 'reject';
    protocolFile?: string;
    decisionFile?: string;
  }
  
  export interface User {
    id: string;
    email: string;
    role: 'admin' | 'niars_rep' | 'institution_rep' | 'guest';
    institutionId?: string;
    fullName: string;
  }
  
  export interface InstitutionQuestionnaire {
    id: string;
    institutionId: string;
    submissionDate: string;
    data: Record<string, any>;
    status: 'draft' | 'submitted' | 'reviewed';
  }
  
  export interface AccreditationQuestionnaire {
    id: string;
    applicationId: string;
    programId?: string;
    submissionDate: string;
    data: Record<string, any>;
    status: 'draft' | 'submitted' | 'reviewed';
  }
  
  export interface PostAccreditationMonitoring {
    id: string;
    decisionId: string;
    orderNumber: string;
    orderDate: string;
    status: 'scheduled' | 'in_progress' | 'completed';
    results?: string;
  }