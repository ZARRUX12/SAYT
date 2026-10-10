import fs from "fs/promises";
import path from "path";

export interface StorageProvider {
  saveFile(file: File): Promise<{ url: string; filename: string; size: number; mimetype: string }>;
  deleteFile(url: string): Promise<boolean>;
}

export class LocalStorageProvider implements StorageProvider {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public", "uploads");
  }

  async saveFile(file: File): Promise<{ url: string; filename: string; size: number; mimetype: string }> {
    await fs.mkdir(this.uploadDir, { recursive: true });

    const ext = path.extname(file.name);
    const sanitizedBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${Date.now()}_${sanitizedBase}${ext}`;
    const filePath = path.join(this.uploadDir, uniqueFilename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    return {
      url: `/uploads/${uniqueFilename}`,
      filename: uniqueFilename,
      size: file.size,
      mimetype: file.type,
    };
  }

  async deleteFile(url: string): Promise<boolean> {
    try {
      const filename = path.basename(url);
      const filePath = path.join(this.uploadDir, filename);
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

export const storage = new LocalStorageProvider();
