import { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerOutput from './swagger-output.json';

export default function docs(app: Express) {
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerOutput, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    })
  );
}
