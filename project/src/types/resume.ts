export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CoverLetter {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  letterBody: string;
}

export interface Resume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  coverLetter?: CoverLetter;
}