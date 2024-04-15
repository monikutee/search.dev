import React from "react";

export const JobOffer = () => {
  return <div></div>;
};

interface JobOfferCreateDto {
  title: string;
  description: string;
  country: string;
  jobType: string;
  remote: string;
  experienceLevel: string;
  role: string;
  benefits: string[];
  commitments: string[];
  quiz: {
    title: string;
    questions: {
      questionText: string;
      questionChoices: { choiceText: string; isCorrect: boolean }[];
      questionType: string;
    }[];
  };
}

enum AnswerType {
  ONE = "ONE",
  MULTI = "MCQ",
  OPEN = "OPEN",
}

enum JobType {
  FULL_TIME = "Full-time",
  PART_TIME = "Part-time",
  CONTRACT = "Contact",
}

enum ExperienceLevel {
  INTERNSHIP = "Internship",
  ENTRY_LEVEL = "Entry level",
  ASSOCIATE = "Associate",
  JUNIOR = "Junior",
  MID = "Mid",
  MID_SENIOR = "Mid-senior",
  SENIOR = "Senior",
  DIRECTOR = "Director",
  EXECUTIVE = "Executive",
}

enum Remote {
  REMOTE = "Remote",
  ON_SITE = "On-site",
  HYBRID = "Hybrid",
}

enum Role {
  FRONTEND_DEV = "Frontend Developer",
  BACKEND_DEV = "Backend Developer",
  FULLSTACK_DEV = "Fullstack Developer",
  SOFTWARE_DEV = "Software Developer",
  MOBILE_DEV = "Mobile Developer",
  PLATFORM_ENGINEER = "Platform Engineer",
}

enum Benefits {
  MEDICAL_INSURANCE = "Medical insurance",
  DENTAL_INSURANCE = "Dental insurance",
  PENSION_PLAN = "Pension plan",
  PAID_PATERNITY_LEAVE = "Paid paternity leave",
  PAID_MATERNITY_LEAVE = "Paid maternity leave",
  STUDENT_LOAN_ASSISTANCE = "Student loan assistance",
  DISABILITY_INSURANCE = "Disability insurance",
  VISION_INSURANCE = "Vision insurance",
  COMMUTER_BENEFITS = "Commuter benefits",
  TUITION_ASSISTANCE = "Tuition assistance",
}

enum Commitments {
  CAREER = "Career growth and learning",
  SOCIAL = "Social impact",
  BALANCE = "Work-life balance",
}
