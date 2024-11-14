// app/api/tasks/route.ts
import { MongoClient, ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
const secret = process.env.NEXTAUTH_SECRET;

export const dynamic = 'force-dynamic';

interface Task {
  _id?: ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  createdAt: number;
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'taskdb';

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(MONGODB_URI);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongoClient = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongoClient._mongoClientPromise) {
    globalWithMongoClient._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClient._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

async function getDb() {
  const clientInstance = await clientPromise;
  return clientInstance.db(DB_NAME);
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const db = await getDb();
    const collection = db.collection<Task>('tasks');
    const tasks = await collection.find().toArray();

    // Transform _id to string before sending the response
    const tasksWithId = tasks.map((task) => ({
      ...task,
      id: task._id.toString(),
    }));

    return NextResponse.json(tasksWithId);
  } catch (error) {
    console.error('Error in GET /api/tasks:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to fetch tasks' }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const db = await getDb();
    const collection = db.collection<Task>('tasks');
    const newTask: Task = await req.json();

    if (!newTask.title || typeof newTask.title !== 'string') {
      return new NextResponse(
        JSON.stringify({ message: 'Task title is required.' }),
        { status: 400 }
      );
    }

    const result = await collection.insertOne(newTask);

    // Return the inserted task with its insertedId (as string)
    return NextResponse.json(
      { ...newTask, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/tasks:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to create task.' }),
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const db = await getDb();
    const collection = db.collection<Task>('tasks');
    const { id, ...updatedTask } = await req.json();

    if (!id || typeof id !== 'string') {
      return new NextResponse(JSON.stringify({ message: 'Invalid task ID' }), {
        status: 400,
      });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedTask }
    );

    if (result.modifiedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'Task not found' }), {
        status: 404,
      });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error in PUT /api/tasks:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to update task.' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const db = await getDb();
    const collection = db.collection<Task>('tasks');
    const { id } = await req.json();

    if (!id || typeof id !== 'string') {
      return new NextResponse(JSON.stringify({ message: 'Invalid task ID' }), {
        status: 400,
      });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'Task not found' }), {
        status: 404,
      });
    }

    return new NextResponse('Task deleted successfully!');
  } catch (error) {
    console.error('Error in DELETE /api/tasks:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to delete task.' }),
      { status: 500 }
    );
  }
}
