import { z } from 'zod';

export const pollingStatusValidator = z.object({
  success: z.boolean(),
});

export type PollingStatusResponse = z.infer<typeof pollingStatusValidator>;
