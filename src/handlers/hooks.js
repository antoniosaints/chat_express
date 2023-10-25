import { HOST_DB } from "../imports/constants.js";
import { recoveryMessages } from "./messageHandler.js";
import { contacts, chatNameGroup, imageChat } from "../imports/main.js";
import { saveMessage, sendMessage } from "./messageHandler.js";
import {
  messages,
  leftContainer,
  rightContainer,
  input,
  container,
  scrollButton,
} from "../imports/main.js";
const showMessagesListagem = () => {
  leftContainer.classList.remove("w-full");
  leftContainer.classList.add("w-1/3");
  rightContainer.classList.remove("hidden");
  rightContainer.classList.add("w-2/3");
};
const deleteChatSelected = () => {
  localStorage.removeItem("chatIdSelected");
};
const toLastMessage = () => {
  container.scrollTop = container.scrollHeight;
};
const getMessagesChat = async (id) => {
  const idChatSelected = localStorage.getItem("chatIdSelected");
  if (id == idChatSelected) {
    return;
  }
  const DataReturn = await fetch(
    `${HOST_DB}/messages?chat_id=${id}&_sort=id&_order=desc&_limit=50&_page=1`
  );
  const data = await DataReturn.json();
  console.log(data);
  messages.innerHTML = "";
  showMessagesListagem();
  data.reverse();
  data.map((item) => {
    recoveryMessages(item);
  });
};
const getChatsList = async () => {
  const chats = await fetch(`${HOST_DB}/chats`);
  const data = await chats.json();
  console.log(data);
  contacts.innerHTML = "";
  data.map((item) => {
    contacts.innerHTML += `<div
                              data-chatid="${item.id}"
                              data-chatname="${item.name}"
                              data-imagechat="${item.profile}"
                              class="px-3 flex items-center hover:bg-[#f0f2f5] bg-grey-light dark:hover:bg-gray-800 cursor-pointer chat_list_item"
                              >
                              <div>
                                  <img
                                  class="h-12 w-12 rounded-full"
                                  src="assets/${item.profile}"
                                  alt="${item.name}"
                                  />
                              </div>
                              <div class="ml-4 flex-1 border-b border-grey-500 dark:border-gray-600 py-4">
                                  <div class="flex items-bottom justify-between">
                                  <p class="text-grey-darkest">${item.name}</p>
                                  <p class="text-xs text-grey-darkest">12:45 pm</p>
                                  </div>
                                  <div class="flex items-bottom justify-between">
                                  <p
                                  class="text-grey-dark dark:text-gray-400 mt-1 text-sm"
                                  id="last_message_this_contact"
                                  >
                                  Clique para conversar ...
                                  </p>
                                  <p class="text-xs text-grey-darkest">🟢</p>
                                  </div>
                              </div>
                          </div>`;
  });

  const chatList = document.querySelectorAll(".chat_list_item");
  chatList.forEach((item) => {
    item.addEventListener("click", () => {
      getMessagesChat(item.dataset.chatid);
      localStorage.setItem("chatIdSelected", item.dataset.chatid);
      chatNameGroup.innerHTML = item.dataset.chatname;
      imageChat.src = `assets/${item.dataset.imagechat}`;
    });
  });
};
const buttonScrollDown = () => {
  container.addEventListener("scroll", () => {
    const reference = container.scrollHeight - container.scrollTop - 400;
    if (reference > 500) {
      // Exibir o botão quando a barra de rolagem estiver a 100 pixels da parte superior
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  });
};
scrollButton.addEventListener("click", () => {
  toLastMessage();
});
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    sendMessage();
    saveMessage();

    input.value = "";
  }
});

export {
  getMessagesChat,
  getChatsList,
  deleteChatSelected,
  buttonScrollDown,
  toLastMessage,
};
