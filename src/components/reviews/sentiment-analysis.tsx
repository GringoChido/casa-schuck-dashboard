import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { SentimentTheme } from '@/types/dashboard';

interface SentimentAnalysisProps {
  themes: SentimentTheme[];
}

export const SentimentAnalysis = ({ themes }: SentimentAnalysisProps) => {
  const positive = themes.filter((t) => t.sentiment === 'positive');
  const negative = themes.filter((t) => t.sentiment === 'negative');
  const maxMentions = Math.max(...themes.map((t) => t.mentions));

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Sentiment Analysis</h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="w-3.5 h-3.5 text-dashboard-success" />
            <span className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium">Top Positives</span>
          </div>
          <div className="space-y-2">
            {positive.map((theme) => (
              <div key={theme.theme} className="flex items-center gap-3">
                <span className="text-xs text-white w-20">{theme.theme}</span>
                <div className="flex-1 bg-dashboard-border rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-dashboard-success rounded-full transition-all"
                    style={{ width: `${(theme.mentions / maxMentions) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-dashboard-text-secondary w-8 text-right">{theme.mentions}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-dashboard-border pt-4">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsDown className="w-3.5 h-3.5 text-dashboard-danger" />
            <span className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium">Areas to Improve</span>
          </div>
          <div className="space-y-2">
            {negative.map((theme) => (
              <div key={theme.theme} className="flex items-center gap-3">
                <span className="text-xs text-white w-20">{theme.theme}</span>
                <div className="flex-1 bg-dashboard-border rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-dashboard-danger/70 rounded-full transition-all"
                    style={{ width: `${(theme.mentions / maxMentions) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-dashboard-text-secondary w-8 text-right">{theme.mentions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
