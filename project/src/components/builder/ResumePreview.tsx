import { useResumeStore } from '../../store/useResumeStore';

export function ResumePreview() {
  const resume = useResumeStore(state => state.resume);

  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="bg-background p-8 rounded-lg shadow-lg">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{resume.personalInfo.fullName}</h1>
            <p className="text-muted-foreground">{resume.personalInfo.title}</p>
            <div className="flex justify-center gap-4 text-sm">
              <span>{resume.personalInfo.email}</span>
              <span>{resume.personalInfo.phone}</span>
              <span>{resume.personalInfo.location}</span>
            </div>
          </div>

          {/* Summary */}
          {resume.summary && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
              <p>{resume.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>
              <div className="space-y-4">
                {resume.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
              <div className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.school}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    <p className="text-sm mt-1">{edu.field}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-muted px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}