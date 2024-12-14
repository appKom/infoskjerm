import path from "path";
import fs from "fs";

export const mediaDir = path.join("/tmp", "media");
export const textDir = path.join("/tmp", "text");

export const manageDirectory = async (directory: string) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log("Created directory:", directory);
  } else {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      fs.unlinkSync(path.join(directory, file));
      console.log(`Deleted file: ${file}`);
    });
  }
};

export const listFiles = async (directory: string) => {
  const files = await fs.promises.readdir(directory);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  const metadataArray = await Promise.all(
    jsonFiles.map(async (file) => {
      const metadata = JSON.parse(
        await fs.promises.readFile(path.join(directory, file), {
          encoding: "utf8",
        })
      );
      return metadata;
    })
  );

  // Sort the array so that the most recent files are first
  metadataArray.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return metadataArray;
};
