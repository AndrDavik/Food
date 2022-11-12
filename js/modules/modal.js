function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	console.log(modalSelector);
	console.log(modal);
	modal.classList.add('modal_show');
	modal.classList.remove('modal_hide');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
	
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('modal_hide');
	modal.classList.remove('modal_show');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	//------Modal------//

	const btnsModal = document.querySelectorAll(triggerSelector);
	// const closeModalBtn = document.querySelector('[data-close]');
	const modal = document.querySelector(modalSelector);

	btnsModal.forEach((btn) => {
		btn.addEventListener('click', () => openModal(modalSelector. modalTimerId));
	});

	// closeModalBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', event => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('modal_show')) {
			closeModal(modalSelector);
		}
	});

	//модальное окно когда долистал до конца странички
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			//удаляем обработчик. раз сработал и хватит. нечего тут фигней страдать
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};