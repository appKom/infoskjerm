export const EVENT_TYPES = new Map([
  [1, { display: 'Sosialt', color: 'rgb(67, 177, 113)', colorName: 'green' }],
  [2, { display: 'Bedpress', color: 'rgb(235, 83, 110)', colorName: 'red' }],
  [3, { display: 'Kurs', color: 'rgb(18, 125, 189)', colorName: 'blue' }],
  [4, { display: 'Utflukt', color: 'rgb(253, 189, 71)', colorName: 'yellow' }],
  [5, { display: 'Ekskursjon', color: 'rgb(42, 198, 249)', colorName: 'blue' }],
  [6, { display: 'Internt', color: 'rgb(231, 94, 59)', colorName: 'red' }],
  [7, { display: 'Annet', color: 'rgb(179, 107, 205)', colorName: 'purple' }],
  [8, { display: 'Realfagskjelleren', color: 'rgb(231, 94, 59)', colorName: 'red' }]
]);

export type MemeType = {
  id: string;
  name: string;
  author: string;
  author_image: string;
  date: string;
  url: string;
  type: 'image' | 'video';
  reactions: {
    name: string;
    count: number;
    url: string;
  }[]
};

export type BlastType = {
  id: string;
  name: string;
  author: string;
  author_image: string;
  date: string;
  text: string;
}


//
interface ISlackFile {
  id: string;
  created: number;
  timestamp: number;
  name: string;
  title: string;
  mimetype: string;
  filetype: string;
  pretty_type: string;
  user: string;
  user_team: string;
  editable: boolean;
  size: number;
  mode: string;
  is_external: boolean;
  external_type: string;
  is_public: boolean;
  public_url_shared: boolean;
  display_as_bot: boolean;
  username: string;
  transcription: {
    status: string;
  };
  mp4: string;
  url_private: string;
  url_private_download: string;
  hls: string;
  hls_embed: string;
  mp4_low: string;
  duration_ms: number;
  media_display_type: string;
  thumb_video: string;
  thumb_video_w: number;
  thumb_video_h: number;
  permalink: string;
  permalink_public: string;
  is_starred: boolean;
  has_rich_preview: boolean;
  file_access: string;
}

interface IReaction {
  name: string;
  users: string[];
  count: number;
}

export interface ISlackMessage {
  text: string;
  files: ISlackFile[];
  upload: boolean;
  user: string;
  display_as_bot: boolean;
  type: string;
  ts: string;
  client_msg_id: string;
  reactions: IReaction[];
}
