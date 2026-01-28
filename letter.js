// letter.js
// Simple script that provides letter content and injects it into the page.
// Usage (basic):
// 1) Add a container in letter.html where the letter should appear:
//    <div id="letter"></div>
// 2) Include this script (before </body>):
//    <script src="letter.js"></script>
//
// If you want to control injection manually, call `renderLetter('#mySelector')`
// or read the raw HTML from `window.letterHTML`.

(function () {
  // The letter content — edit this string to change the letter.
  const letterHTML = `
    <article class="birthday-letter">
      <h1>Happy Birthday!</h1>

      <p>Dear Friend,</p>

      <p>
        Wishing you a wonderful birthday full of joy, laughter, and love.
        I hope the coming year brings you new adventures, memorable moments,
        and everything you dream of.
      </p>

      <p>
        Thank you for being the amazing person you are — kind, strong, and inspiring.
        Celebrate big today — you deserve it!
      </p>

      <p>Warm wishes,</p>
      <p><strong>[Your Name]</strong></p>
    </article>
  `;

  // Insert the letter HTML into the provided selector (defaults to '#letter').
  function renderLetter(selector = '#letter') {
    const el = document.querySelector(selector);
    if (!el) {
      // Nothing to render into; quietly return.
      return false;
    }
    el.innerHTML = letterHTML;
    return true;
  }

  // Expose to global so letter.html can use it directly.
  if (typeof window !== 'undefined') {
    window.letterHTML = letterHTML;
    window.renderLetter = renderLetter;
  }

  // Auto-inject when DOM is ready if an element with id="letter" exists.
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        renderLetter('#letter');
      });
    } else {
      // already ready
      renderLetter('#letter');
    }
  }

  // If running in a CommonJS environment (node tooling), also export.
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    exports.letterHTML = letterHTML;
    exports.renderLetter = renderLetter;
  }
})();
