import { ThumbSlider } from './thumb-slider.js';
import thumbsliderHtml from './thumb-slider.html?raw';
import thumbsliderCss from './thumb-slider.css?raw';
import thumbsliderJs from './thumb-slider.js?raw';
import './thumb-slider.css';

export default {
  title: 'Components/ThumbSlider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'swiper.js를 이용한 썸네일 슬라이더 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${thumbsliderHtml}

// CSS
${thumbsliderCss}

// JavaScript
${thumbsliderJs}
        `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = thumbsliderHtml;
    
    const sliderElement = container.querySelector('.thumbswiper');
    new ThumbSlider(sliderElement);
    
    return container;
  }
}; 