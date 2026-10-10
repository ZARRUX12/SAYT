"use client";

import React, { useState, useEffect } from "react";
import { Upload, Trash2, Copy, Check, File, Search } from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

export default function AdminMediaClient() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setMediaList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (res.ok) {
        await fetchMedia();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить файл из медиатеки?")) return;
    await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    await fetchMedia();
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
            Storage & Assets
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1">
            Медиатека ({mediaList.length})
          </h1>
        </div>

        <label className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Загрузка..." : "Загрузить файл"}</span>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((m) => {
          const isImage = m.mimetype.startsWith("image/");
          return (
            <div
              key={m.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div className="relative h-36 w-full bg-black/60 flex items-center justify-center overflow-hidden">
                {isImage ? (
                  <img
                    src={m.path}
                    alt={m.filename}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <File className="w-10 h-10 text-gold" />
                )}
              </div>

              <div className="p-4 space-y-2">
                <span className="text-xs font-bold text-white block truncate" title={m.filename}>
                  {m.filename}
                </span>
                <span className="text-[10px] font-mono text-metallic/60 block">
                  {(m.size / 1024).toFixed(1)} KB • {m.mimetype.split("/")[1]?.toUpperCase()}
                </span>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => copyUrl(m.id, m.path)}
                    className="text-[11px] text-gold hover:underline flex items-center gap-1 font-mono"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" /> Скопировано
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Копировать URL
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
