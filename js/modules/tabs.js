function tabs() {
	//--------Tabs----------//
	const tabs = document.querySelectorAll('.tabheader__item'),
	tabsContent = document.querySelectorAll('.tabcontent'),
	tabsParent = document.querySelector('.tabheader__items');

	//скрываем контент табов и удаляем класс активности
	function hideTabsContent() {
		tabsContent.forEach((elem) => {
			elem.classList.add('tabcontent_hide');
			elem.classList.remove('tabcontent_show', 'tabcontent_fade');
		});	
		tabs.forEach((elem) => {
			elem.classList.remove('tabheader__item_active');
		});
	}

	//показываем контент табов
	function showTabsContent(i = 0) {
		tabsContent[i].classList.add('tabcontent_show', 'tabcontent_fade');
		tabsContent[i].classList.remove('tabcontent_hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabsContent();
					showTabsContent(i);	
				}
			});
		}
	});
}

export default tabs;