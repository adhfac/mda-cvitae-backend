import { Response } from 'express';
import { IReqUser } from '../utils/interface';
import uploader from '../utils/uploader';
import response from '../utils/response';

export default {
  async single(req: IReqUser, res: Response) {
    if (!req.file) {
      return response.error(res, null, 'File does not exist');
    }

    try {
      const result = await uploader.uploadSingle(
        req.file as Express.Multer.File
      );
      return response.success(res, result, 'Success upload file');
    } catch (error) {
      return response.error(res, error, 'Failed upload file');
    }
  },

  async multiple(req: IReqUser, res: Response) {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return response.error(res, null, 'Files do not exist');
    }

    try {
      const result = await uploader.uploadMultiple(
        req.files as Express.Multer.File[]
      );
      return response.success(res, result, 'Success upload files');
    } catch (error) {
      return response.error(res, error, 'Failed upload files');
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { fileUrl } = req.body as { fileUrl: string };
      const result = await uploader.remove(fileUrl);
      return response.success(res, result, 'Success remove file');
    } catch (error) {
      return response.error(res, error, 'Failed remove file');
    }
  },
};
