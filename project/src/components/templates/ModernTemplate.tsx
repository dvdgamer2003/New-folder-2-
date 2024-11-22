import type { Resume } from '../../types/resume';

interface ModernTemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg">
      <header className="flex justify-between items-start border-l-4 border-purple-600 pl-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
          <p className="text-lg text-purple-600 mt-1">{resume.personalInfo.title}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>{resume.personalInfo.email}</p>
          <p>{resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      {resume.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Professional Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-purple-600 mb-2">{exp.company} • {exp.location}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-gray-900">{edu.school}</h3>
                <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-purple-600">{edu.degree}</p>
              {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}