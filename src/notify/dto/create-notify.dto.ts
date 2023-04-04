export class CreateNotifyDto {
  service: string;
  api: string;
  id: string | null;
  type: 'new' | 'edit' | 'delete';
  contents: {
    new: {
      id: string;
      publishValue: {
        title: string;
        thumbnail?: { url: string };
      };
    } | null;
  } | null;
}
