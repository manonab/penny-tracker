import { z } from 'zod';

export const ExpenseSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.string().datetime(),
});

export const ExpensesArraySchema = z.array(ExpenseSchema);

export type ExpenseType = z.infer<typeof ExpenseSchema>;

export type ExpensesArrayType = z.infer<typeof ExpensesArraySchema>;
