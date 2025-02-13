/**
 * Repeatedly tries to find elements matching the given selector within the specified element or the document.
 *
 * @param {string} selector - The CSS selector to find elements.
 * @param {number} [attempts=10] - Number of attempts before giving up. Use -1 for infinite attempts.
 * @param {number} [interval=100] - Delay (in milliseconds) between attempts.
 * @param {Element} [element=document] - The parent element within which to search.
 * @returns {Promise<Element | NodeListOf<Element>>} Resolves with a single element if only one is found, otherwise a NodeList. Rejects if no elements are found.
 */
function find(selector, attempts = 10, interval = 100, element = document) {
    return new Promise((resolve, reject) => {
        let remainingAttempts = attempts;

        function attempt() {
            let searchContext = element;
            
            if (!!element.tagName && element.tagName.toLowerCase() === 'iframe') {
                searchContext = element.contentDocument || element.contentWindow.document;
            }
            
            const elements = searchContext.querySelectorAll(selector);

            if (elements.length > 0) {
                resolve(elements.length === 1 ? elements[0] : elements);
            } else if (remainingAttempts > 0 || attempts === -1) {
                setTimeout(attempt, interval);
                if (remainingAttempts > 0) remainingAttempts--;
            } else {
                reject(new Error(`Element '${selector}' not found after maximum attempts.`));
            }
        }

        attempt();
    });
}
