import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import fs from 'fs/promises';
import path from 'path';

// Define the path to your templates directory
const templatesDirectory = path.join(process.cwd(), 'email-templates');

// Helper to ensure the directory exists
async function ensureDirectoryExists() {
    try {
        await fs.access(templatesDirectory);
    } catch {
        await fs.mkdir(templatesDirectory);
    }
}

// Helper to sanitize filenames
function sanitizeFilename(name: string): string {
    return name.replace(/[^a-z0-9\-_]/gi, '_').toLowerCase() + '.json';
}

// GET: To list all available templates
export async function GET() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isAdmin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await ensureDirectoryExists();

    try {
        const files = await fs.readdir(templatesDirectory);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        return NextResponse.json(jsonFiles);
    } catch (error) {
        console.error("Failed to read templates directory:", error);
        return NextResponse.json({ message: 'Failed to list templates' }, { status: 500 });
    }
}


// POST: To save a new template
export async function POST(request: Request) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isAdmin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await ensureDirectoryExists();

    try {
        const { templateName, templateData } = await request.json();

        if (!templateName || !templateData) {
            return NextResponse.json({ message: 'Missing template name or data' }, { status: 400 });
        }

        const filename = sanitizeFilename(templateName);
        const filePath = path.join(templatesDirectory, filename);

        await fs.writeFile(filePath, JSON.stringify(templateData, null, 2));

        return NextResponse.json({ message: 'Template saved successfully', filename });
    } catch (error) {
        console.error("Failed to save template:", error);
        return NextResponse.json({ message: 'Failed to save template' }, { status: 500 });
    }
}