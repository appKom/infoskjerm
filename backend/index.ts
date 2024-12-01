import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { authenticate } from './src/authentication';
import { fetchMedia } from './src/media';
import { fetchTextMessagesFromChannels } from './src/text';
import { mediaDir, listFiles, manageDirectory, textDir } from './src/directories';
import { fetchImagesFromDate } from './src/movember';

const channels = {
  memes: [
    "C01DG6JFNSG" // #memeogvinogklinoggrin2
  ],
  blasts: [
    "CGR4J7PLH", // #korktavla
    "C03S8TX1L" // #online
  ],
  movember: "C01DL1YV4N6", // #movember
};

const app = express();
const port = 3000;

app.use('/media', express.static(mediaDir));

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/latest-memes', authenticate, async (req: Request, res: Response) => {
  const count = parseInt(req.query.count as string, 10) || 10;

  if (count > 10 || count < 1) return res.status(400).send('Count should be between 1 and 10');

  try {
    await manageDirectory(mediaDir);
    await fetchMedia(channels.memes[0], count, req);
    const imageMetadata = await listFiles(mediaDir);
    res.json(imageMetadata);
  } catch (error) {
    console.error('Failed to get memes:', error);
    res.status(500).send('Failed to get memes :(');
  }
});

app.get('/latest-blasts', authenticate, async (req: Request, res: Response) => {
  const count = parseInt(req.query.count as string, 10) || 5;

  if (count > 10 || count < 1) return res.status(400).send('Count should be between 1 and 10');

  try {
    await manageDirectory(textDir);
    await fetchTextMessagesFromChannels(channels.blasts, count, req);
    const textMetadata = await listFiles(textDir);
    res.json(textMetadata);
  } catch (error) {
    console.error('Failed to get blasts:', error);
    res.status(500).send('Failed to get blasts :(');
  }
});

app.get('/movember', authenticate , async (req: Request, res: Response) => {
  try {
    await manageDirectory(mediaDir);
    await fetchImagesFromDate(channels.movember, '2024-11-29', req);
    const imageMetadata = await listFiles(mediaDir);
    res.json(imageMetadata);
  } catch (error) {
    console.error('Failed to get memes:', error);
    res.status(500).send('Failed to get memes :(');
  }
});