import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Plus,
  BookOpen,
  Search,
  ArrowRight,
  FileText,
  Layers,
  HelpCircle,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useGetSubjectsQuery, useDeleteSubjectMutation } from '../store/api/apiSlice';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { InkProgressBar } from '../components/ui/ProgressRibbon';
import CreateSubjectModal from '../components/subjects/CreateSubjectModal';

export default function SubjectsPage() {
  const { data: subjects = [], isLoading } = useGetSubjectsQuery();
  const [deleteSubject] = useDeleteSubjectMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id, name, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Delete notebook "${name}" and all its documents?`)) {
      await deleteSubject(id);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-desk-border pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-tangerine bg-tangerine/10 px-2.5 py-0.5 rounded-full border border-tangerine/20">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Academic Notebooks Hub</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
            Your Study Notebooks
          </h1>
          <p className="text-xs sm:text-sm text-desk-muted max-w-xl font-sans">
            Every subject binds its own syllabi, verified page citations, flashcard decks, and practice tests.
          </p>
        </div>

        <Button
          id="new-notebook-btn"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="gap-2 self-start sm:self-auto shadow-desk-md"
        >
          <Plus className="h-4 w-4" />
          <span>New Notebook</span>
        </Button>
      </div>

      {/* Search & Stats Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="h-4 w-4 text-desk-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="text-xs font-mono text-desk-muted self-end sm:self-auto">
          Showing <strong>{filteredSubjects.length}</strong> of {subjects.length} notebooks
        </div>
      </div>

      {/* Notebook Cards Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-desk-border rounded-2xl bg-desk-card space-y-3">
          <BookOpen className="h-10 w-10 text-desk-muted mx-auto opacity-40" />
          <h3 className="font-serif text-lg font-bold text-desk-ink">No notebooks found</h3>
          <p className="text-xs text-desk-muted max-w-sm mx-auto">
            {searchQuery
              ? `No subject matched "${searchQuery}". Try another keyword or create a new notebook.`
              : 'Start by creating your first study notebook to organize course documents.'}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="gap-1.5 mt-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Notebook</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subj) => (
            <NavLink
              to={`/subjects/${subj.id}`}
              key={subj.id}
              className="group block"
            >
              <Card className="h-full relative overflow-hidden border border-desk-border hover:border-tangerine/50 shadow-desk-sm hover:shadow-desk-md transition-all duration-200 flex flex-col justify-between p-6">
                {/* Physical Notebook Spine Accent */}
                <div
                  style={{ backgroundColor: subj.color }}
                  className="absolute top-0 left-0 bottom-0 w-3 transition-all duration-200 group-hover:w-3.5"
                />

                <div className="pl-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        backgroundColor: `${subj.color}15`,
                        color: subj.color,
                        borderColor: `${subj.color}35`,
                      }}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                    >
                      {subj.code}
                    </span>

                    <button
                      onClick={(e) => handleDelete(subj.id, subj.name, e)}
                      title="Delete notebook"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-desk-muted hover:text-rose"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-desk-ink group-hover:text-tangerine transition-colors">
                      {subj.name}
                    </h3>
                    <p className="text-xs text-desk-muted line-clamp-2 mt-1 leading-relaxed font-sans">
                      {subj.description}
                    </p>
                  </div>

                  {/* Mastery Progress Bar */}
                  <div className="pt-2">
                    <InkProgressBar
                      progress={subj.mastery_percentage || 45}
                      label="Subject Mastery"
                      sublabel={`${subj.mastery_percentage || 45}%`}
                      color={subj.color === '#FF6B35' ? 'tangerine' : 'mint'}
                    />
                  </div>
                </div>

                <div className="pl-3 pt-4 mt-4 border-t border-desk-border/60 flex items-center justify-between text-xs font-mono text-desk-muted">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-desk-muted" />
                      {subj.document_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-desk-muted" />
                      {subj.flashcard_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5 text-desk-muted" />
                      {subj.quiz_count || 0}
                    </span>
                  </div>

                  <span className="text-tangerine group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 text-xs font-semibold">
                    Open <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
      )}

      {/* Create Subject Modal */}
      <CreateSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
