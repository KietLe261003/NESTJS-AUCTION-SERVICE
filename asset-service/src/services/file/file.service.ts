import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private uploadPath = join('uploads');

  constructor() {
    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Tạo tên file duy nhất bằng UUID
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    const filePath = join(this.uploadPath, uniqueFileName);

    // Lưu file vào thư mục
    fs.writeFileSync(filePath, file.buffer);

    return uniqueFileName; // Trả về tên file duy nhất
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = join(this.uploadPath, filename);

    if (!existsSync(filePath)) {
      throw new Error('File not found');
    }

    unlinkSync(filePath);
  }

  async getFile(filename: string): Promise<string> {
    const filePath = join(this.uploadPath, filename);

    if (!existsSync(filePath)) {
      throw new Error('File not found');
    }

    return filePath; // Hoặc trả về buffer nếu cần
  }
}
