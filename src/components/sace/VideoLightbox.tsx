import { useEffect } from "react";
import { X } from "lucide-react";

/** Returns the YouTube video id for any YouTube URL, otherwise null. */
export function youTubeId(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/) ?? null;
  return m ? (m[1] as string) : null;
}

type Props = {
  src: string;
  title: string;
  poster?: string;
  onClose: () => void;
};

export function VideoLightbox({ src, title, poster, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const yt = youTubeId(src);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">{title}</p>
          <button type="button" onClick={onClose} aria-label="Close video">
            <X className="size-5" />
          </button>
        </div>
        {yt ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full bg-black"
          />
        ) : (
          <video
            src={src}
            {...(poster ? { poster } : {})}
            controls
            autoPlay
            playsInline
            className="aspect-video w-full bg-black"
          />
        )}
      </div>
    </div>
  );
}
