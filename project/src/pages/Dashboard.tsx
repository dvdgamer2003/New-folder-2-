import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Plus, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Resume } from '../types/resume';

interface SavedResume {
  id: string;
  created_at: string;
  data: Resume;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setResumes(data || []);
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Resumes</h1>
          <button
            onClick={() => navigate('/builder')}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Resume
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start creating your professional resume now
            </p>
            <button
              onClick={() => navigate('/builder')}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      {resume.data.personalInfo.fullName || 'Untitled Resume'}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {resume.data.personalInfo.title || 'No title'}
                    </p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Last updated:{' '}
                  {new Date(resume.created_at).toLocaleDateString()}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/builder/${resume.id}`)}
                    className="btn btn-secondary text-sm flex-1"
                  >
                    Edit
                  </button>
                  <button className="btn btn-secondary text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}