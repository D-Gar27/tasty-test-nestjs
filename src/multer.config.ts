import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { extname } from 'path';

// Multer configuration
export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Directory where files will be saved
    filename: (req, file, callback) => {
      const uniqueName = `${v4()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
};
