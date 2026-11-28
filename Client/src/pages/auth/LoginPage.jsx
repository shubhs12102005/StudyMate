import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { api } from '../../api';
import { setCredentials } from '../../store/slices/authSlice';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthError('');
      setIsSubmitting(true);
      const res = await api.auth.signIn({
        email: data.email,
        password: data.password,
      });
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate('/dashboard');
    } catch (err) {
      setAuthError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = () => {
    setValue('email', 'alex.chen@university.edu');
    setValue('password', 'scholar1234');
    setAuthError('');
  };

  const handleGoogleMock = async () => {
    try {
      setIsSubmitting(true);
      const res = await api.auth.signIn({
        email: 'alex.chen@university.edu',
        password: 'mock-google-oauth-token',
      });
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate('/dashboard');
    } catch (err) {
      setAuthError('Google sign in simulation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back to your desk"
      subtitle="Sign in to continue reviewing your documents, study streaks, and spaced repetition cards."
    >
      {authError && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose/10 border border-rose/30 text-rose text-xs font-mono">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Quick Demo Login Pill */}
      <div className="p-3 rounded-xl bg-tangerine/10 border border-tangerine/30 flex items-center justify-between">
        <div className="text-xs">
          <span className="font-mono font-bold text-tangerine block">Demo Student Preset</span>
          <span className="text-[11px] text-desk-muted">alex.chen@university.edu</span>
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="text-xs h-7 py-0 px-2.5 gap-1 border-tangerine/40 text-tangerine hover:bg-tangerine hover:text-white"
          onClick={handleQuickDemo}
        >
          <Sparkles className="h-3 w-3" />
          <span>Auto-fill</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-desk-muted" />
            <span>Academic Email</span>
          </label>
          <Input
            type="email"
            placeholder="scholar@university.edu"
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-rose font-mono mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-desk-muted" />
              <span>Password</span>
            </label>
            <NavLink
              to="/forgot-password"
              className="text-xs font-mono text-tangerine hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              error={!!errors.password}
              className="pr-10"
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-desk-muted hover:text-desk-ink transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose font-mono mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 rounded border-desk-border text-tangerine focus:ring-tangerine/30 cursor-pointer accent-tangerine"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="text-xs text-desk-muted font-sans cursor-pointer select-none">
            Keep this study desk active on this device
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full gap-2 shadow-desk-md mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Entering Study Desk...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Sign In to Study Desk</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-desk-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase font-mono">
          <span className="bg-desk-card px-3 text-desk-muted">or continue with</span>
        </div>
      </div>

      {/* Mock Google OAuth button */}
      <Button
        type="button"
        variant="secondary"
        className="w-full gap-2.5 h-11 border-desk-border"
        onClick={handleGoogleMock}
        disabled={isSubmitting}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span className="font-mono text-xs">Continue with University Google Account</span>
      </Button>

      {/* Switch to Register link */}
      <div className="pt-2 text-center text-xs font-sans text-desk-muted">
        Don't have an active desk?{' '}
        <NavLink
          to="/register"
          className="font-mono font-medium text-tangerine hover:underline"
        >
          Create your study desk →
        </NavLink>
      </div>
    </AuthLayout>
  );
}
