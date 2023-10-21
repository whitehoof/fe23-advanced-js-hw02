"use strict"

// first JS file
const books = [
	{ 
	  author: "Люсі Фолі",
	  name: "Список запрошених",
	  price: 70 
	}, 
	{
	 author: "Сюзанна Кларк",
	 name: "Джонатан Стрейндж і м-р Норрелл",
	}, 
	{ 
	  name: "Дизайн. Книга для недизайнерів.",
	  price: 70
	}, 
	{ 
	  author: "Алан Мур",
	  name: "Неономікон",
	  price: 70
	}, 
	{
	 author: "Террі Пратчетт",
	 name: "Рухомі картинки",
	 price: 40
	},
	{
	 author: "Анґус Гайленд",
	 name: "Коти в мистецтві",
	}
  ];

  const root = document.querySelector('#root');
  const ul = document.createElement('ul');
  root.append(ul);

  function appendLi(parentElement, contentsArray) {
	// loop through the array of "book" objects:
	contentsArray.forEach( (obj, ind) => {
		let innerHtmlForLi = '';
		try {
			// BAD books:
			if		( obj.name   === undefined )	{ throw new Error(`Book #${ind} has no name.`); } 
			else if	( obj.author === undefined )	{ throw new Error(`Book #${ind} has no author.`); } 
			else if	( obj.price  === undefined )	{ throw new Error(`Book #${ind} has no price.`); } 
			
			// GOOD books:
			else { innerHtmlForLi = `${obj.author}, "${obj.name}"<br><span>$ ${obj.price}</span>`; }
		} catch (e) {
			console.warn(e.message)
		}
		const newLi = document.createElement('li');
		newLi.innerHTML = innerHtmlForLi;
		ul.append(newLi);
	}); // END OF ARRAY LOOP
  }
  appendLi(ul, books);