import { LoadingBar } from './loading-bar.js';
import loadingBarSpinner from './loading-bar-spinner.html?raw';
import loadingBarDot from './loading-bar-dot.html?raw';
import loadingBarLinear from './loading-bar-linear.html?raw';
import loadingBarWave from './loading-bar-wave.html?raw';
import loadingBarPulse from './loading-bar-pulse.html?raw';
import loadingBarCss from './loading-bar.css?raw';
import './loading-bar.css';

//Docs 설정영역
export default {
  title: 'Components/LoadingBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 로딩바 컴포넌트입니다.'
      },
      source: {
        code: `
          // CSS
          ${loadingBarCss}
        `
      }
    },
  }
};

// 스토리 정의
export const CircleSpinner = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = loadingBarSpinner;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '원형으로 회전하는 기본 스피너 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarSpinner}
          // CSS
          ${loadingBarCss}
        `
      }
    }
  }
};

export const DotLoading = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = loadingBarDot;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '점 3개가 순차적으로 움직이는 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarDot}

          // CSS
          ${loadingBarCss}
        `
      }
    }
  }
};

export const LinearProgress = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'view-test';
    container.innerHTML = loadingBarLinear;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '가로 방향으로 진행되는 선형 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarLinear}
        `
      }
    }
  }
};

export const WaveLoading = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = loadingBarWave;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '파도처럼 움직이는 막대 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarWave}
        `
      }
    }
  }
};

export const PulseLoading = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = loadingBarPulse;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '원이 박동하는 듯한 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarPulse}
        `
      }
    }
  }
};
