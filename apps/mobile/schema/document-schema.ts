import { z } from 'zod';

export const createDocumentSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    version: z.string().min(1, 'Version is required').max(20, 'Version too long'),
    file: z
      .object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
      .nullable(), // Allow null initially
  })
  .refine((data) => data.file !== null, {
    message: 'File is required',
    path: ['file'], // Attach error to file field
  });

export type CreateDocumentFormData = z.infer<typeof createDocumentSchema>;
