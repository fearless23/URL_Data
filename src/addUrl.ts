import axios from 'axios';
import { DataType } from './myTypes';

const urlInputEl = document.getElementById('urlInput') as HTMLInputElement;
const urlBtnEl = document.getElementById('urlBtn') as HTMLButtonElement;
const urlHelpTxtEl = document.getElementById(
	'urlHelpText'
) as HTMLParagraphElement;

const btnClicked = () => {
	const x = urlInputEl.value;
	urlInputEl.setAttribute('disabled', 'true');
	urlBtnEl.setAttribute('disabled', 'true');
	urlInputEl.value = '';
	return x;
};

const urlSuccess = () => {
	urlInputEl.classList.add('is-success');
	urlBtnEl.classList.add('is-success');
	urlHelpTxtEl.classList.add('is-success');
	urlHelpTxtEl.innerText = 'All good';
	urlInputEl.classList.add('is-loading');
};

const reset = () => {
	setTimeout(() => {
		urlInputEl.classList.remove('is-danger');
		urlHelpTxtEl.classList.remove('is-danger');

		urlHelpTxtEl.innerText = 'Please provide valid url';
		urlInputEl.removeAttribute('disabled');
		urlBtnEl.removeAttribute('disabled');
	}, 1000);
};

const urlError = (error: string) => {
	urlInputEl.classList.add('is-danger');
	urlHelpTxtEl.classList.add('is-danger');
	urlHelpTxtEl.innerText = error;
	reset();
};

type ServerRes = {
	status: boolean;
	msg: string;
	data: DataType;
};

const getData = async (u: string) => {
	const data = await axios.get('https://url-data.herokuapp.com/?url=' + u);
	const serverRes = data.data as ServerRes;
	if (!serverRes.status) throw new Error(serverRes.msg);
	return serverRes.data;
};
/*
const addUrl = (docs) => {
	urlBtnEl.addEventListener('click', async () => {
		const x = urlInputEl.value;
		urlInputEl.setAttribute('disabled', 'true');
		urlBtnEl.setAttribute('disabled', 'true');
		urlInputEl.value = '';

		try {
			new URL(x);
			urlSuccess();

			const alreadyAdded = docs.find((doc) => doc.url === x);

			if (alreadyAdded) {
				throw new Error('Already added this url');
			}

			const d = await getData(x);
			const docId = urlsColl.doc().id;
			await urlsColl.doc(docId).set({ ...d, docId });
			reset();
		} catch (error) {
			urlError(error.message);
		}
	});
};
*/
import { urlsColl } from './fbdb';
const doesUrlExist = (docs, url: string) => {
	const alreadyAdded = docs.find((doc) => doc.url === url);

	if (alreadyAdded) {
		throw new Error('Already added this url');
	}
};

const addToDb = async (data) => {
	const docId = urlsColl.doc().id;
	await urlsColl.doc(docId).set({ ...data, docId, time: Date.now() });
};

const onBtnClick = async (docs) => {
	console.log(docs.length);
	const x = btnClicked();

	try {
		new URL(x);
		urlSuccess();
		doesUrlExist(docs, x);
		const d = await getData(x);
		await addToDb(d);
		reset();
	} catch (error) {
		urlError(error.message);
	}
};

export { urlBtnEl, onBtnClick };
