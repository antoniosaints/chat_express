import { path, Server, createServer, express, fileURLToPath, join, cors } from "./importsExpress.js";
import { connection } from "../services/dbconnection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  

app.use(express.static(path.join("./src")));
app.use(express.json());
app.use(cors());

app.get("/chat", (req, res) => {
  res.sendFile(join(__dirname, "../../chat.html"));
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../../login.html"));
});

app.get("/usersList", (req, res) => {
  connection.query(
    `SELECT * FROM usuarios WHERE status = 'A' AND func_mes = 'S'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result).status(200);
      }
    }
  );
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `SELECT * FROM usuarios WHERE usuario = '${email}' AND senha = '${password}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result).status(200);
      }
    }
  );
});

io.on("connection", (socket) => {
  console.log("User connected " + socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

export {  server };
