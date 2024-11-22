import type { Resume } from '../../types/resume';

interface ExecutiveTemplateProps {
  resume: Resume;
}

export default function ExecutiveTemplate({ resume }: ExecutiveTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-[#1a1a1a] text-white p-8 shadow-lg">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{resume.personalInfo.fullName}</h1>
        <p className="text-xl text-purple-400 mt-2">{resume.personalInfo.title}</p>
        <div className="text-gray-400 mt-4">
          <p>{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      {resume.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Executive Summary</h2>
          <p className="text-gray-300 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Professional Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <span className="text-gray-400">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-purple-400 mb-2">{exp.company} • {exp.location}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold">{edu.school}</h3>
                <span className="text-gray-400">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-purple-400">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Core Competencies</h2>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-purple-900 text-purple-100 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}