function getBlockedUserMessage(userName, storage) {
	const messagesToDelete = document.querySelectorAll('div[data-pre-plain-text*="' + userName + '"');
	for (const messageToDelete of messagesToDelete) {
		const messageToDeleteId = messageToDelete.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
		storage.push(messageToDeleteId)
	}
}

function simulateMouseEvents(element, eventName) {
    var mouseEvent= document.createEvent ('MouseEvents');
    mouseEvent.initEvent (eventName, true, true);
    element.dispatchEvent (mouseEvent);
}

function selectMessages(mainMenu, messagesIds) {
	simulateMouseEvents(mainMenu, 'mousedown');
	mainMenu.parentElement.querySelectorAll('span>div>ul>li')[1].click();
	for (const messageId of messagesIds) {
		let messageDiv = document.querySelector('div[data-id="'+ messageId +'"]');
		let messageButton = messageDiv.parentElement.querySelector("span>div");
		messageButton.click()
	}
}

function deleteMessages() {
	let deleteBtn = document.querySelector("span[data-icon='delete'");
	deleteBtn.click();
	let confirmDelete = document.querySelectorAll("div[data-animate-modal-body='true'] div[role='button'")[1];
	if (confirmDelete.textContent === "Supprimer pour moi") {
		confirmDelete.click()
	}
}

function main(blockedUsers) {
	const messagesIds = [];
	for (const blockedUser of blockedUsers) {
		getBlockedUserMessage(blockedUser, messagesIds)
	}

	if (messagesIds.length > 0) {
		const mainMenu = document.querySelector('div#main div[title="Menu"][role="button"]');
		selectMessages(mainMenu, messagesIds);
		deleteMessages()
	}
}
const blockedUsers = window.prompt('Entrez les numéros OU les noms des personnes à bloquer (séparé par un ";":').split(';');
if (blockedUsers.length > 0) {
	const intervalMS = 2000;
	setInterval(function() {
		main(blockedUsers)
	}, intervalMS);
}
else {
	window.alert("On dirait que tu n'as pas renseigné de numero. Actualise !");
}