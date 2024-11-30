
import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  imports: [], // Nếu module này phụ thuộc vào module khác, import vào đây
  providers: [FileService],
  exports: [FileService], // Nếu muốn sử dụng FileService ở các module khác
})
export class FileModule { }
