import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import fs from 'fs/promises';
import path from 'path';

const templatesDirectory = path.join(process.cwd(), 'email-templates');

export async function GET(request: Request, { params }: { params: { filename: string } }) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isAdmin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        const { filename } = params;
        // Basic security check to prevent directory traversal
        if (filename.includes('..') || !filename.endsWith('.json')) {
             return NextResponse.json({ message: 'Invalid filename' }, { status: 400 });
        }

        const filePath = path.join(templatesDirectory, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        return NextResponse.json(JSON.parse(fileContent));
    } catch (error) {
        console.error("Failed to read template:", error);
        return NextResponse.json({ message: 'Template not found' }, { status: 404 });
    }
}