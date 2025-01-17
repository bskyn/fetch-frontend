import { SortDirection, SortField } from '@/enum';
import { z } from 'zod';

export const loginFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export const searchSchema = z.object({
  breed: z.array(z.string()).optional(),
  zipCode: z.string().optional(),
  ageMin: z.coerce.number().optional(),
  ageMax: z.coerce.number().optional(),
  sort: z.object({
    field: z.nativeEnum(SortField),
    direction: z.nativeEnum(SortDirection),
  }),
});
