document.addEventListener('DOMContentLoaded', () => {
	const card = document.querySelector('[data-card]');
	const infoPanel = document.querySelector('[data-info-panel]');
	const infoText = document.querySelector('[data-info-text]');
	const infoTitle = document.querySelector('[data-info-title]');
	const buttons = document.querySelectorAll('[data-link-button]');

	if (!card || !infoPanel || !infoText || !infoTitle || !buttons.length) {
		return;
	}

	const defaultMessage = infoText.textContent || '';
	const defaultTitle = infoTitle.textContent || '';

	const showPanel = (message, title) => {
		infoText.textContent = message;
		infoTitle.textContent = title;
		infoPanel.classList.add('info-panel--visible');
		card.classList.add('link-card--shifted');
	};

	const hidePanel = () => {
		infoText.textContent = defaultMessage;
		infoTitle.textContent = defaultTitle;
		infoPanel.classList.remove('info-panel--visible');
		card.classList.remove('link-card--shifted');
	};

	buttons.forEach((button) => {
		const description = button.dataset.description || defaultMessage;
		const title = button.dataset.title || defaultTitle;

		const handleEnter = () => showPanel(description, title);
		const handleLeave = () => hidePanel();

		button.addEventListener('mouseenter', handleEnter);
		button.addEventListener('focus', handleEnter);
		button.addEventListener('mouseleave', handleLeave);
		button.addEventListener('blur', handleLeave);
	});
});
