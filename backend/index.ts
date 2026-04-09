import cors from "cors";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env" });
dotenv.config({ path: "../.env" });

type CreateUserBody = {
  name?: string;
};

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticRoot = path.resolve(__dirname, "./public");
const indexFile = path.join(staticRoot, "index.html");

app.use(cors());
app.use(express.json());
app.use(express.static(staticRoot));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(indexFile);
});

app.get("/get", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "failed_to_fetch_users" });
  }
});

app.post(
  "/create",
  async (req: Request<Record<string, never>, unknown, CreateUserBody>, res: Response) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "name_is_required" });
    }

    try {
      const newUser = await prisma.user.create({
        data: { name: name.trim() },
      });
      return res.json(newUser);
    } catch (error) {
      console.error("Failed to create user:", error);
      return res.status(500).json({ error: "failed_to_create_user" });
    }
  }
);

const port = Number(process.env.PORT ?? 5000);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
