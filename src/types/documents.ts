/**
 * Document-related TypeScript type definitions
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export enum DocumentPermission {
  VIEW = 'view',
  EDIT = 'edit',
  COMMENT = 'comment',
  ADMIN = 'admin',
}

export interface DocumentCollaborator {
  user: User;
  permissions: DocumentPermission[];
  addedAt: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User;
  parentId?: string;
  collaborators: DocumentCollaborator[];
  tags: string[];
  spaceId: string;
  isArchived: boolean;
}

export interface DocumentCreateRequest {
  title: string;
  content: string;
  parentId?: string;
  tags?: string[];
  spaceId: string;
  collaborators?: {
    userId: string;
    permissions: DocumentPermission[];
  }[];
}

export interface DocumentUpdateRequest {
  title?: string;
  content?: string;
  parentId?: string;
  tags?: string[];
  spaceId?: string;
  isArchived?: boolean;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  content: string;
  createdAt: string;
  createdBy: User;
  comment?: string;
}

export interface DocumentComment {
  id: string;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  parentId?: string;
  isResolved: boolean;
  position?: {
    startOffset: number;
    endOffset: number;
  };
}

export interface DocumentSpace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: User;
  updatedAt: string;
  icon?: string;
  isPrivate: boolean;
} 