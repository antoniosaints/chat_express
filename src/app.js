import "dotenv/config";
import { server } from "./services/serverExpress.js";

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}!`);
});
