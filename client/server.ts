import { serve } from "bun";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const port = Number(process.env.PORT ?? 3000);

serve({
  port,
  routes: {
    "/*": new Response(Bun.file(path.join(distDir, "index.html"))),
  },
  fetch(request) {
    const url = new URL(request.url);
    const filePath = path.join(distDir, url.pathname);
    const file = Bun.file(filePath);
    return file.exists() ? new Response(file) : new Response(Bun.file(path.join(distDir, "index.html")));
  },
});

console.log(`Client running at http://localhost:${port}`);
