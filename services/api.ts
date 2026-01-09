import { Play, Member, Script, BilibiliVideo } from '../types';

// Mock Data
const PLAYS: Play[] = [
  {
    id: 'p1',
    title: 'Secret Love in Peach Blossom Land',
    year: 2023,
    semester: 'Autumn',
    type: 'Classic',
    director: 'Lin Y.',
    synopsis: 'Two plays, one stage. A tragedy and a comedy collide in this classic exploration of love, loss, and chaos. Performed at the University Arts Center.',
    coverImage: 'https://picsum.photos/800/600?grayscale&random=1',
    gallery: ['https://picsum.photos/800/400?grayscale&random=10', 'https://picsum.photos/800/400?grayscale&random=11'],
    cast: [
      { character: 'Jiang Binliu', actorName: 'Chen X.', actorId: 'm1' },
      { character: 'Yun Zhifan', actorName: 'Wang L.', actorId: 'm2' }
    ]
  },
  {
    id: 'p2',
    title: 'Rhinoceros',
    year: 2022,
    semester: 'Spring',
    type: 'Adapted',
    director: 'Zhang H.',
    synopsis: 'An absurd masterpiece about conformity. What happens when everyone around you turns into a rhinoceros?',
    coverImage: 'https://picsum.photos/800/600?grayscale&random=2',
    gallery: [],
    cast: [
      { character: 'Berenger', actorName: 'Li K.', actorId: 'm3' }
    ]
  },
  {
    id: 'p3',
    title: 'The Ocean\'s Echo',
    year: 2023,
    semester: 'Spring',
    type: 'Original',
    director: 'Zhao Q.',
    synopsis: 'An original production by Mufeng members, exploring the history of the coastline and the students who walk it.',
    coverImage: 'https://picsum.photos/800/600?grayscale&random=3',
    gallery: [],
    cast: []
  }
];

const MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Chen X.',
    joinYear: 2021,
    roles: ['Actor', 'Scriptwriter'],
    bio: 'Joined in 2021. Passionate about surrealist theatre.',
    avatar: 'https://picsum.photos/200/200?grayscale&random=20',
    productions: ['p1']
  },
  {
    id: 'm2',
    name: 'Wang L.',
    joinYear: 2022,
    roles: ['Actor', 'Stage Manager'],
    bio: 'Logistics wizard and lead actress.',
    avatar: 'https://picsum.photos/200/200?grayscale&random=21',
    productions: ['p1']
  }
];

const SCRIPTS: Script[] = [
  {
    id: 's1',
    title: 'The Seagull (Adapted)',
    author: 'Anton Chekhov / Adapted by Mufeng',
    uploadDate: '2023-11-15',
    fileSize: '2.4 MB',
    accessLevel: 'PUBLIC',
    description: 'The adaption used for the 2023 Winter showcase.'
  },
  {
    id: 's2',
    title: 'The Ocean\'s Echo (Original Draft)',
    author: 'Zhao Q.',
    uploadDate: '2023-04-10',
    fileSize: '1.1 MB',
    accessLevel: 'MEMBER_ONLY',
    description: 'Internal draft. Do not distribute.'
  }
];

// Service Methods
export const api = {
  getPlays: async (filter?: { year?: number; type?: string }): Promise<Play[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    let result = [...PLAYS];
    if (filter?.year) result = result.filter(p => p.year === filter.year);
    if (filter?.type && filter.type !== 'All') result = result.filter(p => p.type === filter.type);
    return result;
  },

  getPlayById: async (id: string): Promise<Play | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return PLAYS.find(p => p.id === id);
  },

  getMembers: async (): Promise<Member[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MEMBERS;
  },

  getMemberById: async (id: string): Promise<Member | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MEMBERS.find(m => m.id === id);
  },

  getScripts: async (): Promise<Script[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return SCRIPTS;
  },

  // Simulating the Backend Bilibili Parser
  parseBilibiliVideo: async (url: string): Promise<BilibiliVideo> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Longer delay for "processing"
    
    // Basic validation
    if (!url.includes('bilibili.com')) {
      throw new Error('Invalid Bilibili URL');
    }

    // Return mock parsed data
    return {
      id: Math.random().toString(36).substr(2, 9),
      bvid: 'BV1xx411c7Xh',
      title: 'Mufeng 2023 Winter Showcase: Behind the Scenes',
      cover: 'https://picsum.photos/600/340?grayscale&random=50',
      description: 'A look into the rehearsal process of our latest production. Filmed by the media team.',
      author: 'Mufeng Media',
      duration: '14:20'
    };
  }
};