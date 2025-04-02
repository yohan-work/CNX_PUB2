import { register } from 'swiper/element/bundle';
register();


export class ThumbSlider {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    const mainSliderContainer = this.element.querySelector('.thumbswiper_mainswiper');
    if (!mainSliderContainer) {
      console.error('Mainslider container not found');
      return;
    }

    const thumbSliderContainer = document.createElement('swiper-container');
    const thumbSliderClassName = mainSliderContainer.getAttribute('thumbs-swiper').replace('.', '');
    // const mainSliderClassName = mainSliderContainer.className;
    thumbSliderContainer.className = thumbSliderClassName;
    // thumbSliderContainer.setAttribute('controller-control', `.${mainSliderClassName}`);
    this.element.appendChild(thumbSliderContainer);

    let thumbSlideShow = this.element.getAttribute('thumb-slide-show');
    if (!thumbSlideShow) {
      const mainSlideCount = mainSliderContainer.querySelectorAll('swiper-slide').length;
      thumbSlideShow = mainSlideCount;
    }
    thumbSliderContainer.setAttribute('slides-per-view', thumbSlideShow);

    const mainSlides = mainSliderContainer.querySelectorAll('swiper-slide');
    mainSlides.forEach(slide => {
      const clonedSlide = slide.cloneNode(true);
      thumbSliderContainer.appendChild(clonedSlide);
    });

  }
}