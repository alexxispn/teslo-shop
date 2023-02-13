import { FILE_TYPES_ALLOWED } from '../../common/constants';
import { BadRequestException } from '@nestjs/common';
export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const fileExtension = file.mimetype.split('/')[1];
  if (FILE_TYPES_ALLOWED.includes(fileExtension)) {
    return cb(null, true);
  }
  return cb(
    new BadRequestException(
      `File type ${fileExtension} not allowed. Only ${FILE_TYPES_ALLOWED} are allowed`,
    ),
    false,
  );
};
