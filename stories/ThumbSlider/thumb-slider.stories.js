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
  },
  argTypes: {
    thumbSlideShow: {
      control: 'number',
      description: '썸네일 슬라이더에 표시될 슬라이드 개수',
      defaultValue: 4
    },
    thumbSlidePosition: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: '썸네일 슬라이더의 위치',
      defaultValue: 'bottom'
    },
    thumbSwiper: {
      control: 'text',
      description: '썸네일 슬라이더의 클래스명',
      defaultValue: '.thumbswiper_thumbswiper'
    }
  }
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = thumbsliderHtml;
    
    const sliderElement = container.querySelector('.thumbswiper');
    
    // args 값을 속성으로 설정
    sliderElement.setAttribute('thumb-slide-show', args.thumbSlideShow);
    sliderElement.setAttribute('thumb-slide-position', args.thumbSlidePosition);
    sliderElement.querySelector('.thumbswiper_mainswiper').setAttribute('thumbs-swiper', args.thumbSwiper);
    
    new ThumbSlider(sliderElement);
    
    return container;
  },
  args: {
    thumbSlideShow: 4,
    thumbSlidePosition: 'bottom',
    thumbSwiper: '.thumbswiper_thumbswiper'
  }
}; 