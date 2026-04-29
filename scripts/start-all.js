import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const rootDir = path.resolve(".");
const backendDir = path.join(rootDir, "backend");
const venvPython = path.join(backendDir, ".venv", "Scripts", "python.exe");
const pythonCommand = fs.existsSync(venvPython) ? venvPython : "python";

const processes = [
  {
    name: "backend",
    command: `${pythonCommand} -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`,
    cwd: backendDir,
  },
  {
    name: "frontend",
    command: "npm run dev",
    cwd: rootDir,
  },
];

const children = processes.map(({ name, command, cwd }) => {
  const child = spawn(command, { shell: true, cwd, stdio: ["ignore", "pipe", "pipe"] });

  child.stdout.on("data", (chunk) => {
    process.stdout.write(`[${name}] ${chunk}`);
  });
  child.stderr.on("data", (chunk) => {
    process.stderr.write(`[${name}] ${chunk}`);
  });
  child.on("close", (code) => {
    console.log(`[${name}] process exited with code ${code}`);
  });

  return child;
});

process.on("SIGINT", () => {
  children.forEach((child) => child.kill("SIGINT"));
  process.exit();
});

process.on("SIGTERM", () => {
  children.forEach((child) => child.kill("SIGTERM"));
  process.exit();
});
