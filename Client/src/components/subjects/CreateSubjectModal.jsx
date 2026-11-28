import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Check } from 'lucide-react';
import { useCreateSubjectMutation } from '../../store/api/apiSlice';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';

const COLOR_OPTIONS = [
  { label: 'Tangerine', value: '#FF6B35' },
  { label: 'Highlighter Amber', value: '#FFD84D' },
  { label: 'Electric Violet', value: '#6D4AFF' },
  { label: 'Mint Sage', value: '#2EC4A0' },
  { label: 'Crimson Rose', value: '#E5484D' },
  { label: 'Prussian Blue', value: '#2B5C8F' },
];

export default function CreateSubjectModal({ isOpen, onClose }) {
  const [createSubject, { isLoading }] = useCreateSubjectMutation();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState('#FF6B35');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Subject title is required');
      return;
    }

    try {
      setError('');
      await createSubject({
        name: name.trim(),
        code: code.trim().toUpperCase() || 'SUB-101',
        color,
        description: description.trim() || 'Comprehensive course documents and exam materials.',
        icon: 'BookOpen',
      }).unwrap();

      setName('');
      setCode('');
      setDescription('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create subject');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-desk-border bg-desk-card p-6 shadow-desk-xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-desk-border pb-4">
          <div className="flex items-center gap-2.5">
            <div
              style={{ backgroundColor: color }}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-desk-sm transition-colors"
            >
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-desk-ink">
                Create Study Notebook
              </h2>
              <p className="text-xs text-desk-muted">
                Bind a new discipline for document indexing and quizzes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-desk-muted hover:text-desk-ink hover:bg-desk-sub transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose/10 border border-rose/30 text-rose text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono font-medium text-desk-ink">
                Subject Name *
              </label>
              <Input
                type="text"
                placeholder="e.g. Cognitive Neuroscience"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-desk-ink">
                Course Code
              </label>
              <Input
                type="text"
                placeholder="NEUR-301"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          {/* Color Spine Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-desk-ink block">
              Notebook Spine Hue
            </label>
            <div className="flex items-center gap-3">
              {COLOR_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                  className={`w-8 h-8 rounded-full border-2 transition-transform flex items-center justify-center shadow-desk-sm ${
                    color === c.value
                      ? 'border-desk-ink scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                >
                  {color === c.value && (
                    <Check className={`h-4 w-4 ${c.value === '#FFD84D' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-desk-ink">
              Description or Syllabus Scope
            </label>
            <Textarea
              rows={3}
              placeholder="e.g. Neural circuitry, synaptic plasticity, memory models, and fMRI data interpretation."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-desk-border">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isLoading}
              className="gap-1.5"
            >
              {isLoading ? (
                <span>Binding Notebook...</span>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Create Notebook</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
