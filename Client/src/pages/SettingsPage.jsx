import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setTheme } from '../store/slices/themeSlice';
import { api } from '../api/index';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sun, Moon, RotateCw, User, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);

  const handleResetData = async () => {
    if (window.confirm('Reset all demo seed data to pristine state?')) {
      await api.resetSeeds();
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-desk-border pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
          Study Desk Settings
        </h1>
        <p className="text-xs sm:text-sm text-desk-muted">
          Manage your study profile, appearance theme, and local demo data.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <CardTitle className="text-base flex items-center gap-2">
          <User className="h-4 w-4 text-tangerine" /> Scholar Profile
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-desk-muted block">Full Name</span>
            <span className="text-sm font-sans font-semibold text-desk-ink">{user?.full_name || 'Alex Vance'}</span>
          </div>
          <div>
            <span className="text-desk-muted block">Email</span>
            <span className="text-sm font-sans font-semibold text-desk-ink">{user?.email || 'alex.study@university.edu'}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <CardTitle className="text-base">Appearance Theme</CardTitle>
        <CardDescription>Select between the daytime paper desk and nocturnal midnight library.</CardDescription>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => dispatch(setTheme('paper'))}
            className={`flex-1 p-4 rounded-xl border text-left transition-all ${theme === 'paper' ? 'border-tangerine bg-tangerine/10 shadow-desk-sm' : 'border-desk-border bg-desk-card'}`}
          >
            <Sun className="h-5 w-5 text-amber-glow mb-2" />
            <div className="font-serif font-bold text-sm text-desk-ink">Paper (Day)</div>
            <div className="text-[11px] text-desk-muted">Warm off-white #F6F1E7, carbon ink</div>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setTheme('midnight'))}
            className={`flex-1 p-4 rounded-xl border text-left transition-all ${theme === 'midnight' ? 'border-violet bg-violet/10 shadow-desk-sm' : 'border-desk-border bg-desk-card'}`}
          >
            <Moon className="h-5 w-5 text-violet mb-2" />
            <div className="font-serif font-bold text-sm text-desk-ink">Midnight Library</div>
            <div className="text-[11px] text-desk-muted">Deep ink-navy #0E0F1A, amber glow</div>
          </button>
        </div>
      </Card>

      <Card className="p-6 space-y-4 border-rose/30">
        <CardTitle className="text-base text-rose flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" /> Demo Reset Zone
        </CardTitle>
        <CardDescription>
          Reset in-memory and localStorage data back to pristine demo state.
        </CardDescription>
        <Button variant="rose" size="sm" onClick={handleResetData} className="gap-2">
          <RotateCw className="h-3.5 w-3.5" /> Reset Demo Seeds
        </Button>
      </Card>
    </div>
  );
}
