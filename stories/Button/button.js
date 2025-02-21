export class Button {
  constructor(element) {
    this.button = element;
    this.init();
  }

  init() {
    this.button.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.button.click();
    }
  }

  setVariant(variant) {
    const currentSize = this.button.className.match(/btn-(?:small|medium|large)/)[0];
    this.button.className = `btn btn-${variant} ${currentSize}`;
  }

  setSize(size) {
    const currentVariant = this.button.className.match(/btn-(?:primary|secondary)/)[0];
    this.button.className = `btn ${currentVariant} btn-${size}`;
  }

  setText(text) {
    this.button.querySelector('.btn-text').textContent = text;
  }
} 