import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ScoreCategory {
  name: string;
  score: number;
  feedback: string;
  status: 'good' | 'warning' | 'bad';
}

export default function ResumeScoreChecker() {
  const { resume } = useResumeStore();
  const [isChecking, setIsChecking] = useState(false);
  const [scores, setScores] = useState<ScoreCategory[]>([]);
  const [overallScore, setOverallScore] = useState<number | null>(null);

  const analyzeResume = async () => {
    setIsChecking(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simple scoring logic (this would be replaced with actual AI analysis)
    const categories: ScoreCategory[] = [
      {
        name: 'Content Quality',
        score: resume.experience.length > 2 ? 90 : 70,
        feedback: resume.experience.length > 2 
          ? 'Good amount of experience details provided'
          : 'Consider adding more detailed work experience',
        status: resume.experience.length > 2 ? 'good' : 'warning'
      },
      {
        name: 'ATS Compatibility',
        score: 85,
        feedback: 'Good use of standard sections and keywords',
        status: 'good'
      },
      {
        name: 'Skills Match',
        score: resume.skills.length > 5 ? 95 : 75,
        feedback: resume.skills.length > 5 
          ? 'Strong skill set demonstrated'
          : 'Consider adding more relevant skills',
        status: resume.skills.length > 5 ? 'good' : 'warning'
      },
      {
        name: 'Format & Structure',
        score: 90,
        feedback: 'Well-structured and easy to read',
        status: 'good'
      }
    ];

    const overall = Math.round(
      categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length
    );

    setScores(categories);
    setOverallScore(overall);
    setIsChecking(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full space-y-6 p-6 bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Resume Score Checker</h2>
        <Button 
          onClick={analyzeResume} 
          disabled={isChecking}
          className="gap-2"
        >
          {isChecking ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Check Score'
          )}
        </Button>
      </div>

      {overallScore !== null && (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
          <div className="text-center p-6 bg-background rounded-lg animate-in zoom-in-95 duration-300">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)} animate-in fade-in duration-700`}>
              {overallScore}%
            </div>
            <div className="text-muted-foreground mt-2">Overall Score</div>
          </div>

          <div className="space-y-4">
            {scores.map((category, index) => (
              <div 
                key={category.name} 
                className="space-y-2 animate-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{category.name}</div>
                  <div className={`font-semibold ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </div>
                </div>
                <Progress 
                  value={category.score} 
                  className="h-2 transition-all duration-500 ease-in-out"
                  indicatorClassName={`${getProgressColor(category.score)} transition-all duration-1000 ease-out`}
                />
                <div className="flex items-center gap-2 text-sm">
                  {category.status === 'good' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-muted-foreground">{category.feedback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
