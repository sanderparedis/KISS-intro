import React from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Monitor, Sparkles, AlertTriangle, Wand2, HelpCircle, Award } from 'lucide-react';
import { StudentSession } from '../../types';

interface SlideThumbnail {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  icon: any;
  bgPreview: string;
}

interface PowerPointSlideThumbnailsProps {
  activeModule: string;
  setActiveModule: (mod: string) => void;
  session: StudentSession | null;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SLIDE_THUMBNAILS: SlideThumbnail[] = [
  {
    id: 'intro',
    num: 1,
    title: 'Waarom Presenteren?',
    subtitle: 'Doel & Publiek',
    icon: Monitor,
    bgPreview: 'bg-slate-800 text-white',
  },
  {
    id: 'kiss',
    num: 2,
    title: 'Het KISS-Principe',
    subtitle: 'De 4 Vuistregels',
    icon: Sparkles,
    bgPreview: 'bg-orange-600 text-white',
  },
  {
    id: 'spot',
    num: 3,
    title: 'Spot de Fout!',
    subtitle: 'Foutenspeurtocht',
    icon: AlertTriangle,
    bgPreview: 'bg-amber-100 text-amber-900',
  },
  {
    id: 'makeover',
    num: 4,
    title: 'Makeover Studio',
    subtitle: 'Zelf Renoveren',
    icon: Wand2,
    bgPreview: 'bg-slate-900 text-white',
  },
  {
    id: 'quiz',
    num: 5,
    title: 'De KISS-Quiz',
    subtitle: '8 Kennistestvragen',
    icon: HelpCircle,
    bgPreview: 'bg-blue-900 text-white',
  },
  {
    id: 'diploma',
    num: 6,
    title: 'Diploma & Rapport',
    subtitle: 'LPD Evaluatie',
    icon: Award,
    bgPreview: 'bg-amber-400 text-slate-900',
  },
];

export const PowerPointSlideThumbnails: React.FC<PowerPointSlideThumbnailsProps> = ({
  activeModule,
  setActiveModule,
  session,
  collapsed,
  setCollapsed,
}) => {
  return (
    <aside
      className={`bg-[#F0F0F0] border-r border-[#D9D9D9] flex flex-col shrink-0 select-none transition-all duration-200 ${
        collapsed ? 'w-12' : 'w-48 sm:w-60'
      }`}
    >
      {/* Top Header of Sidebar */}
      <div className="p-2 border-b border-[#D9D9D9] flex items-center justify-between text-xs text-slate-600 font-semibold">
        {!collapsed && <span>Dia-overzicht ({SLIDE_THUMBNAILS.length})</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 mx-auto sm:mx-0 transition-colors"
          title={collapsed ? 'Diaoverzicht uitklappen' : 'Diaoverzicht inklappen'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Slide Thumbnails List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {SLIDE_THUMBNAILS.map((slide) => {
          const isActive = activeModule === slide.id;
          const isCompleted = session?.completedModules.includes(slide.id);
          const Icon = slide.icon;

          return (
            <div
              key={slide.id}
              onClick={() => setActiveModule(slide.id)}
              className="group flex items-start gap-1.5 cursor-pointer"
            >
              {/* Slide Number */}
              <span
                className={`text-[11px] font-bold mt-1 w-4 text-right shrink-0 ${
                  isActive ? 'text-[#D24726]' : 'text-slate-500'
                }`}
              >
                {slide.num}
              </span>

              {/* Slide Thumbnail Box (16:9 ratio) */}
              <div
                className={`flex-1 rounded border transition-all relative overflow-hidden ${
                  isActive
                    ? 'border-[#D24726] ring-2 ring-[#D24726]/30 shadow-sm'
                    : 'border-slate-300 hover:border-slate-400 bg-white'
                }`}
              >
                {/* Visual miniature */}
                <div
                  className={`aspect-16/10 p-2 flex flex-col justify-between ${slide.bgPreview} ${
                    collapsed ? 'h-8' : 'h-18 sm:h-22'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-3.5 h-3.5 opacity-80" />
                    {isCompleted && (
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  {!collapsed && (
                    <div className="truncate">
                      <span className="block text-[10px] font-extrabold truncate">
                        {slide.title}
                      </span>
                      <span className="block text-[8px] opacity-75 truncate">
                        {slide.subtitle}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info */}
      {!collapsed && (
        <div className="p-2.5 border-t border-[#D9D9D9] bg-slate-100 text-[10px] text-slate-500 text-center">
          <span>Microsoft PowerPoint Lay-out</span>
        </div>
      )}
    </aside>
  );
};
