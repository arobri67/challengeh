interface Contributor {
  ID: string;
  Name: string;
}

interface DocItems {
  ID: string;
  CreatedAt: string; // Represents an ISO 8601 date string
  UpdatedAt: string; // Represents an ISO 8601 date string
  Title: string;
  Attachments: string[];
  Contributors: Contributor[];
  Version: string;
}

export type DocsRes = DocItems[];
