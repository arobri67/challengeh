interface Contributor {
  ID: string;
  Name: string;
}

export interface DocItems {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Attachments: string[];
  Contributors: Contributor[];
  Version: string;
}

export type DocsRes = DocItems[];

export type NotificationMessage = {
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
};
