import { Resume } from '@/store/useResumeStore';

export const downloadResume = (resume: Resume) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resume.personalInfo.fullName} - Resume</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                color: #333;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #2563eb;
                padding-bottom: 20px;
            }
            .name {
                font-size: 28px;
                font-weight: bold;
                color: #1e40af;
                margin: 0;
            }
            .title {
                font-size: 18px;
                color: #4b5563;
                margin: 5px 0;
            }
            .contact-info {
                font-size: 14px;
                color: #6b7280;
            }
            .section {
                margin: 25px 0;
            }
            .section-title {
                font-size: 20px;
                color: #1e40af;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            .experience-item, .education-item {
                margin-bottom: 20px;
            }
            .item-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .company, .school {
                font-weight: bold;
                color: #4b5563;
            }
            .position, .degree {
                color: #6b7280;
            }
            .date {
                color: #9ca3af;
                font-size: 14px;
            }
            .description {
                margin-top: 5px;
                color: #4b5563;
            }
            .skills {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .skill {
                background-color: #e5e7eb;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 14px;
                color: #4b5563;
            }
            @media print {
                body {
                    padding: 0;
                    color: black;
                }
                .header {
                    border-bottom-color: black;
                }
                .section-title {
                    color: black;
                    border-bottom-color: #ccc;
                }
                .skill {
                    border: 1px solid #ccc;
                    background-color: white;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 class="name">${resume.personalInfo.fullName}</h1>
            <p class="title">${resume.personalInfo.title}</p>
            <div class="contact-info">
                ${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}
            </div>
        </div>

        ${resume.summary ? `
        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p>${resume.summary}</p>
        </div>
        ` : ''}

        ${resume.experience.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Experience</h2>
            ${resume.experience.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="company">${exp.company}</div>
                            <div class="position">${exp.position}</div>
                        </div>
                        <div class="date">${exp.startDate} - ${exp.endDate}</div>
                    </div>
                    <p class="description">${exp.description}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.education.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Education</h2>
            ${resume.education.map(edu => `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="school">${edu.school}</div>
                            <div class="degree">${edu.degree}</div>
                        </div>
                        <div class="date">${edu.startDate} - ${edu.endDate}</div>
                    </div>
                    ${edu.description ? `<p class="description">${edu.description}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.skills.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills">
                ${resume.skills.map(skill => `
                    <span class="skill">${skill}</span>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </body>
    </html>
  `;

  // Create a Blob from the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
