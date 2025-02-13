/**
 * Repeatedly tries to find elements matching the given selector within the DOM.
 *
 * @param {string} selector - The CSS selector to find elements.
 * @param {number} [attempts=10] - Number of attempts before giving up. Use -1 for infinite attempts.
 * @param {number} [interval=100] - Delay (in milliseconds) between attempts.
 * @returns {Promise<Element | NodeListOf<Element>>} Resolves with a single element if only one is found, otherwise a NodeList. Rejects if no elements are found.
 */
function find(selector, attempts = 10, interval = 100) {
    return new Promise((resolve, reject) => {
        let remainingAttempts = attempts;

        function attempt() {
            const elements = document.querySelectorAll(selector);

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

