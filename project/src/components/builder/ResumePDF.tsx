import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import type { Resume } from '../../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  dates: {
    fontSize: 10,
    color: '#666',
  },
  description: {
    fontSize: 10,
    marginTop: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 12,
  },
});

interface ResumePDFProps {
  resume: Resume;
}

export default function ResumePDF({ resume }: ResumePDFProps) {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
            <Text style={styles.title}>{resume.personalInfo.title}</Text>
            <Text style={styles.contact}>
              {resume.personalInfo.email} | {resume.personalInfo.phone} |{' '}
              {resume.personalInfo.location}
            </Text>
          </View>

          {/* Summary */}
          {resume.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.description}>{resume.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resume.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.dates}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resume.education.map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>{edu.school}</Text>
                  <Text style={styles.position}>
                    {edu.degree} in {edu.field}
                  </Text>
                  <Text style={styles.dates}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skills}>
                {resume.skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}