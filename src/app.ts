import 'bulma/css/bulma.css';
import { onBtnClick, urlBtnEl } from './addUrl';
import { urlsColl } from './fbdb';
import { createCard } from './card';
const cardContainer = document.getElementById('cardContainer');

/*
let count = 0;
const x = urlsColl.onSnapshot((d) => {
	count++;
	console.log(d.docs);
	if (count === 3) {
    x(); // HOW TO STOP FIREBASE
    console.log("STOPPING")
  }
});
*/

const showCards = (docs) => {
	docs.forEach((d) => {
		const card = createCard(d.img, d.title, d.siteName, d.desc);
		cardContainer.appendChild(card);
	});
};

const addNewCard = (d) => {
	const card = createCard(d.img, d.title, d.siteName, d.desc);
	cardContainer.insertBefore(card, cardContainer.childNodes[0]);
};

let docs = [];
let btnInit = false;
urlsColl.orderBy('time', 'desc').onSnapshot((d) => {
	docs = d.docs.map((x) => x.data());
	if (!btnInit) {
		showCards(docs);
		btnInit = true;
		urlBtnEl.addEventListener('click', () => {
			onBtnClick(docs);
		});
  }
  else{
    addNewCard(docs[0]);
  }
});
