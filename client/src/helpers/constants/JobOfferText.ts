import {
  JobTypeEnum,
  RemoteEnum,
  ExperienceLevelEnum,
} from "../enums/JobOfferEnums";

export const JobTypeText: { [key: string]: string } = {
  [JobTypeEnum.FULL_TIME]: "Full-time",
  [JobTypeEnum.PART_TIME]: "Part-time",
  [JobTypeEnum.CONTRACT]: "Contract",
};

export const RemoteText: { [key: string]: string } = {
  [RemoteEnum.REMOTE]: "Remote",
  [RemoteEnum.ON_SITE]: "On site",
  [RemoteEnum.HYBRID]: "Hybrid",
};

export const ExperienceLevelText: { [key: string]: string } = {
  [ExperienceLevelEnum.INTERNSHIP]: "Internship",
  [ExperienceLevelEnum.ENTRY_LEVEL]: "Entry Level",
  [ExperienceLevelEnum.ASSOCIATE]: "Associate",
  [ExperienceLevelEnum.JUNIOR]: "Junior",
  [ExperienceLevelEnum.MID]: "Mid",
  [ExperienceLevelEnum.MID_SENIOR]: "Mid-senior",
  [ExperienceLevelEnum.SENIOR]: "Senior",
  [ExperienceLevelEnum.DIRECTOR]: "Director",
  [ExperienceLevelEnum.EXECUTIVE]: "Executive",
};

export const RoleText: { [key: string]: string } = {
  FRONTEND_DEV: "Frontend Developer",
  BACKEND_DEV: "Backend Developer",
  FULLSTACK_DEV: "Fullstack Developer",
  SOFTWARE_DEV: "Software Developer",
  MOBILE_DEV: "Mobile Developer",
  PLATFORM_ENGINEER: "Platform Engineer",
};

export const BenefitsText: { [key: string]: string } = {
  MEDICAL_INSURANCE: "Medical insurance",
  DENTAL_INSURANCE: "Dental insurance",
  PENSION_PLAN: "Pension plan",
  PAID_PATERNITY_LEAVE: "Paid paternity leave",
  PAID_MATERNITY_LEAVE: "Paid maternity leave",
  STUDENT_LOAN_ASSISTANCE: "Student loan assistance",
  DISABILITY_INSURANCE: "Disability insurance",
  VISION_INSURANCE: "Vision insurance",
  COMMUTER_BENEFITS: "Commuter benefits",
  TUITION_ASSISTANCE: "Tuition assistance",
};

export const CommitmentsText: { [key: string]: string } = {
  CAREER: "Career growth and learning",
  SOCIAL: "Social impact",
  BALANCE: "Work-life balance",
};
