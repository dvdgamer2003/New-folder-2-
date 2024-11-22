import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Activity } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalResumes: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalResumes: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const resumesSnapshot = await getDocs(collection(db, 'resumes'));
        
        setStats({
          totalUsers: usersSnapshot.size,
          totalResumes: resumesSnapshot.size,
          activeUsers: usersSnapshot.docs.filter(doc => doc.data().lastActive > Date.now() - 86400000).length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.email}
          </span>
          <Button variant="outline">Refresh Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Total Resumes</h3>
              <p className="text-3xl font-bold">{stats.totalResumes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">Active Users (24h)</h3>
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add more admin features here */}
    </div>
  );
}