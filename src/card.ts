const cel = (tag: string, ...classes: string[]) => {
  const x = document.createElement(tag);
  if (classes) {
    x.classList.add(...classes);
  }
  return x;
};

const textPad = (text: string, length: number, pad = " ...") => {
  if(!text) return "--NA--"
  return text.length <= length ? text : text.substring(0, length) + pad;
};
/*

<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    
    <p class="title is-4">John Smith</p>
    <p class="subtitle is-6">@johnsmith</p>
     

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris.
      <a href="#">VIEW</a>
    </div>
  </div>
</div>

*/
const createCard = (
  imgSource: string,
  title: string,
  siteName: string,
  desc: string
) => {
  const card = cel("div", "card");

  const cardImg = cel("div", "card-image");
  const cardFig = cel("figure", "image", "is-4by3");
  const img = cel("img") as HTMLImageElement;
  img.setAttribute("src", imgSource);
  cardFig.appendChild(img);
  cardImg.appendChild(cardFig);
  // MEDIA

  const h1 = cel("p", "title", "is-4");
  const h6 = cel("p", "title", "is-6");
  h1.innerText = siteName || "---";
  h6.innerText = textPad(title, 30);

  // CONTENT
  const content = cel("div", "content");
  content.innerText = textPad(desc, 160);
  const link = cel("a");
  link.innerText = "View";
  content.appendChild(link);

  // CARD CONTENT
  const cardContent = cel("div", "card-content");
  cardContent.appendChild(h1);
  cardContent.appendChild(h6);
  cardContent.appendChild(content);

  card.appendChild(cardImg);
  card.appendChild(cardContent);
  return card;
};

export { createCard };
