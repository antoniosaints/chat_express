import {
  deleteChatSelected,
  getChatsList
} from "../handlers/hooks.js";
import { nameUserLogged, userLogged } from "../imports/main.js";

nameUserLogged.innerText = userLogged.nome;

deleteChatSelected();
getChatsList();
