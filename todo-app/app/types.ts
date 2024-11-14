// types.ts

export type Task = {
    id: string;
    title: string;
    description?: string | undefined;
    completed: boolean;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    createdAt: number;
  };
  