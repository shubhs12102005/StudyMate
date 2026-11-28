import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useUploadDocumentMutation, useGetDocumentsQuery } from '../../store/api/apiSlice';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export default function DocumentUploadZone({ subjectId, onUploadComplete }) {
  const [uploadDocument, { isLoading: isUploading }] = useUploadDocumentMutation();
  const [dragActive, setDragActive] = useState(false);
  const [activeUploads, setActiveUploads] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFiles = async (files) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadId = `upload-${Date.now()}-${i}`;

      const newUpload = {
        id: uploadId,
        fileName: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        progress: 10,
        status: 'uploading',
        error: null,
      };

      setActiveUploads((prev) => [newUpload, ...prev]);

      // Animate progress up to 100%
      let p = 15;
      const interval = setInterval(() => {
        p += 25;
        if (p >= 100) {
          clearInterval(interval);
        }
        setActiveUploads((prev) =>
          prev.map((item) => (item.id === uploadId ? { ...item, progress: Math.min(p, 95) } : item))
        );
      }, 100);

      try {
        const res = await uploadDocument({
          subject_id: subjectId || 'subj-2',
          file: { name: file.name, size: file.size },
          title: file.name.replace(/\.[^/.]+$/, ''),
        }).unwrap();

        clearInterval(interval);

        setActiveUploads((prev) =>
          prev.map((item) =>
            item.id === uploadId
              ? {
                  ...item,
                  progress: 100,
                  status: res.status || 'queued',
                  docId: res.id,
                }
              : item
          )
        );

        if (onUploadComplete) onUploadComplete(res);
      } catch (err) {
        clearInterval(interval);
        setActiveUploads((prev) =>
          prev.map((item) =>
            item.id === uploadId
              ? {
                  ...item,
                  status: 'failed',
                  error: err.message || 'Upload failed',
                }
              : item
          )
        );
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeUpload = (id) => {
    setActiveUploads((prev) => prev.filter((item) => item.id !== id));
  };

  const retryUpload = (item) => {
    removeUpload(item.id);
    processFiles([{ name: item.fileName, size: 1200000 }]);
  };

  return (
    <div className="space-y-4">
      {/* Tactile Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 select-none overflow-hidden group',
          dragActive
            ? 'border-tangerine bg-tangerine/10 shadow-desk-md scale-[1.01]'
            : 'border-desk-border hover:border-tangerine/60 bg-desk-card/60 hover:bg-desk-card shadow-desk-sm'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div
            className={cn(
              'h-14 w-14 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-desk-sm',
              dragActive
                ? 'bg-tangerine text-white'
                : 'bg-desk-sub text-tangerine border border-desk-border'
            )}
          >
            <UploadCloud className="h-7 w-7" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-base sm:text-lg font-bold text-desk-ink">
              Drop course readings or lecture notes here
            </h3>
            <p className="text-xs text-desk-muted max-w-sm mx-auto font-sans">
              Drag & drop PDFs, syllabi, or slides — or click to browse files from your computer.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-desk-sub border border-desk-border text-desk-muted">
              PDF (Up to 50MB)
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-desk-sub border border-desk-border text-desk-muted">
              DOCX
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-desk-sub border border-desk-border text-desk-muted">
              Plain Text
            </span>
          </div>
        </div>

        {/* Tip pill for demonstration */}
        <div className="mt-4 pt-3 border-t border-desk-border/40 inline-flex items-center gap-1.5 text-[11px] font-mono text-desk-muted">
          <Sparkles className="h-3 w-3 text-tangerine" />
          <span>Tip: Add <strong>"fail"</strong> in the filename to test error & retry states</span>
        </div>
      </div>

      {/* Uploads in Progress / Recently Uploaded List */}
      {activeUploads.length > 0 && (
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-semibold text-desk-ink flex items-center justify-between">
            <span>Recent Upload Pipeline</span>
            <span className="text-desk-muted">{activeUploads.length} item(s)</span>
          </div>

          <div className="space-y-2">
            {activeUploads.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-desk-border bg-desk-card shadow-desk-sm space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="h-4 w-4 text-tangerine shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-medium text-desk-ink truncate">
                        {item.fileName}
                      </p>
                      <p className="text-[10px] font-mono text-desk-muted">
                        {item.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.status === 'uploading' && (
                      <span className="text-xs font-mono text-tangerine animate-pulse">
                        {item.progress}%
                      </span>
                    )}

                    {item.status === 'queued' && (
                      <Badge variant="amber" className="gap-1 text-[10px]">
                        <Clock className="h-3 w-3" />
                        <span>Queued</span>
                      </Badge>
                    )}

                    {item.status === 'processing' && (
                      <Badge variant="violet" className="gap-1 text-[10px]">
                        <RotateCw className="h-3 w-3 animate-spin" />
                        <span>Processing AI</span>
                      </Badge>
                    )}

                    {item.status === 'ready' && (
                      <Badge variant="mint" className="gap-1 text-[10px]">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Indexed & Ready</span>
                      </Badge>
                    )}

                    {item.status === 'failed' && (
                      <div className="flex items-center gap-1.5">
                        <Badge variant="rose" className="gap-1 text-[10px]">
                          <AlertCircle className="h-3 w-3" />
                          <span>Failed</span>
                        </Badge>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => retryUpload(item)}
                          title="Retry"
                        >
                          <RotateCw className="h-3.5 w-3.5 text-desk-muted hover:text-desk-ink" />
                        </Button>
                      </div>
                    )}

                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => removeUpload(item.id)}
                      title="Dismiss"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-desk-muted hover:text-rose" />
                    </Button>
                  </div>
                </div>

                {/* Linear progress bar */}
                {item.status === 'uploading' && (
                  <div className="w-full bg-desk-border rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-tangerine h-1.5 rounded-full transition-all duration-150"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
