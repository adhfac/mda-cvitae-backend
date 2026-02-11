import express from 'express';
import router from './routes/api';
import bodyParser from 'body-parser';
import db from './utils/database';
import docs from './docs/route';
import cors from 'cors';

async function init() {
  try {
    const result = await db();
    console.log('database status: ', result);

    const app = express();
    app.use(cors());
    const PORT = 3000;

    app.get('/', (req, res) => {
      res.status(200).json({
        message: 'server is running',
        data: 'null',
      });
    });

    app.use(bodyParser.json());
    app.use('/api', router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

init();
