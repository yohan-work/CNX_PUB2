export class LoadingBar {
  /**
   * LoadingBar 클래스의 생성자
   * @param {HTMLElement} element - 로딩 요소를 포함하는 컨테이너 요소
   */
  constructor(element) {
    // 컨테이너 요소 저장
    this.container = element;
    
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
    const className = element.className;
    
    if (className.includes('dot-loading')) {
      return 'flex';
    } else if (className.includes('wave-loading')) {
      return 'flex';
    } else {
      return 'block';
    }
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
}