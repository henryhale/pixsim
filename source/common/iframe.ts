/**
 * In the docs, the apps are embedded using iframe elements.
 * 
 * There is no need for its own scrollbar - in fact, its content
 * must appear as a part of the parent window
 * 
 * So the iframe will post a message to the parent window passing
 * its height. The parent window will then update the iframe's height
 * since it can't update itself within the parent window. 
 */
if (window.parent) {
	function updateHeight() {
		window.parent.postMessage({
			type: 'iframe-height',
			height: document.documentElement.scrollHeight
		}, '*')
	}
	window.addEventListener('DOMContentLoaded', updateHeight)
	window.onresize = updateHeight
	// window.onload = updateHeight
}