import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { api } from '../../api';

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successEmail, setSuccessEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    try {
      setAuthError('');
      setIsSubmitting(true);
      await api.auth.resetPassword({ email: data.email });
      setSuccessEmail(data.email);
    } catch (err) {
      setAuthError(err.message || 'Unable to send recovery email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email associated with your StudyMate desk and we'll dispatch a secure recovery link."
    >
      {authError && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose/10 border border-rose/30 text-rose text-xs font-mono">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {successEmail ? (
        <div className="p-6 rounded-2xl bg-desk-card border border-desk-border shadow-desk-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-mint/15 text-mint flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-desk-ink">
              Check your inbox
            </h3>
            <p className="text-xs text-desk-muted font-sans leading-relaxed">
              We have dispatched password recovery instructions to:
            </p>
            <p className="text-xs font-mono font-semibold text-tangerine bg-tangerine/10 py-1 px-3 rounded-lg inline-block mt-1">
              {successEmail}
            </p>
          </div>

          <p className="text-[11px] text-desk-muted font-mono pt-2 border-t border-desk-border">
            Did not receive the email? Check your spam folder or request a new link in 60 seconds.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5"
              onClick={() => setSuccessEmail('')}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Try Another Email</span>
            </Button>
            <NavLink to="/login">
              <Button variant="primary" size="sm" className="w-full sm:w-auto">
                Back to Sign In
              </Button>
            </NavLink>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-desk-ink flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-desk-muted" />
              <span>Registered Email Address</span>
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
                <span>Sending Recovery Email...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Send Password Reset Instructions</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <div className="pt-4 text-center">
            <NavLink
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-desk-muted hover:text-desk-ink transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Sign In</span>
            </NavLink>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
