import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
export const fileRenamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) => {
  const fileExtension = extname(file.originalname);
  const filename = uuidv4() + fileExtension;
  cb(null, filename);
};
