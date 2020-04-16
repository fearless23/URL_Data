import axios from "axios";
import { DataType } from "./myTypes";
import { createCard } from "./card";

const urlInputEl = document.getElementById("urlInput") as HTMLInputElement;
const urlBtnEl = document.getElementById("urlBtn") as HTMLButtonElement;
const urlHelpTxtEl = document.getElementById(
  "urlHelpText"
) as HTMLParagraphElement;
const cardContainer = document.getElementById("cardContainer");

const urlSuccess = () => {
  urlInputEl.classList.add("is-success");
  urlBtnEl.classList.add("is-success");
  urlHelpTxtEl.classList.add("is-success");
  urlHelpTxtEl.innerText = "All good";
  urlInputEl.classList.add("is-loading");
};

const reset = () => {
  setTimeout(() => {
    urlInputEl.classList.remove("is-danger");
    urlHelpTxtEl.classList.remove("is-danger");

    urlHelpTxtEl.innerText = "Please provide valid url";
    urlInputEl.removeAttribute("disabled");
    urlBtnEl.removeAttribute("disabled");
  }, 1000);
};

const urlError = () => {
  urlInputEl.classList.add("is-danger");
  urlHelpTxtEl.classList.add("is-danger");
  urlHelpTxtEl.innerText = "Invalid URL String";
  reset();
};

const getData = async (u: string) => {
  const data = await axios.get("http://localhost:3000?url=" + u);
  const serverRes = data.data as ServerRes;
  if (!serverRes.status) throw new Error(serverRes.msg);
  return serverRes.data;
};

type ServerRes = {
  status: boolean;
  msg: string;
  data: DataType;
};

urlBtnEl.addEventListener("click", async () => {
  const x = urlInputEl.value;
  urlInputEl.setAttribute("disabled", "true");
  urlBtnEl.setAttribute("disabled", "true");
  urlInputEl.value = "";
  try {
    new URL(x);
    urlSuccess();
    const d = await getData(x);
    // Add Card...
    const card = createCard(d.img, d.title, d.siteName, d.desc);
    // cardContainer.appendChild(card);
    cardContainer.insertBefore(card, cardContainer.childNodes[0])
    reset();
  } catch (error) {
    urlError();
  }
});
