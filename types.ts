export type UserRole = 'GUEST' | 'MEMBER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Play {
  id: string;
  title: string;
  year: number;
  semester: 'Spring' | 'Autumn';
  type: 'Original' | 'Adapted' | 'Classic';
  director: string;
  synopsis: string;
  coverImage: string;
  gallery: string[];
  cast: {
    character: string;
    actorName: string;
    actorId: string;
  }[];
}

export interface Member {
  id: string;
  name: string;
  joinYear: number;
  roles: string[]; // e.g., ["Actor", "Director"]
  bio: string;
  avatar: string;
  productions: string[]; // Play IDs
}

export interface Script {
  id: string;
  title: string;
  author: string;
  uploadDate: string;
  fileSize: string;
  accessLevel: 'PUBLIC' | 'MEMBER_ONLY';
  description: string;
}

export interface BilibiliVideo {
  id: string;
  bvid: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  duration: string;
}