import { Response } from 'express';
import * as yup from 'yup';
import mongoose from 'mongoose';

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },
  error(res: Response, error: unknown, message: string) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message,
        },
        data: error.errors,
      });
    }

    if (error instanceof mongoose.Error) {
      return res.status(500).json({
        meta: {
          status: 500,
          message: error.message,
        },
        data: error.name,
      });
    }

    if ((error as any)?.code) {
      const _err = error as any;
      return res.status(500).json({
        meta: {
          status: 500,
          message: _err.errorResponse.errmsg,
        },
        data: _err,
      });
    }

    // Tambahan ini untuk handle error biasa (misal dari try/catch)
    console.error('[Internal Error]', error);
    return res.status(500).json({
      meta: {
        status: 500,
        message,
      },
      data: error,
    });
  },

  unauthorized(res: Response, message: string = 'unauthorized') {
    res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: null,
    });
  },
  pagination(
    res: Response,
    data: any[],
    message: string,
    pagination: Pagination
  ) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
