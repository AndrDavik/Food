import {closeModal, openModal} from './modal';

function forms() {
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Мы свами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	// Под каждую форму подвязываем ф-ю для отправки. Создана ниже
	forms.forEach(item => {
		bindPostData(item);
	});


	// //----------------FormData()----------------------//
	// //создаем ф-ю для отправки данных
	// function postData(form) {
	// 	form.addEventListener('submit', (event) => {
	// 		event.preventDefault();

	// 		// Создаем блок для оповещения клиента
	// 		const statusMessage = document.createElement('div');
	// 		statusMessage.classList.add('status');
	// 		//помещаем смс. На данном этапе "загрузка"
	// 		statusMessage.textContent = message.loading;
	// 		// вставляем в форму это собщение
	// 		form.append(statusMessage);

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', 'server.php');

	// 		//заголовок устанавливать не нужно(когда используем FormData())
	// 		// request.setRequestHeader('Content-tupe', 'multipart/form-data');

	// 		// отправляем в виде FormData
	// 		// ВАЖНО!!! У елементов форм должен быть атрибут name
	// 		const formData = new FormData(form);

	// 		//передаем созданную formData на сервер
	// 		request.send(formData);

	// 		//отслеживаем событие загрузки
	// 		request.addEventListener('load', () => {
	// 			if (request.status === 200) {
	// 				console.log(request.response);

	// 				// оповещаем пользователя. блок уже создан, меняем только текст
	// 				statusMessage.textContent = message.success;

	// 				//очищаем форму
	// 				form.reset();

	// 				//удаляем оповещение с помощью таймаута
	// 				setTimeout(() => {
	// 					statusMessage.remove();
	// 				}, 2000);
	// 			} else {
	// 				statusMessage.textContent = message.failure;
	// 			}
	// 		});
	// 	});
	// }
	// //-------------------------------------------------------//

	//-------------------------JSON-------------------------//
	//создаем ф-ю для отправки данных
	// function postData(form) {
	// 	form.addEventListener('submit', (event) => {
	// 		event.preventDefault();

	// 		// Создаем блок для оповещения клиента
	// 		const statusMessage = document.createElement('img');
	// 		statusMessage.src = message.loading;
			
	// 		statusMessage.style.cssText = `
	// 			display: block;
	// 			margin: 0 auto;
	// 		`;
	// 		// вставляем в форму это собщение
	// 		// form.append(statusMessage);
	// 		form.insertAdjacentElement('afterend', statusMessage);

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', 'server.php');

	// 		request.setRequestHeader('Content-tupe', 'application/json');

	// 		// отправляем в виде FormData
	// 		// ВАЖНО!!! У елементов форм должен быть атрибут name
	// 		const formData = new FormData(form);

	// 		//перебираем formData и записываем в обьект
	// 		const object = {};
	// 		formData.forEach((value, key) => {
	// 			//пара ключ-значение
	// 			object[key] = value;
	// 		});

	// 		//обьект в JSON
	// 		const json = JSON.stringify(object); 

	// 		//передаем json на сервер
	// 		request.send(json);

	// 		//отслеживаем событие загрузки
	// 		request.addEventListener('load', () => {
	// 			if (request.status === 200) {
	// 				console.log(request.response);

	// 				// оповещаем пользователя. блок уже создан, меняем только текст
	// 				showThanksModal(message.success);

	// 				//очищаем форму
	// 				form.reset();

	// 				//удаляем оповещение с помощью таймаута
	// 				statusMessage.remove();
	// 			} else {
	// 				showThanksModal(message.failure);
	// 			}
	// 		});
	// 	});
	// }

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('modal_hide');

		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('modal_show');
			prevModalDialog.classList.remove('modal_hide');
			closeModal();
		}, 4000);
	}

	//--------------------------Fetch--------------------------//
	//GET запрос
	// fetch('https://jsonplaceholder.typicode.com/todos/1')
	// 	.then(response => response.json())
	// 	.then(json => console.log(json));

	//POST запрос
	// fetch('https://jsonplaceholder.typicode.com/posts', {
	// 	method: 'POST',
	// 	body: JSON.stringify({name: 'Alex'}),
	// 	headers: {
	// 		'Content-type': 'application/json' 
	// 	}
	// })
	// .then(response => response.json())
	// .then(json => console.log(json));
	//-------------------------------------------------------//


	//------------------------Fetch FormData--------------------------//

	// создаем асинхронную ф-ю для фетча данных
	const postData = async (url, data) => {

		// будет ждать окончания работы fetch
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		// будет ждать пока не обработается промис(обьект может быть большим)
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			// перебираем formData и записываем в обьект
			// const object = {};
			// formData.forEach((value, key) => {
			// 	//пара ключ-значение
			// 	object[key] = value;
			// });

			// более элегантный вариант записи formData
			// formData.entries() - из формдаты делает массив массивов
			// Object.fromEntries() - из массива делает обьект
			// JSON.stringify() - из обьекта делает json
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// фетч запихнули в ф-ю (выше)
			// fetch('server.php', {
			// 	method: "POST",
			// 	headers: {
			// 		'Content-tupe': 'application/json'
			// 	},
			// 	body: JSON.stringify(object)
			// })
			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});
		});
	}
}

export default forms;