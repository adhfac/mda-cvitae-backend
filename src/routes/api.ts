import express from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import authGuard from '../middlewares/acl.middleware';
import mediaMiddleware from '../middlewares/media.middleware';
import mediaController from '../controllers/media.controller';

const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.me);
router.post(
  '/media/upload-single',
  [
    authMiddleware,
    authGuard,
    mediaMiddleware.single('file'),
    mediaController.single,
  ]
  /*
  #swagger.tags = ['Media']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary"
            }
          }
        }
      }
    }
  }
  */
);
router.post(
  '/media/upload-multiple',
  [
    authMiddleware,
    authGuard,
    mediaMiddleware.multiple('files'),
    mediaController.multiple,
  ]
  /*
  #swagger.tags = ['Media']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    }
  }
  */
);
router.delete(
  '/media/delete',
  [authMiddleware, authGuard, mediaController.remove]
  /*
  #swagger.tags = ['Media']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RemoveMediaRequest"
    }
  }
  */
);

export default router;
