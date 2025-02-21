import { Modal } from './modal.js';
import modalHtml from './modal.html?raw';
import modalCss from './modal.css?raw';
import modalJs from './modal.js?raw';
import './modal.css';

export default {
  title: 'Components/Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 모달 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${modalHtml}

// CSS
${modalCss}

// JavaScript
${modalJs}
        `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = modalHtml;
    
    const modalElement = container;
    new Modal(modalElement);
    
    return container;
  }
}; 