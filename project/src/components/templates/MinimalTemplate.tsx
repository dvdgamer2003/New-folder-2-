import type { Resume } from '@/types/resume';

interface MinimalTemplateProps {
  resume: Resume;
}

export function MinimalTemplate({ resume }: MinimalTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-card p-8 shadow-lg">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">{resume.personalInfo.fullName}</h1>
        <p className="text-lg text-muted-foreground mt-1">{resume.personalInfo.title}</p>
        <div className="text-sm text-muted-foreground mt-2">
          <p>{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      {resume.summary && (
        <section className="mb-8">
          <p className="text-foreground leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{exp.position}</h3>
                <span className="text-sm text-muted-foreground">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
              <p className="mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{edu.school}</h3>
                <span className="text-sm text-muted-foreground">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-muted-foreground">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
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