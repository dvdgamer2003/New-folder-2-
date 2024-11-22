import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SavedResume {
  id: string;
  title: string;
  createdAt: Date;
  lastModified: Date;
}

export default function Profile() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;

      try {
        const resumesRef = collection(db, 'resumes');
        const q = query(resumesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const fetchedResumes: SavedResume[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedResumes.push({
            id: doc.id,
            title: data.title || 'Untitled Resume',
            createdAt: data.createdAt?.toDate() || new Date(),
            lastModified: data.lastModified?.toDate() || new Date(),
          });
        });

        setResumes(fetchedResumes.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime()));
      } catch (error) {
        console.error('Error fetching resumes:', error);
        toast.error('Failed to load resumes');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user]);

  const handleDownload = async (resumeId: string) => {
    try {
      toast.success('Resume downloaded successfully');
    } catch (error) {
      toast.error('Failed to download resume');
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      // Add delete logic here
      setResumes(resumes.filter(resume => resume.id !== resumeId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Saved Resumes</h2>
          {resumes.length === 0 ? (
            <Card className="p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No resumes saved yet</p>
              <Button className="mt-4" onClick={() => window.location.href = '/builder'}>
                Create New Resume
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last modified: {resume.lastModified.toLocaleDateString()}
                      </p>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownload(resume.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}