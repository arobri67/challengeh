import semver from 'semver';
import { z } from 'zod';

export const createDocumentSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    version: z
      .string()
      .min(1, 'Version is required')
      .max(20, 'Version too long')
      .refine((val) => semver.valid(val) !== null, {
        message: 'Version must be a valid semantic version (e.g., 1.0.0, 2.1.3-beta.1)',
      }),
    file: z
      .object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
      .nullable(),
  })
  .refine((data) => data.file !== null, {
    message: 'File is required',
    path: ['file'],
  });

export type CreateDocumentFormData = z.infer<typeof createDocumentSchema>;
