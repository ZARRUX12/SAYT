"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProjectItem {
  id: string;
  title: string;
  slug?: string;
  category?: string;
  price?: number;
  modelType?: string;
}

interface ProjectBuilderContextType {
  selectedItems: ProjectItem[];
  addItem: (item: ProjectItem) => void;
  removeItem: (id: string) => void;
  clearProject: () => void;
  hasItem: (id: string) => boolean;
  totalEstimate: number;
}

const ProjectBuilderContext = createContext<ProjectBuilderContextType | undefined>(undefined);

export function ProjectBuilderProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ProjectItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("targetpro_builder_items");
      if (saved) {
        setSelectedItems(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Save to local storage on update
  useEffect(() => {
    try {
      localStorage.setItem("targetpro_builder_items", JSON.stringify(selectedItems));
    } catch {}
  }, [selectedItems]);

  const addItem = (item: ProjectItem) => {
    setSelectedItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearProject = () => {
    setSelectedItems([]);
  };

  const hasItem = (id: string) => {
    return selectedItems.some((p) => p.id === id);
  };

  const totalEstimate = selectedItems.reduce((acc, curr) => acc + (curr.price || 2000000), 0);

  return (
    <ProjectBuilderContext.Provider
      value={{ selectedItems, addItem, removeItem, clearProject, hasItem, totalEstimate }}
    >
      {children}
    </ProjectBuilderContext.Provider>
  );
}

export function useProjectBuilder() {
  const ctx = useContext(ProjectBuilderContext);
  if (!ctx) {
    throw new Error("useProjectBuilder must be used within ProjectBuilderProvider");
  }
  return ctx;
}
