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
        component: 'swiper.js를 이용한 썸네일 슬라이더 컴포넌트입니다.',
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
      description: '썸네일 슬라이더에 표시될 슬라이드 개수 (최대값이 메인 슬라이더의 슬라이드 개수)',
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
    const mainSliderContainer = sliderElement.querySelector('.thumbswiper_mainswiper');
    
    // 메인 슬라이더의 슬라이드 개수 확인
    const mainSlideCount = mainSliderContainer.querySelectorAll('swiper-slide').length;
    
    // thumbSlideShow 값이 메인 슬라이더 개수를 초과하지 않도록 조정
    const adjustedThumbSlideShow = Math.min(args.thumbSlideShow, mainSlideCount);
    
    // 이전 ThumbSlider 인스턴스 정리
    if (sliderElement._thumbSlider) {
      sliderElement._thumbSlider = null;
    }
    
    // args 값을 속성으로 설정
    sliderElement.setAttribute('thumb-slide-show', adjustedThumbSlideShow);
    sliderElement.setAttribute('thumb-slide-position', args.thumbSlidePosition);
    sliderElement.querySelector('.thumbswiper_mainswiper').setAttribute('thumbs-swiper', args.thumbSwiper);
    
    // 새로운 ThumbSlider 인스턴스 생성
    const thumbSlider = new ThumbSlider(sliderElement);
    sliderElement._thumbSlider = thumbSlider;
    
    // args 변경 시 높이 업데이트를 위한 MutationObserver
    const observer = new MutationObserver(() => {
      if (args.thumbSlidePosition === 'left' || args.thumbSlidePosition === 'right') {
        const mainSliderContainer = sliderElement.querySelector('.thumbswiper_mainswiper');
        const thumbSliderContainer = sliderElement.querySelector('.thumbswiper_thumbswiper');
        if (mainSliderContainer && thumbSliderContainer) {
          const mainSliderHeight = mainSliderContainer.offsetHeight;
          if (mainSliderHeight > 0) {
            thumbSliderContainer.style.height = `${mainSliderHeight}px`;
            if (thumbSliderContainer.swiper) {
              thumbSliderContainer.swiper.update();
            }
          }
        }
      }
    });
    
    observer.observe(sliderElement, {
      attributes: true,
      attributeFilter: ['thumb-slide-position', 'thumb-slide-show']
    });
    
    return container;
  },
  args: {
    thumbSlideShow: 4,
    thumbSlidePosition: 'bottom',
    thumbSwiper: '.thumbswiper_thumbswiper'
  }
}; 