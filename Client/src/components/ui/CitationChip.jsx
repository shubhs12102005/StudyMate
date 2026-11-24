import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * CitationChip - Tactile highlighter-marked chip linking to exact document page
 * @param {Object} props
 * @param {string|number} props.page - Document page number
 * @param {string} [props.documentTitle] - Optional title of document
 * @param {string} [props.snippet] - Optional preview snippet
 * @param {Function} [props.onClick] - Callback when clicked to jump in PDF
 * @param {boolean} [props.active] - Whether currently focused/highlighted
 * @param {string} [props.className] - Additional classes
 */
export function CitationChip({
  page,
  documentTitle,
  snippet,
  onClick,
  active = false,
  className,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={snippet ? `"${snippet}" — Jump to page ${page}` : `Jump to page ${page}`}
      className={cn(
        'group relative inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-mono font-medium transition-all duration-200 select-none',
        'bg-[#FFD84D]/35 hover:bg-[#FFD84D] text-[#16141F] border border-[#FFD84D]/70 hover:border-[#F2C728]',
        'shadow-[0_1px_2px_rgba(255,216,77,0.2)] hover:shadow-[0_2px_8px_rgba(255,216,77,0.45)] hover:-translate-y-0.5',
        active && 'bg-[#FFD84D] border-[#E0B51A] ring-2 ring-[#FFD84D]/50 shadow-[0_2px_10px_rgba(255,216,77,0.6)]',
        className
      )}
    >
      <BookOpen className="h-3 w-3 text-[#16141F]/70 group-hover:text-[#16141F]" />
      <span>p. {page}</span>
      {documentTitle && (
        <span className="max-w-[120px] truncate text-[10px] text-[#16141F]/70 border-l border-[#16141F]/20 pl-1">
          {documentTitle}
        </span>
      )}
      <ExternalLink className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
