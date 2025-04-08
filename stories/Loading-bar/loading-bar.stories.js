import { LoadingBar } from './loading-bar.js';
import loadingBarSpinner from './loading-bar-spinner.html?raw';
import loadingBarDot from './loading-bar-dot.html?raw';
import loadingBarLinear from './loading-bar-linear.html?raw';
import loadingBarWave from './loading-bar-wave.html?raw';
import loadingBarPulse from './loading-bar-pulse.html?raw';
import loadingBarCss from './loading-bar.css?raw';
import spinnerCss from './loading-bar-spinner.css?raw';
import dotCss from './loading-bar-dot.css?raw';
import linearCss from './loading-bar-linear.css?raw';
import waveCss from './loading-bar-wave.css?raw';
import pulseCss from './loading-bar-pulse.css?raw';
import './loading-bar.css';
import './loading-bar-spinner.css';
import './loading-bar-dot.css';
import './loading-bar-linear.css';
import './loading-bar-wave.css';
import './loading-bar-pulse.css';

// 다크모드 토글 함수
const toggleDarkMode = (isDark) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // 다크모드 미디어 쿼리 시뮬레이션을 위한 스타일 요소 추가
    let darkModeStyle = document.getElementById('dark-mode-simulation');
    if (!darkModeStyle) {
      darkModeStyle = document.createElement('style');
      darkModeStyle.id = 'dark-mode-simulation';
      document.head.appendChild(darkModeStyle);
    }
    
    // 다크모드 미디어 쿼리 시뮬레이션
    darkModeStyle.textContent = isDark 
      ? '@media (prefers-color-scheme: dark) { :root { color-scheme: dark; } }' 
      : '';
  }
};

// 공통 argTypes 정의
const commonArgTypes = {
  backgroundColor: {
    control: { type: 'color' },
    description: '로딩바 배경색',
    defaultValue: 'rgba(255, 255, 255, 0.9)',
    table: {
      category: '스타일'
    }
  },
  elementColor: {
    control: { type: 'color' },
    description: '로딩 요소의 색상',
    table: {
      category: '스타일'
    }
  },
  animationSpeed: {
    control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
    description: '애니메이션 속도 (1 = 기본 속도)',
    defaultValue: 1,
    table: {
      category: '애니메이션'
    }
  }
};

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
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarSpinner;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '스피너 테두리 색상',
      defaultValue: '#3498db',
      table: {
        category: '스타일'
      }
    }
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
          ${spinnerCss}
        `
      }
    }
  }
};

export const DotLoading = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarDot;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '점 색상',
      defaultValue: '#1a1a1a',
      table: {
        category: '스타일'
      }
    }
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
          ${dotCss}
        `
      }
    }
  }
};

export const LinearProgress = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.className = 'view-test';
    container.innerHTML = loadingBarLinear;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '프로그레스 바 색상',
      defaultValue: '#0d47a1',
      table: {
        category: '스타일'
      }
    }
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
          // CSS
          ${linearCss}
        `
      }
    }
  }
};

export const WaveLoading = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarWave;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '파도 막대 색상',
      defaultValue: '#2a2a8f',
      table: {
        category: '스타일'
      }
    }
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
          // CSS
          ${waveCss}
        `
      }
    }
  }
};

export const PulseLoading = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarPulse;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '펄스 원 색상',
      defaultValue: '#9c27b0',
      table: {
        category: '스타일'
      }
    }
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
          // CSS
          ${pulseCss}
        `
      }
    }
  }
};
