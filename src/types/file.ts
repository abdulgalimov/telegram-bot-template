export enum FileType {
  Photo = 'photo',
  Video = 'video',
  Audio = 'audio',
  Document = 'document',
  Animation = 'animation',
  Sticker = 'sticker',
}

export type File = {
  id: string;
  name: string;
  size: number;
  type: FileType;
};
