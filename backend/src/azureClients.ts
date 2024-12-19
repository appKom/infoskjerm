import { BlobServiceClient } from "@azure/storage-blob";
import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING || ""
);
const mediaContainerClient = blobServiceClient.getContainerClient("media");
const textContainerClient = blobServiceClient.getContainerClient("text");
const connectionString = process.env.AZURE_SQL_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "AZURE_SQL_CONNECTION_STRING is not defined in the environment variables."
  );
}

const poolPromise = new sql.ConnectionPool(connectionString)
  .connect()
  .then((pool: sql.ConnectionPool) => {
    console.log("Connected to Azure SQL");
    return pool;
  })
  .catch((err: Error) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

export { mediaContainerClient, textContainerClient, poolPromise };
