import React, { useState } from 'react';
import { Search, Loader2, User, Building, ExternalLink, Award, XCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { CandidateModal } from '../components/candidates/CandidateModal';

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

export function CandidateSearch() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCandidates([]);

    if (!import.meta.env.VITE_SEARCH_WEB_SCRAPING_API_URL) {
      setError('API URL is not configured. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_SEARCH_WEB_SCRAPING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      
      if (!text) {
        throw new Error('Server returned empty response');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }

      if (!Array.isArray(data)) {
        throw new Error('Server returned invalid data format');
      }

      setCandidates(data);
    } catch (error) {
      console.error('Search error:', error);
      setError(
        error instanceof Error 
          ? `Search failed: ${error.message}` 
          : 'An unexpected error occurred while searching'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    if (score >= 50) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const formatSkillsList = (skills: string) => {
    return skills.split(',').map(skill => skill.trim()).filter(skill => skill && skill !== 'Git' && skill !== 'JIRA');
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Search</h1>
              <p className="text-gray-600 max-w-3xl">
                Find the perfect candidates for your roles using our advanced AI-powered search. Enter your job requirements below, and we'll match you with candidates who best fit your criteria, analyzing skills, experience, and overall compatibility.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Senior React Developer"
                required
              />
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter detailed job requirements and responsibilities..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 ease-in-out disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Find Matching Candidates
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {candidates.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {candidates.map((candidate, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {candidate["Profile Image"] !== "N/A" ? (
                        <img
                          src={candidate["Profile Image"]}
                          alt={candidate["Full Name"]}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">{candidate["Full Name"]}</h3>
                      <p className="text-sm text-gray-600 truncate">{candidate["Job Title"]}</p>
                      {candidate["Company"] !== "N/A" && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
                          <Building className="w-4 h-4 flex-shrink-0" />
                          {candidate["Company"]}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(candidate.Score)}`}>
                        Score: {candidate.Score}%
                      </div>
                      <span className="text-sm font-medium mt-2 text-right">{candidate.FitIndicator}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    {candidate["Matched Skills"] !== "(None)" && candidate["Matched Skills"] !== "None" && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Matched Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate["Matched Skills"].split('\n').map((skill, idx) => (
                            skill.trim() && (
                              <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {skill.trim()}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {candidate["Missing Skills"] !== "N/A" && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          Missing Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate["Missing Skills"].split('\n').map((skill, idx) => (
                            skill.trim() && (
                              <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                {skill.trim()}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        All Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formatSkillsList(candidate.Skills).map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Match Analysis</h4>
                      <p className="text-sm text-gray-600">{candidate.MatchedReason}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-xl mt-auto">
                  <button
                    onClick={() => setSelectedCandidate(candidate)}
                    className="w-full flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                  >
                    View Profile <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {!isLoading && !error && candidates.length === 0 && jobTitle && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600">No candidates found. Try adjusting your search criteria.</p>
          </div>
        )}

        {selectedCandidate && (
          <CandidateModal
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        )}
      </div>
    </div>
  );
}