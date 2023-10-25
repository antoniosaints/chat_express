import { input, userLogged, messages } from "../imports/main.js";
import { HOST_DB } from "../imports/constants.js";
import { toLastMessage } from "./hooks.js";
import { socket } from "../services/socket.js";

const saveMessage = async () => {
  const chatIdSelected = localStorage.getItem("chatIdSelected");
  if (input.value === "") return;
  const dateN = new Date(); // pega a data
  const dateNow = dateN.toLocaleString("pt-BR"); // formata a data para pt-BR
  const data = {
    chat_id: chatIdSelected,
    text: input.value,
    nome: userLogged.nome,
    user: userLogged.id,
    data: dateNow,
  };
  await fetch(`${HOST_DB}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
const addNewMessage = (data) => {
  const chatIdSelected = localStorage.getItem("chatIdSelected");
  const message = JSON.parse(data);
  const regex = /(\d{2}:\d{2})/;
  const dataModify = message.data.match(regex);

  if (message.chatId != chatIdSelected) {
    return;
  }

  if (dataModify) {
    var dataHora = dataModify[1];
  } else {
    var dataHora = message.data;
  }
  const messageOther = `<div class="flex mb-2"> 
                              <div
                              class="rounded py-2 px-3 bg-[#ffffff] dark:bg-[#202c33] dark:text-white"
                              style="border-radius: 15px"
                              >
                              <p class="text-sm text-green-500"><strong>${message.nome}</strong></p>
                              <p class="text-sm mt-1">${message.mensagem}</p>
                              <p class="text-right text-xs dark:text-gray-400 text-gray-400 mt-1">
                                  ${dataHora}
                              </p>
                              </div>
                          </div>`;

  const messageMe = `<div class="flex justify-end mb-2">
                          <div
                          class="rounded py-2 px-3 bg-[#d9fdd3] dark:bg-[#005c4b] dark:text-white"
                          style="border-radius: 15px"
                          >
                          <p class="text-sm mt-1">${message.mensagem}</p>
                          <p class="text-right text-xs dark:text-gray-400 text-gray-400 mt-1">
                              ${dataHora}
                          </p>
                          </div>
                      </div>`;

  if (message.userId == userLogged.id) {
    messages.insertAdjacentHTML("beforeend", messageMe);
  } else {
    messages.insertAdjacentHTML("beforeend", messageOther);
  }
  toLastMessage();
};
const sendMessage = () => {
  const chatIdSelected = localStorage.getItem("chatIdSelected");
  if (input.value === "") return;
  const dateN = new Date(); // pega a data
  const dateNow = dateN.toLocaleString("pt-BR"); // formata a data para pt-BR

  const values = {
    nome: userLogged.nome,
    userId: userLogged.id,
    chatId: chatIdSelected,
    mensagem: input.value,
    data: dateNow,
  };

  socket.emit("message", JSON.stringify(values));
};
const recoveryMessages = (data) => {
  const message = data;

  const regex = /(\d{2}:\d{2})/;
  if (message.data) {
    const dataModify = message.data.match(regex);
    if (dataModify) {
      var dataHora = dataModify[1];
    } else {
      var dataHora = message.data;
    }
  } else {
    return;
  }

  const messageOther = `<div class="flex mb-2"> 
                              <div
                              class="rounded py-2 px-3 bg-[#ffffff] dark:bg-[#202c33] dark:text-white"
                              style="border-radius: 15px"
                              >
                              <p class="text-sm text-green-500"><strong>${message.nome}</strong></p>
                              <p class="text-sm mt-1">${message.text}</p>
                              <p class="text-right text-xs text-gray-400 dark:text-gray-400 mt-1">
                                  ${dataHora}
                              </p>
                              </div>
                          </div>`;

  const messageMe = `<div class="flex justify-end mb-2">
                          <div
                          class="rounded py-2 px-3 bg-[#d9fdd3] dark:dark:bg-[#005c4b]	dark:text-white"
                          style="border-radius: 15px"
                          >
                          <p class="text-sm mt-1">${message.text}</p>
                          <p class="text-right text-xs text-gray-400 dark:text-gray-400 mt-1">
                              ${dataHora}
                          </p>
                          </div>
                      </div>`;

  if (message.user == userLogged.id) {
    messages.insertAdjacentHTML("beforeend", messageMe);
  } else {
    messages.insertAdjacentHTML("beforeend", messageOther);
  }
  toLastMessage();
};

export {
  saveMessage,
  addNewMessage,
  sendMessage,
  recoveryMessages,
};
