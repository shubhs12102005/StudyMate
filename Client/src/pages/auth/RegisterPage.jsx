import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { api } from '../../api';
import { setCredentials } from '../../store/slices/authSlice';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid academic email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the academic honor code and terms' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthError('');
      setIsSubmitting(true);
      const res = await api.auth.signUp({
        full_name: data.fullName,
        email: data.email,
        password: data.password,
      });
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate('/dashboard');
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleMock = async () => {
    try {
      setIsSubmitting(true);
      const res = await api.auth.signUp({
        full_name: 'Scholar Explorer',
        email: 'scholar.explorer@university.edu',
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
      title="Create your study desk"
      subtitle="Join thousands of students turning dense textbooks and syllabi into active retention."
    >
      {authError && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose/10 border border-rose/30 text-rose text-xs font-mono">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-desk-muted" />
            <span>Full Name</span>
          </label>
          <Input
            type="text"
            placeholder="e.g. Elena Rostova"
            error={!!errors.fullName}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-xs text-rose font-mono mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-desk-muted" />
            <span>Academic or Personal Email</span>
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
          <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-desk-muted" />
            <span>Create Password</span>
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 6 characters"
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

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-desk-muted" />
            <span>Confirm Password</span>
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            error={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-rose font-mono mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Honor Code & Terms checkbox */}
        <div className="pt-1">
          <div className="flex items-start gap-2">
            <input
              id="agreeTerms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-desk-border text-tangerine focus:ring-tangerine/30 cursor-pointer accent-tangerine"
              {...register('agreeTerms')}
            />
            <label htmlFor="agreeTerms" className="text-xs text-desk-muted font-sans cursor-pointer select-none leading-relaxed">
              I agree to the StudyMate Academic Honor Code and Privacy Policy. I will use citations for learning integrity.
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-rose font-mono mt-1">{errors.agreeTerms.message}</p>
          )}
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
              <span>Preparing Your Desk...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Open My Free Study Desk</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-3">
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
        <span className="font-mono text-xs">Sign up with University Google Account</span>
      </Button>

      {/* Switch to Login link */}
      <div className="pt-2 text-center text-xs font-sans text-desk-muted">
        Already have a study desk?{' '}
        <NavLink
          to="/login"
          className="font-mono font-medium text-tangerine hover:underline"
        >
          Sign in to your desk →
        </NavLink>
      </div>
    </AuthLayout>
  );
}
