function main() {
    for (const element of document.querySelectorAll("div[class*='blockedSystem']")) {
        const item = element.parentElement.parentElement.parentElement;
        item.innerHTML = ''
    }
}
setInterval(function() {
		main()
}, 1000);