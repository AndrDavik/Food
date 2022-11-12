
import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import openModal from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

	//таймер на модальное окно
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

	tabs();
	calc();
	cards();
	forms();
	modal('[data-modal]', '.modal', modalTimerId);
	slider();
	timer();

});