import type { Resume } from '../../types/resume';

interface ProfessionalTemplateProps {
  resume: Resume;
}

export default function ProfessionalTemplate({ resume }: ProfessionalTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg">
      <header className="border-b-2 border-purple-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <p className="text-lg text-purple-600 mt-1">{resume.personalInfo.title}</p>
        <div className="text-sm text-gray-600 mt-2">
          <p>{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-purple-600">{exp.company} • {exp.location}</p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900">{edu.school}</h3>
                <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-purple-600">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}