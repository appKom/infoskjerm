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
  name: number;
  author: string;
  username: string;
  author_image: string;
  date: string;
  url: string;
};