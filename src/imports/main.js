const container = document.getElementById("list_chat_messages_container");
const messages = document.getElementById("list_chat_messages");
const input = document.getElementById("input_send_message");
const name = document.getElementById("search_contact");
const contacts = document.getElementById("contacts_listagem");
const userLogged = JSON.parse(localStorage.getItem("authuser"));
const leftContainer = document.getElementById("list_left_container_chat");
const rightContainer = document.getElementById("list_right_container_chat");
const chatNameGroup = document.getElementById("chat_name_listagem");
const scrollButton = document.getElementById("scrollButton");
const imageChat = document.getElementById("chat_image");
const nameUserLogged = document.getElementById("name_user_logged");
const chatIdSelected = localStorage.getItem("chatIdSelected");

nameUserLogged.innerText = userLogged.nome;
if (!userLogged) {
  window.location.href = "/";
}

export {
  container,
  messages,
  input,
  name,
  contacts,
  userLogged,
  leftContainer,
  rightContainer,
  chatNameGroup,
  scrollButton,
  imageChat,
  nameUserLogged,
  chatIdSelected,
};
