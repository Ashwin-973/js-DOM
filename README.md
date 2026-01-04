# js-DOM

A vanilla JavaScript project demonstrating core DOM manipulation techniques, event handling, asynchronous data fetching, and the Intersection Observer API.

## 🎯 Features

### 1. **Modal Component**
- Toggle modal visibility with button click
- Close modal via:
  - Close button (X)
  - Clicking outside the modal (overlay)
  - Pressing the Escape key
- Smooth overlay with backdrop blur effect
- State management using boolean flag

### 2. **Async Data Fetching**
- Fetches product data from [DummyJSON API](https://dummyjson.com/products?limit=10)
- Visual state management with 4 states:
  - **IDLE** - Initial state (gray)
  - **LOADING** - Fetching data (cyan)
  - **SUCCESS** - Data loaded successfully (green)
  - **ERROR** - Request failed (red)
- Disables fetch button during loading
- Error handling for:
  - Network failures
  - Invalid HTTP status codes
  - Malformed JSON responses
- Dynamic list rendering using DocumentFragment for performance
- Nullish coalescing for safe data access

### 3. **Infinite Scroll with Intersection Observer**
- Cards animate into view on scroll (slide-in from right with fade)
- Lazy loading: Automatically loads 6 new cards when scrolling to the last card
- Two observers:
  - **Main Observer**: Triggers animation when cards enter viewport
  - **Last Card Observer**: Detects when user reaches the bottom and loads more content
- Smooth CSS transitions for card animations

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, transitions, HSL colors with alpha
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
  - Async/await
  - DocumentFragment
  - IntersectionObserver API
  - Event delegation
  - State machines

## 📂 Project Structure

```
mini-project2/
├── index.html      # Main HTML structure
├── script.js       # All JavaScript logic
├── styles.css      # Styling and animations
└── README.md       # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/js-DOM.git
cd js-DOM
```

2. Open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or simply open the file
open index.html  # macOS
start index.html # Windows
```

3. Navigate to `http://localhost:8000` (if using a server)

## 💡 Code Highlights

### Modal State Management
```javascript
let isOpen = false;

const toggleModal = (e) => {
    isOpen = !isOpen;
    if (isOpen) {
        modalContainer.style.display = 'flex';
        button.textContent = 'Close Modal';
    } else {
        modalContainer.style.display = 'none';
        button.textContent = 'Open Modal';
    }
}
```

### Fetch with State Machine
```javascript
const STATE = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

async function fetchData(e) {
    try {
        setState(STATE.LOADING);
        let response = await fetch('https://dummyjson.com/products?limit=10');
        if (!response.ok) {
            throw new Error(`received invalid status code : ${response.status}`);
        }
        data = await response.json();
        createList(data?.products);
        setState(STATE.SUCCESS);
    } catch(e) {
        setState(STATE.ERROR);
    }
}
```

### Intersection Observer for Infinite Scroll
```javascript
const lastCardObserverCallback = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    
    loadNewCards(); // Load 6 more cards
    observer.unobserve(entry.target);
    observer.observe(document.querySelector('.card:last-child'));
}

const lastCardObserver = new IntersectionObserver(lastCardObserverCallback);
lastCardObserver.observe(document.querySelector('.card:last-child'));
```

## 🎨 Styling Features

- **HSL Colors with Alpha**: `hsla(177, 99.4%, 62.2%, 0.4)` for semi-transparent state indicators
- **CSS Transitions**: Smooth 200ms animations for card entrance
- **Flexbox Layouts**: Responsive centering and alignment
- **Fixed Positioning**: Modal overlay covers entire viewport
- **Transform Animations**: Cards slide in from `translateX(200px)` to `translateX(0)`

## 📝 Key Learnings

1. **Event Handling**: Multiple ways to close a modal (button, overlay, keyboard)
2. **Async/Await**: Modern promise handling with try-catch
3. **DocumentFragment**: Batch DOM updates for better performance
4. **IntersectionObserver**: Efficient scroll-based animations without scroll event listeners
5. **State Management**: Simple state machine pattern for UI states
6. **Error Handling**: Graceful degradation with specific error types
7. **Nullish Coalescing**: Safe property access with `?.` and `??` operators

## 🐛 Known Issues

- Line 40 in `script.js`: Bug in Escape key handler - uses assignment (`=`) instead of comparison (`===`)
  ```javascript
  // Current (bug)
  if(e.key='Escape' && isOpen)
  
  // Should be
  if(e.key === 'Escape' && isOpen)
  ```

## 🔮 Future Enhancements

- [ ] Add loading skeleton for cards
- [ ] Implement virtual scrolling for better performance
- [ ] Add accessibility (ARIA labels, focus management)
- [ ] Refactor modal to use `<dialog>` element
- [ ] Add unit tests
- [ ] Implement debouncing for scroll events

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built as a learning project to master vanilla JavaScript DOM manipulation techniques.

