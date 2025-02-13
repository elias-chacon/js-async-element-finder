# js-async-element-finder
An async element finder.
This JavaScript utility function attempts to find elements in the DOM using a given CSS selector. If the elements are not found immediately, it will retry for a specified number of attempts before failing.

## Features
- Searches for elements matching a CSS selector.
- Retries multiple times before giving up.
- Supports infinite retries by passing `-1` as the attempts parameter.
- Fully asynchronous using `Promise`.

## Installation
This function is standalone and can be included in any JavaScript project.

## Usage

### Example:
```javascript
find('.my-class', 10, 200)
    .then(elements => console.log('Found:', elements))
    .catch(error => console.error(error.message));
```

Here’s an example of how you can use the `find` function inside an `async` function:  
```javascript
try {
    const elements = await find('.my-class', 10, 200);
    console.log('Elements found:', elements);
    elements.forEach(element => element.style.border = '2px solid red';);
} catch (error) {
    console.error('Error:', error.message);
}
```

### **Explanation**
1. **Uses `async` and `await`** to wait for the `find` function to complete.
2. **Handles success (`then`) and failure (`catch`) properly**.
3. **Applies a red border to the found elements** as an example of using the result.

Let me know if you need additional examples! 🚀

## Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | `string` | Required | The CSS selector to search for. |
| `attempts` | `number` | `10` | Number of attempts before failing. Use `-1` for infinite retries. |
| `interval` | `number` | `100` | Time (in milliseconds) between attempts. |

## Return Value
Returns a `Promise<NodeListOf<Element>>`:
- Resolves with the found elements.
- Rejects with an error message if elements are not found within the given attempts.

## License
This project is licensed under the MIT License.