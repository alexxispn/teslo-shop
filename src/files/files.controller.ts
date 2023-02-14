import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_SIZE_LIMIT_BYTES, FILE_TYPES_ALLOWED } from '../common/constants';
import { fileFilter, fileRenamer } from './helpers';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileRenamer,
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FILE_SIZE_LIMIT_BYTES }),
          new FileTypeValidator({ fileType: FILE_TYPES_ALLOWED }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return { filename: file.filename };
  }
}
