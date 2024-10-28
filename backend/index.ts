import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { authenticate } from './src/authentication';
import { fetchMedia } from './src/media';
import { fetchTextMessagesFromChannels } from './src/text';
import { mediaDir, listFiles, manageDirectory, textDir } from './src/directories';
import { poolPromise, sql } from './src/database/db';

const channels = {
  memes: [
    "C01DG6JFNSG" // #memeogvinogklinoggrin2
  ],
  blasts: [
    "CGR4J7PLH", // #korktavla
    "C03S8TX1L" // #online
  ]
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


app.get('/fame-code', authenticate, async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query("SELECT TOP 1 code FROM fame_codes WHERE isUsed = 0");

    if (result.recordset.length > 0) {
      res.json({ code: result.recordset[0].code });
    } else {
      // Generate a new code if no unused codes are found
      const newCode = generateCode();
      await pool.request()
        .input('code', sql.NVarChar, newCode)
        .input('isUsed', sql.Bit, 0)
        .query('INSERT INTO fame_codes (code, isUsed) VALUES (@code, @isUsed)');
      res.json({ code: newCode });
    }
  } catch (error) {
    console.error('Error fetching code:', error);
    res.status(500).send('Error fetching code');
  }
});


const generateCode = () => {
  return Math.random().toString(36).substring(2, 8);
}

app.post('/fame-code', async (req, res) => {
  const { code, text } = req.body;

  try {
      const pool = await poolPromise;
      // Check if the code exists and is not used
      const codeCheck = await pool.request()
          .input('code', sql.NVarChar, code)
          .query('SELECT * FROM codes WHERE code = @code AND isUsed = 0');

      if (codeCheck.recordset.length > 0) {
          // Process the image and text upload here
          // Mark code as used
          await pool.request()
              .input('code', sql.NVarChar, code)
              .query('UPDATE codes SET isUsed = 1 WHERE code = @code');
          res.send('Upload successful');
      } else {
          res.status(400).send('Code is invalid or already used');
      }
  } catch (error) {
      res.status(500).send('Error processing upload');
  }
});