import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, MinusCircle, FileText } from 'lucide-react';
import type { Education, Experience, CoverLetter } from '@/types/resume';

export function ResumeForm() {
  const { resume, updateResume } = useResumeStore();
  const [activeTab, setActiveTab] = useState('personal');

  const handlePersonalInfoChange = (field: string, value: string) => {
    updateResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  const handleAddEducation = () => {
    updateResume({
      ...resume,
      education: [
        ...resume.education,
        { school: '', degree: '', field: '', startDate: '', endDate: '' },
      ],
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resume.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    updateResume({ ...resume, education: newEducation });
  };

  const handleRemoveEducation = (index: number) => {
    updateResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  };

  const handleAddExperience = () => {
    updateResume({
      ...resume,
      experience: [
        ...resume.experience,
        { company: '', position: '', location: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...resume.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateResume({ ...resume, experience: newExperience });
  };

  const handleRemoveExperience = (index: number) => {
    updateResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index),
    });
  };

  const handleCoverLetterChange = (field: keyof CoverLetter, value: string) => {
    updateResume({
      ...resume,
      coverLetter: {
        ...resume.coverLetter,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="cover">Cover Letter</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={resume.personalInfo.fullName}
              onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
            />
            <Input
              placeholder="Professional Title"
              value={resume.personalInfo.title}
              onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={resume.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={resume.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            />
            <Input
              placeholder="Location"
              value={resume.personalInfo.location}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Professional Summary"
            value={resume.summary}
            onChange={(e) => updateResume({ ...resume, summary: e.target.value })}
          />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          {resume.education.map((edu, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveEducation(index)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
                <Input
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                  />
                  <Input
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={handleAddEducation} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          {resume.experience.map((exp, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveExperience(index)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  />
                  <Input
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <Textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
          <Button onClick={handleAddExperience} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Textarea
            placeholder="Enter your skills (separated by commas)"
            value={resume.skills.join(', ')}
            onChange={(e) => updateResume({ ...resume, skills: e.target.value.split(',').map(s => s.trim()) })}
          />
        </TabsContent>

        <TabsContent value="cover" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Recipient Name"
              value={resume.coverLetter?.recipientName || ''}
              onChange={(e) => handleCoverLetterChange('recipientName', e.target.value)}
            />
            <Input
              placeholder="Recipient Title"
              value={resume.coverLetter?.recipientTitle || ''}
              onChange={(e) => handleCoverLetterChange('recipientTitle', e.target.value)}
            />
            <Input
              placeholder="Company Name"
              value={resume.coverLetter?.companyName || ''}
              onChange={(e) => handleCoverLetterChange('companyName', e.target.value)}
            />
            <Input
              placeholder="Company Address"
              value={resume.coverLetter?.companyAddress || ''}
              onChange={(e) => handleCoverLetterChange('companyAddress', e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Cover Letter Body"
            className="min-h-[300px]"
            value={resume.coverLetter?.letterBody || ''}
            onChange={(e) => handleCoverLetterChange('letterBody', e.target.value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}