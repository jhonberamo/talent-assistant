import React from 'react';
import { X, Download } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer';

interface Candidate {
  "Location": string;
  "Company": string;
  "Job Title": string;
  "Profile Image": string;
  "Experience(Skills/Tools Used)": string;
  "LinkedIn URL": string;
  "Matched Skills": string;
  "Missing Skills": string;
  "Score": number;
  "MatchedReason": string;
  "FitIndicator": string;
  "Skills": string;
  "Full Name": string;
}

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    padding: 5,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    fontSize: 10,
  },
});

const CandidatePDF = ({ candidate }: { candidate: Candidate }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{candidate["Full Name"]}</Text>
        <Text style={styles.subtitle}>{candidate["Job Title"]}</Text>
        <Text style={styles.subtitle}>{candidate["Company"]}</Text>
        <Text style={styles.subtitle}>{candidate.Location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Match Score</Text>
        <Text style={styles.text}>Score: {candidate.Score}%</Text>
        <Text style={styles.text}>Fit Indicator: {candidate.FitIndicator}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Match Analysis</Text>
        <Text style={styles.text}>{candidate.MatchedReason}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skills}>
          {candidate.Skills.split(',').map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill.trim()}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.text}>{candidate["Experience(Skills/Tools Used)"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LinkedIn Profile</Text>
        <Text style={styles.text}>{candidate["LinkedIn URL"]}</Text>
      </View>
    </Page>
  </Document>
);

export const generatePDF = async (candidate: Candidate) => {
  const doc = <CandidatePDF candidate={candidate} />;
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${candidate["Full Name"].replace(/\s+/g, '_')}_profile.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};

export function CandidateModal({ candidate, onClose }: CandidateModalProps) {
  const [showPDF, setShowPDF] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {showPDF ? (
        <div className="bg-white rounded-xl shadow-xl w-full h-[90vh] max-w-4xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">PDF Preview</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => generatePDF(candidate)}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <button
                onClick={() => setShowPDF(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="h-[calc(90vh-64px)]">
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <CandidatePDF candidate={candidate} />
            </PDFViewer>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0">
                {candidate["Profile Image"] !== "N/A" ? (
                  <img
                    src={candidate["Profile Image"]}
                    alt={candidate["Full Name"]}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-blue-500">
                      {candidate["Full Name"].charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {candidate["Full Name"]}
                </h3>
                <p className="text-lg text-gray-600 mb-1">{candidate["Job Title"]}</p>
                <p className="text-gray-500">{candidate.Company}</p>
                <p className="text-gray-500">{candidate.Location}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Match Score</h4>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    candidate.Score >= 90 ? 'bg-green-100 text-green-800' :
                    candidate.Score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    candidate.Score >= 50 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Score: {candidate.Score}%
                  </div>
                  <span className="text-gray-600">{candidate.FitIndicator}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Match Analysis</h4>
                <p className="text-gray-600">{candidate.MatchedReason}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Experience</h4>
                <p className="text-gray-600 whitespace-pre-line">
                  {candidate["Experience(Skills/Tools Used)"]}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.Skills.split(',').map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 p-6 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <a
                href={candidate["LinkedIn URL"]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                View LinkedIn Profile
              </a>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => generatePDF(candidate)}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowPDF(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Preview PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}