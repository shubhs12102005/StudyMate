import React, { useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  FileText,
  MessageSquare,
  HelpCircle,
  Layers,
  Sparkles,
  Trash2,
  ExternalLink,
  Plus,
  Clock,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Flame,
} from 'lucide-react';
import {
  useGetSubjectsQuery,
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  useDeleteSubjectMutation,
  useGetQuizzesQuery,
  useGetFlashcardsQuery,
  useGetConversationsQuery,
} from '../store/api/apiSlice';
import DocumentUploadZone from '../components/documents/DocumentUploadZone';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { InkProgressBar } from '../components/ui/ProgressRibbon';
import { cn } from '../lib/utils';

export default function SubjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents'); // 'documents' | 'chats' | 'quizzes' | 'flashcards'

  const { data: subjects = [], isLoading: loadingSubjects } = useGetSubjectsQuery();
  const subject = subjects.find((s) => s.id === id);

  const { data: documents = [], refetch: refetchDocs } = useGetDocumentsQuery(
    { subject_id: id },
    { pollingInterval: 3000 } // Poll every 3s to observe queued -> processing -> ready transitions live!
  );

  const { data: allQuizzes = [] } = useGetQuizzesQuery();
  const subjectQuizzes = allQuizzes.filter((q) => q.subject_id === id);

  const { data: allFlashcards = [] } = useGetFlashcardsQuery();
  const subjectCards = allFlashcards.filter((fc) => fc.subject_id === id);

  const { data: allConversations = [] } = useGetConversationsQuery();
  const subjectConversations = allConversations.filter((c) => c.subject_id === id);

  const [deleteDocument] = useDeleteDocumentMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const handleDeleteDoc = async (docId, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this document from the study desk?')) {
      await deleteDocument(docId);
    }
  };

  const handleDeleteSubject = async () => {
    if (window.confirm(`Are you sure you want to delete "${subject?.name}" and all its notes?`)) {
      await deleteSubject(id);
      navigate('/subjects');
    }
  };

  if (loadingSubjects) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-desk-border rounded-lg" />
        <div className="h-44 bg-desk-card border border-desk-border rounded-2xl" />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-desk-ink">
          Notebook not found
        </h2>
        <p className="text-sm text-desk-muted">
          This study notebook may have been archived or removed.
        </p>
        <NavLink to="/subjects">
          <Button variant="primary" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Notebooks</span>
          </Button>
        </NavLink>
      </div>
    );
  }

  const subjectDocs = documents.filter((d) => d.subject_id === id);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Nav */}
      <div className="flex items-center justify-between">
        <NavLink
          to="/subjects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-desk-muted hover:text-desk-ink transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Study Notebooks</span>
        </NavLink>

        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-desk-muted hover:text-rose gap-1"
          onClick={handleDeleteSubject}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Notebook</span>
        </Button>
      </div>

      {/* TACTILE NOTEBOOK COVER HEADER */}
      <div className="relative rounded-2xl border border-desk-border bg-desk-card shadow-desk-md overflow-hidden p-6 sm:p-8">
        {/* Notebook Spine Accent */}
        <div
          style={{ backgroundColor: subject.color }}
          className="absolute top-0 left-0 bottom-0 w-3.5 sm:w-4"
        />

        <div className="pl-3 sm:pl-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border border-current"
              >
                {subject.code}
              </span>
              <span className="text-xs font-mono text-desk-muted">
                {subjectDocs.length} readings • {subjectCards.length} cards • {subjectQuizzes.length} quizzes
              </span>
            </div>

            <div className="flex items-center gap-2">
              <NavLink to="/workspace">
                <Button variant="primary" size="sm" className="gap-1.5 shadow-desk-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ask AI Assistant</span>
                </Button>
              </NavLink>
            </div>
          </div>

          <div className="space-y-1 max-w-3xl">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-desk-ink">
              {subject.name}
            </h1>
            <p className="text-sm text-desk-muted leading-relaxed font-sans">
              {subject.description}
            </p>
          </div>

          {/* Mastery Progress Bar */}
          <div className="pt-2 max-w-md">
            <InkProgressBar
              progress={subject.mastery_percentage || 45}
              label="Notebook Mastery"
              sublabel={`${subject.mastery_percentage || 45}% retention index`}
              color="tangerine"
            />
          </div>
        </div>
      </div>

      {/* NOTEBOOK SECTION TABS */}
      <div className="flex items-center gap-2 border-b border-desk-border overflow-x-auto pb-1 text-sm font-mono">
        <button
          onClick={() => setActiveTab('documents')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-t-xl border-b-2 font-medium transition-all whitespace-nowrap',
            activeTab === 'documents'
              ? 'border-tangerine text-tangerine bg-tangerine/5'
              : 'border-transparent text-desk-muted hover:text-desk-ink'
          )}
        >
          <FileText className="h-4 w-4" />
          <span>Documents & Upload ({subjectDocs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chats')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-t-xl border-b-2 font-medium transition-all whitespace-nowrap',
            activeTab === 'chats'
              ? 'border-tangerine text-tangerine bg-tangerine/5'
              : 'border-transparent text-desk-muted hover:text-desk-ink'
          )}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Study Chats ({subjectConversations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-t-xl border-b-2 font-medium transition-all whitespace-nowrap',
            activeTab === 'quizzes'
              ? 'border-tangerine text-tangerine bg-tangerine/5'
              : 'border-transparent text-desk-muted hover:text-desk-ink'
          )}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Quizzes ({subjectQuizzes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-t-xl border-b-2 font-medium transition-all whitespace-nowrap',
            activeTab === 'flashcards'
              ? 'border-tangerine text-tangerine bg-tangerine/5'
              : 'border-transparent text-desk-muted hover:text-desk-ink'
          )}
        >
          <Layers className="h-4 w-4" />
          <span>Flashcard Deck ({subjectCards.length})</span>
        </button>
      </div>

      {/* TAB 1: DOCUMENTS & LIVE UPLOAD ZONE */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Drag & Drop Upload Component */}
          <DocumentUploadZone subjectId={id} onUploadComplete={() => refetchDocs()} />

          {/* Document List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-desk-ink">
                Indexed Readings ({subjectDocs.length})
              </h3>
              <span className="text-xs font-mono text-desk-muted">
                Live status auto-updates
              </span>
            </div>

            {subjectDocs.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-desk-border rounded-xl bg-desk-card">
                <FileText className="h-8 w-8 text-desk-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm font-serif text-desk-ink">No readings uploaded yet</p>
                <p className="text-xs text-desk-muted mt-1">
                  Drop your first PDF syllabus or lecture slides above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {subjectDocs.map((doc) => (
                  <Card
                    key={doc.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-desk-border hover:shadow-desk-sm transition-all"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-tangerine/10 text-tangerine flex items-center justify-center shrink-0 border border-tangerine/20">
                        <FileText className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-serif text-sm sm:text-base font-bold text-desk-ink truncate">
                            {doc.title}
                          </h4>

                          {/* Live Status Badge */}
                          {doc.status === 'queued' && (
                            <Badge variant="amber" className="text-[10px] gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Queued for AI</span>
                            </Badge>
                          )}
                          {doc.status === 'processing' && (
                            <Badge variant="violet" className="text-[10px] gap-1">
                              <RotateCw className="h-3 w-3 animate-spin" />
                              <span>Processing {doc.processing_progress}%</span>
                            </Badge>
                          )}
                          {doc.status === 'ready' && (
                            <Badge variant="mint" className="text-[10px] gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Indexed & Ready</span>
                            </Badge>
                          )}
                          {doc.status === 'failed' && (
                            <Badge variant="rose" className="text-[10px] gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>Indexing Failed</span>
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] font-mono text-desk-muted">
                          <span>{doc.page_count} pages</span>
                          <span>•</span>
                          <span>{(doc.file_size_bytes / 1024 / 1024).toFixed(1)} MB</span>
                          <span>•</span>
                          <span>Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}</span>
                        </div>

                        {doc.summary_short && (
                          <p className="text-xs text-desk-muted line-clamp-1 italic font-sans pt-0.5">
                            "{doc.summary_short}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <NavLink to="/workspace">
                        <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                          <span>Open in Desk</span>
                          <ExternalLink className="h-3.5 w-3.5 text-desk-muted" />
                        </Button>
                      </NavLink>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={(e) => handleDeleteDoc(doc.id, e)}
                        title="Remove Document"
                      >
                        <Trash2 className="h-4 w-4 text-desk-muted hover:text-rose" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CHATS */}
      {activeTab === 'chats' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-desk-ink">
              Recent Study Sessions
            </h3>
            <NavLink to="/workspace">
              <Button size="sm" variant="primary" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                <span>New AI Chat</span>
              </Button>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectConversations.length > 0 ? (
              subjectConversations.map((c) => (
                <Card key={c.id} className="p-4 space-y-3 border border-desk-border hover:shadow-desk-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-desk-muted">
                      {new Date(c.updated_at).toLocaleDateString()}
                    </span>
                    <Badge variant="violet" className="text-[10px]">Active Session</Badge>
                  </div>
                  <h4 className="font-serif text-base font-bold text-desk-ink">
                    {c.title}
                  </h4>
                  <p className="text-xs text-desk-muted line-clamp-2">
                    Questions analyzed with verified PDF page citations.
                  </p>
                  <NavLink to="/workspace" className="block pt-2">
                    <Button size="sm" variant="secondary" className="w-full justify-between">
                      <span>Resume Chat</span>
                      <ExternalLink className="h-3.5 w-3.5 text-tangerine" />
                    </Button>
                  </NavLink>
                </Card>
              ))
            ) : (
              <Card className="p-6 col-span-2 text-center text-xs text-desk-muted font-mono">
                No conversations yet. Open the AI workspace to ask questions about your documents.
              </Card>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-desk-ink">
              Practice Quizzes
            </h3>
            <NavLink to="/quizzes">
              <Button size="sm" variant="primary" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                <span>Generate Quiz</span>
              </Button>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectQuizzes.map((q) => (
              <Card key={q.id} className="p-5 space-y-3 border border-desk-border">
                <div className="flex items-center justify-between">
                  <Badge variant={q.difficulty === 'hard' ? 'rose' : 'amber'}>
                    {q.difficulty.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-mint">
                    Best: {q.best_score_percentage}%
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-desk-ink">
                  {q.title}
                </h4>
                <p className="text-xs text-desk-muted">
                  {q.questions?.length || 5} questions with cited explanations.
                </p>
                <NavLink to="/quizzes" className="block pt-2">
                  <Button size="sm" variant="primary" className="w-full">
                    Start Quiz
                  </Button>
                </NavLink>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-desk-ink">
              Spaced Repetition Flashcards ({subjectCards.length})
            </h3>
            <NavLink to="/flashcards">
              <Button size="sm" variant="primary" className="gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>Review Deck</span>
              </Button>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectCards.slice(0, 6).map((card) => (
              <Card key={card.id} className="p-4 space-y-2 border border-desk-border ruled-lines">
                <div className="flex items-center justify-between text-[10px] font-mono text-desk-muted">
                  <span>{card.topic}</span>
                  <span className="text-tangerine font-semibold">Rep #{card.repetitions}</span>
                </div>
                <p className="font-serif text-sm font-semibold text-desk-ink line-clamp-2">
                  {card.front}
                </p>
                <p className="text-xs text-desk-muted font-sans line-clamp-2 pt-1 border-t border-desk-border/40">
                  {card.back}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
