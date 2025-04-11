export class LoadingBar {
  /**
   * LoadingBar 클래스의 생성자
   * @param {HTMLElement} element - 로딩 요소를 포함하는 컨테이너 요소
   * @param {Object} options - 로딩바 설정 옵션
   * @param {string} options.backgroundColor - 배경색
   * @param {string} options.elementColor - 로딩 요소 색상
   * @param {number} options.animationSpeed - 애니메이션 속도 배수 (1 = 기본 속도)
   */
  constructor(element, options = {}) {
    // 컨테이너 요소 저장
    this.container = element;
    
    // 기본 옵션 설정
    this.options = {
      backgroundColor: options.backgroundColor || null,
      elementColor: options.elementColor || null,
      animationSpeed: options.animationSpeed || 1
    };
    
    // 다양한 로딩 요소 찾기
    this.loadingElement = element.querySelector('.spinner') || 
                          element.querySelector('.dot-loading') || 
                          element.querySelector('.linear-activity') || 
                          element.querySelector('.wave-loading') || 
                          element.querySelector('.pulse-loading');
    
    // 로딩 요소의 원래 display 스타일 저장
    if (this.loadingElement) {
      this.originalDisplay = this.getOriginalDisplay(this.loadingElement);
    }
    
    // 스크린 리더를 위한 텍스트 요소 찾기 (.sr-only 클래스를 가진 요소)
    this.loadingText = element.querySelector('.sr-only');
    
    // 초기화 메서드 호출
    this.init();
  }

  /**
   * 요소의 원래 display 스타일을 반환하는 메서드
   * @param {HTMLElement} element - display 스타일을 확인할 요소
   * @returns {string} - 요소의 원래 display 스타일
   */
  getOriginalDisplay(element) {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.display !== 'none' ? computedStyle.display : 'block';
  }

  /**
   * 초기화 메서드
   * 로딩 요소의 초기 상태를 설정합니다.
   */
  init() {
    // 초기 설정 - 기본적으로 로딩 요소를 표시합니다.
    this.show();
  }

  /**
   * 로딩 요소를 표시하는 메서드
   * 로딩 요소를 화면에 보이게 하고 접근성 속성을 설정합니다.
   */
  show() {
    if (this.loadingElement) {
      // 로딩 요소를 화면에 표시합니다.
      this.loadingElement.style.display = this.originalDisplay;
      
      // 접근성을 위해 aria-hidden 속성을 false로 설정합니다.
      // 이렇게 하면 스크린 리더가 이 요소를 인식할 수 있습니다.
      this.loadingElement.setAttribute('aria-hidden', 'false');
    }
    this.container.style.display = 'flex';
    
    // 옵션 적용
    this.applyOptions();
  }

  /**
   * 로딩 요소를 숨기는 메서드
   * 로딩 요소를 화면에서 숨기고 접근성 속성을 설정합니다.
   */
  hide() {
    if (this.loadingElement) {
      // 로딩 요소를 화면에서 숨깁니다.
      this.loadingElement.style.display = 'none';
      
      // 접근성을 위해 aria-hidden 속성을 true로 설정합니다.
      // 이렇게 하면 스크린 리더가 이 요소를 무시합니다.
      this.loadingElement.setAttribute('aria-hidden', 'true');

      // 로딩 완료 메시지 설정
      this.setLoadingText('로딩이 완료되었습니다.');
      
      // 완료 메시지를 읽은 후 텍스트 요소도 숨김 처리
      if (this.loadingText) {
        setTimeout(() => {
          this.loadingText.style.display = 'none';
        }, 1000); // 스크린리더가 완료 메시지를 읽을 수 있도록 1초 대기
      }
    }
    this.container.style.display = 'none';
  }

  /**
   * 로딩 텍스트를 변경하는 메서드
   * 스크린 리더를 위한 텍스트 내용을 업데이트합니다.
   * @param {string} text - 설정할 새로운 로딩 텍스트
   */
  setLoadingText(text) {
    // loadingText 요소가 존재하는 경우에만 텍스트를 변경합니다.
    if (this.loadingText) {
      // 텍스트 내용을 업데이트합니다.
      this.loadingText.textContent = text;
    }
  }

  /**
   * 옵션을 적용합니다.
   */
  applyOptions() {
    // 배경색 적용
    if (this.options.backgroundColor) {
      const loadingContainer = this.container.querySelector('.loading-container');
      if (loadingContainer) {
        loadingContainer.style.backgroundColor = this.options.backgroundColor;
      } else {
        this.container.style.backgroundColor = this.options.backgroundColor;
      }
    }
    
    // 요소 색상 적용
    if (this.options.elementColor) {
      if (this.container.querySelector('.spinner')) {
        const spinner = this.container.querySelector('.spinner');
        spinner.style.borderColor = `${this.options.elementColor}33`; // 약간 투명한 버전
        spinner.style.borderTopColor = this.options.elementColor;
      }
      
      if (this.container.querySelector('.dot')) {
        const dots = this.container.querySelectorAll('.dot');
        dots.forEach(dot => {
          dot.style.backgroundColor = this.options.elementColor;
        });
      }
      
      if (this.container.querySelector('.linear-activity-line')) {
        this.container.querySelector('.linear-activity-line').style.backgroundColor = this.options.elementColor;
      }
      
      if (this.container.querySelector('.wave-bar')) {
        const bars = this.container.querySelectorAll('.wave-bar');
        bars.forEach(bar => {
          bar.style.backgroundColor = this.options.elementColor;
        });
      }
      
      if (this.container.querySelector('.pulse-loading')) {
        this.container.querySelector('.pulse-loading').style.backgroundColor = this.options.elementColor;
      }
    }
    
    // 애니메이션 속도 적용 (개선된 방법)
    if (this.options.animationSpeed !== 1) {
      // 각 요소별 기본 애니메이션 시간(초)
      const defaultDurations = {
        '.spinner': 1,
        '.dot': 1.5,
        '.linear-activity-line': 2,
        '.wave-bar': 1.2,
        '.pulse-loading': 1.5
      };
      
      // 각 선택자별로 애니메이션 속도 적용
      Object.entries(defaultDurations).forEach(([selector, defaultDuration]) => {
        const elements = this.container.querySelectorAll(selector);
        const newDuration = `${defaultDuration / this.options.animationSpeed}s`;
        
        elements.forEach(el => {
          el.style.animationDuration = newDuration;
        });
      });
      
      // wave-bar의 경우 animation-delay도 조정
      if (this.container.querySelectorAll('.wave-bar').length > 0) {
        const delayMultiplier = 1 / this.options.animationSpeed;
        const bars = this.container.querySelectorAll('.wave-bar');
        const defaultDelays = [-1.2, -1.1, -1.0, -0.9, -0.8];
        
        bars.forEach((bar, index) => {
          if (index < defaultDelays.length) {
            bar.style.animationDelay = `${defaultDelays[index] * delayMultiplier}s`;
          }
        });
      }
      
      // dot의 경우 animation-delay도 조정
      if (this.container.querySelectorAll('.dot').length > 0) {
        const delayMultiplier = 1 / this.options.animationSpeed;
        const dots = this.container.querySelectorAll('.dot');
        const defaultDelays = [0, 0.3, 0.6];
        
        dots.forEach((dot, index) => {
          if (index < defaultDelays.length) {
            dot.style.animationDelay = `${defaultDelays[index] * delayMultiplier}s`;
          }
        });
      }
    }
  }
}