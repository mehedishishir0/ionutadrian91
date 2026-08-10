"use client";

import React, { useState } from "react";
import { Folder as FolderIcon, Search, ChevronRight, File } from "lucide-react";
import { CreateFolderModal, Member } from "./CreateFolderModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface FileData {
  id: string;
  name: string;
  size: string;
  extension: string; // e.g. "pdf", "doc", "xlsx"
  updatedAt: string;
}

export interface FolderData {
  id: string;
  name: string;
  filesCount: number;
  size: string;
  updatedAt: string;
  members: Member[];
  files: FileData[];
}

const mockFiles: FileData[] = [
  {
    id: "f1",
    name: "Signatures",
    size: "1.2 kb",
    extension: "pdf",
    updatedAt: "Updated 2 days ago",
  },
  {
    id: "f2",
    name: "Signatures",
    size: "1.2 kb",
    extension: "doc",
    updatedAt: "Updated 2 days ago",
  },
  {
    id: "f3",
    name: "Signatures",
    size: "1.2 kb",
    extension: "xlsx",
    updatedAt: "Updated 2 days ago",
  },
  {
    id: "f4",
    name: "Signatures",
    size: "1.2 kb",
    extension: "doc",
    updatedAt: "Updated 2 days ago",
  },
  {
    id: "f5",
    name: "Signatures",
    size: "1.2 kb",
    extension: "xlsx",
    updatedAt: "Updated 2 days ago",
  },
  {
    id: "f6",
    name: "Signatures",
    size: "1.2 kb",
    extension: "pdf",
    updatedAt: "Updated 2 days ago",
  },
];

const initialFolders: FolderData[] = [
  {
    id: "1",
    name: "Risk Assessments",
    filesCount: 18,
    size: "1.2 GB",
    updatedAt: "Updated 2 days ago",
    members: [],
    files: mockFiles.slice(0, 3), // Some files
  },
  {
    id: "2",
    name: "Risk Assessments",
    filesCount: 18,
    size: "1.2 GB",
    updatedAt: "Updated 2 days ago",
    members: [],
    files: [], // Empty folder
  },
  {
    id: "3",
    name: "Risk Assessments",
    filesCount: 18,
    size: "1.2 GB",
    updatedAt: "Updated 2 days ago",
    members: [],
    files: mockFiles.slice(3, 5),
  },
  {
    id: "4",
    name: "Risk Assessments",
    filesCount: 18,
    size: "1.2 GB",
    updatedAt: "Updated 2 days ago",
    members: [],
    files: mockFiles,
  },
  {
    id: "5",
    name: "Risk Assessments",
    filesCount: 18,
    size: "1.2 GB",
    updatedAt: "Updated 2 days ago",
    members: [],
    files: mockFiles.slice(0, 2),
  },
];

// Helper to render file icon based on extension
const FileIconComponent = ({ extension }: { extension: string }) => {
  if (extension === "pdf") {
    return (
      <div className="h-12 w-10 bg-red-500 rounded text-white flex flex-col items-center justify-center font-bold text-[10px] relative shadow-sm">
        <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 rounded-bl" />
        PDF
      </div>
    );
  }
  if (extension === "doc" || extension === "docx") {
    return (
      <div className="h-12 w-10 bg-blue-600 rounded text-white flex flex-col items-center justify-center font-bold text-[10px] relative shadow-sm">
        <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 rounded-bl" />
        <div className="w-5 border-t-2 border-white/80 my-0.5" />
        <div className="w-5 border-t-2 border-white/80 my-0.5" />
        <div className="w-3 border-t-2 border-white/80 my-0.5 self-start ml-2.5" />
      </div>
    );
  }
  if (extension === "xlsx" || extension === "xls") {
    return (
      <div className="h-12 w-10 bg-emerald-600 rounded text-white flex flex-col items-center justify-center font-bold text-[10px] relative shadow-sm">
        <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 rounded-bl" />
        <div className="grid grid-cols-2 gap-0.5 mt-1">
          <div className="w-2 h-2 bg-white/80" />
          <div className="w-2 h-2 bg-white/80" />
          <div className="w-2 h-2 bg-white/80" />
          <div className="w-2 h-2 bg-white/80" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-12 w-10 bg-slate-400 rounded text-white flex items-center justify-center font-bold text-[10px] relative shadow-sm">
      <File className="h-5 w-5" />
    </div>
  );
};

export default function FilesDashboard() {
  const [folders, setFolders] = useState<FolderData[]>(initialFolders);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const handleCreateFolder = (name: string, members: Member[]) => {
    const newFolder: FolderData = {
      id: Date.now().toString(),
      name,
      filesCount: 0,
      size: "0 kb",
      updatedAt: "Just now",
      members,
      files: [],
    };
    setFolders([newFolder, ...folders]);
  };

  const activeFolder = folders.find((f) => f.id === activeFolderId);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation / Toolbar */}
      <div className="flex items-center gap-4 py-4 px-6 bg-[#F8FAFC]">
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
          <button className="px-4 py-2 text-xs font-bold text-[#0F172A] bg-white rounded-md border border-slate-200 shadow-xs">
            My Files
          </button>
          <button className="px-4 py-2 text-xs font-bold text-white bg-[#0B132B] rounded-md shadow-xs">
            Shared Workspace
          </button>
        </div>

        <div className="flex-1 max-w-2xl relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Files & Folders"
            className="w-full h-10 pl-9 pr-4 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="ml-auto bg-[#0B132B] hover:bg-slate-900 text-white font-bold text-xs h-10 px-5 rounded-lg shadow-sm flex items-center gap-2"
        >
          <FolderIcon className="h-4 w-4" />
          Create Folder
        </Button>
      </div>

      <div className="px-6 pb-10">
        {!activeFolder ? (
          /* HOME VIEW */
          <div className="space-y-8 mt-2">
            {/* Folders Section */}
            <div>
              <h2 className="text-sm font-bold text-[#0F172A] mb-4">Files</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {folders.map((folder) => (
                  <Card
                    key={folder.id}
                    onClick={() => setActiveFolderId(folder.id)}
                    className="bg-white border-0 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                      <div className="p-2 bg-amber-50 rounded-lg w-fit">
                        <FolderIcon className="h-5 w-5 text-amber-400 fill-amber-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                          {folder.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-400">
                          {folder.filesCount} files
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-2 border-t border-slate-50 mt-1">
                        <span>{folder.updatedAt}</span>
                        <span>{folder.size}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h2 className="text-sm font-bold text-[#0F172A] mb-4">
                Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mockFiles.map((file, idx) => (
                  <Card
                    key={idx}
                    className="bg-white border-0 shadow-sm rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="mb-4 mt-2">
                      <FileIconComponent extension={file.extension} />
                    </div>
                    <h4 className="text-[13px] font-bold text-[#0F172A] w-full truncate">
                      {file.name}
                    </h4>
                    <div className="flex items-center justify-between w-full mt-2 text-[10px] font-medium text-slate-400">
                      <span>{file.size}</span>
                      <span>.{file.extension}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* FOLDER DETAILS VIEW */
          <div className="mt-2 space-y-6">
            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <button
                onClick={() => setActiveFolderId(null)}
                className="text-slate-400 hover:text-[#0F172A] transition-colors"
              >
                Home
              </button>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="text-[#0F172A]">{activeFolder.name}</span>
            </div>

            {/* Folder Header Info */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
              <div className="p-3 bg-amber-50 rounded-xl">
                <FolderIcon className="h-8 w-8 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  {activeFolder.name}
                </h2>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mt-1">
                  <span>{activeFolder.files.length} files</span>
                  <span>•</span>
                  <span>{activeFolder.updatedAt}</span>
                  {activeFolder.members.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{activeFolder.members.length} members</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Files Content */}
            {activeFolder.files.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <FolderIcon className="h-8 w-8 text-slate-300 fill-slate-200" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1">
                  No files yet
                </h3>
                <p className="text-xs text-slate-400 font-medium max-w-[250px] text-center">
                  There are no files inside this folder. Files added will appear
                  here.
                </p>
              </div>
            ) : (
              /* Files Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {activeFolder.files.map((file, idx) => (
                  <Card
                    key={idx}
                    className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="mb-4 mt-2">
                      <FileIconComponent extension={file.extension} />
                    </div>
                    <h4 className="text-[13px] font-bold text-[#0F172A] w-full truncate">
                      {file.name}
                    </h4>
                    <div className="flex items-center justify-between w-full mt-2 text-[10px] font-medium text-slate-400">
                      <span>{file.size}</span>
                      <span>.{file.extension}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <CreateFolderModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
}
