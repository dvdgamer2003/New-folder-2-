import type { Resume } from '../../types/resume';

interface CreativeTemplateProps {
  resume: Resume;
}

export function CreativeTemplate({ resume }: CreativeTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-lg">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {resume.personalInfo.fullName}
        </h1>
        <p className="text-xl text-gray-700 mt-2">{resume.personalInfo.title}</p>
        <div className="mt-4 space-y-1 text-gray-600">
          <p>{resume.personalInfo.email}</p>
          <p>{resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      {resume.summary && (
        <section className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                About Me
              </span>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
            {resume.summary}
          </p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                Experience
              </span>
            </div>
          </div>
          <div className="space-y-8">
            {resume.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-indigo-600 mb-2">{exp.company} • {exp.location}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                Education
              </span>
            </div>
          </div>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                  <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-indigo-600">{edu.degree}</p>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                Skills
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}