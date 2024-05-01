const express = require("express");
const Docker = require("dockerode");
const bodyParser = require("body-parser");
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const app = express();
app.use(bodyParser.json());

app.post("/run-code", async (req, res) => {
  const { code, language } = req.body;

  try {
    const output = await runCodeInDocker(code, language);
    res.send({ output });
  } catch (error) {
    res.status(500).send({ error: "Failed to execute code" });
  }
});

const runCodeInDocker = async (code, language) => {
  let image;
  let command;

  switch (language) {
    case "python":
      image = "python:3.9-alpine";
      command = ["python", "-c", code];
      break;
    case "javascript":
      image = "node:14-alpine";
      command = ["node", "-e", code];
      break;
    default:
      throw new Error("Unsupported language");
  }

  const container = await docker.createContainer({
    Image: image,
    Cmd: command,
    Tty: false,
    AttachStdout: true,
    AttachStderr: true,
  });

  await container.start();

  const stream = await container.attach({
    stream: true,
    stdout: true,
    stderr: true,
  });

  let output = "";
  stream.on("data", (chunk) => (output += chunk.toString()));
  await new Promise((resolve, reject) => {
    container.wait((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  await container.remove();
  return output.replace(/[\x00-\x09\x0B-\x1F\x7F-\x9F]/g, "");
};

app.listen(9090, () => {
  console.log("Server is running on http://localhost:9090");
});
