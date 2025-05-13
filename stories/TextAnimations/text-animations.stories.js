import { TextAnimation as TypingAnimation } from './text-animation-typing.js';
import { TextAnimation as FadeAnimation } from './text-animation-fade.js';
import { TextAnimation as ColorAnimation } from './text-animation-color.js';
import { TextAnimation as WordChangeAnimation } from './text-animation-word-change.js';
import textAnimationHtml from './text-animation.html?raw';
import textAnimationCss from './text-animation.css?raw';
import textAnimationTypingJs from './text-animation-typing.js?raw';
import './text-animation.css';

export default {
  title: 'GSAP/TextAnimations',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'GSAP를 이용한 텍스트 애니메이션 컴포넌트입니다.',
      },
      source: {
        code: `
// HTML
${textAnimationHtml}

// CSS
${textAnimationCss}

// JavaScript
${textAnimationTypingJs}
        `
      }
    }
  },
  argTypes: {
    Effect: {
      control: 'radio',
      options: ['typing', 'fade', 'color', 'wordChange'],
      description: '애니메이션 효과 선택<br/><span style="background: #2ecc71; color:#fff; border-radius: 5px; padding:0 5px;">공통</span>',
      table: {
        defaultValue: { summary: 'typing' },
        type: { disable: true },
      },
    },
    Text: {
      control: 'text',
      description: '텍스트 내용<br/><span style="background: #3498db; color:#fff; border-radius: 5px; padding:0 5px;">typing</span><span style="background: #9b59b6; color:#fff; border-radius: 5px; padding:0 5px;">fade</span> <span style="background: #e74c3c; color:#fff; border-radius: 5px; padding:0 5px;">color</span>',
      table: {
        defaultValue: { summary: '텍스트 내용' },
        category: '텍스트 내용',
        type: { disable: true },
      },
    },
    Words: {
      control: 'text',
      description: '콤마로 구분된 단어 목록<br/><span style="background: #f39c12; color:#fff; border-radius: 5px; padding:0 5px;">wordChange</span>',
      table: {
        defaultValue: { summary: 'html, css, scss, javascript, jquery, gsap' },
        category: '텍스트 내용',
        type: { disable: true },
      },
    },
    Speed: {
      control: { 
        type: 'range',
        min: 0.1,
        max: 1,
        step: 0.05
      },
      description: '애니메이션 속도<br/><span style="background: #2ecc71; color:#fff; border-radius: 5px; padding:0 5px;">공통</span>',
      table: {
        defaultValue: { summary: '0.15' },
        type: { disable: true },
      },
    },
    Delay: {
      control: { 
        type: 'range',
        min: 0.5,
        max: 5,
        step: 0.5
      },
      description: '단어 변경 간 지연 시간<br/><span style="background: #f39c12; color:#fff; border-radius: 5px; padding:0 5px;">wordChange</span>',
      table: {
        defaultValue: { summary: '2' },
        type: { disable: true },
      },
    },
    Repeat: {
      control: { 
        type: 'range',
        min: -1,
        max: 10,
        step: 1
      },
      description: '반복 횟수 (-1: 무한)<br/><span style="background: #f39c12; color:#fff; border-radius: 5px; padding:0 5px;">wordChange</span>',
      table: {
        defaultValue: { summary: '-1' },
        type: { disable: true },
      },
    },
    Direction: {
      control: 'select',
      options: ['start', 'end', 'center', 'edges', 'random'],
      description: '애니메이션 방향<br/><span style="background: #3498db; color:#fff; border-radius: 5px; padding:0 5px;">typing</span> <span style="background: #9b59b6; color:#fff; border-radius: 5px; padding:0 5px;">fade</span> <span style="background: #e74c3c; color:#fff; border-radius: 5px; padding:0 5px;">color</span>',
      table: {
        defaultValue: { summary: 'start' },
        type: { disable: true },
      },
    },
    FadeDirection: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: '페이드 방향<br/><span style="background: #9b59b6; color:#fff; border-radius: 5px; padding:0 5px;">fade</span>',
      table: {
        defaultValue: { summary: 'bottom' },
        type: { disable: true },
      },
    },
    SplitUnit: {
      control: 'radio',
      options: ['chars', 'words'],
      description: '애니메이션 분할 단위<br/><span style="background: #3498db; color:#fff; border-radius: 5px; padding:0 5px;">typing</span> <span style="background: #9b59b6; color:#fff; border-radius: 5px; padding:0 5px;">fade</span> <span style="background: #e74c3c; color:#fff; border-radius: 5px; padding:0 5px;">color</span>',
      table: {
        defaultValue: { summary: 'chars' },
        type: { disable: true },
      },
    },
    FromColor: {
      control: 'color',
      description: '시작 색상<br/><span style="background: #e74c3c; color:#fff; border-radius: 5px; padding:0 5px;">color</span>',
      table: {
        defaultValue: { summary: '#DDD' },
        type: { disable: true },
      },
    },
    ToColor: {
      control: 'color',
      description: '끝 색상<br/><span style="background: #e74c3c; color:#fff; border-radius: 5px; padding:0 5px;">color</span>',
      table: {
        defaultValue: { summary: '#000' },
        type: { disable: true },
      },
    },
  },
};

export const AllEffects = {
  args: {
    Effect: 'typing',
    Text: '안녕하세요, GSAP 텍스트 애니메이션입니다!',
    Words: 'html, css, scss, javascript, jquery, gsap',
    Speed: 0.15,
    Direction: 'start',
    FadeDirection: 'bottom',
    SplitUnit: 'chars',
    FromColor: '#DDD',
    ToColor: '#000',
    Delay: 2,
    Repeat: -1,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;
    
    if (args.Effect === 'typing') {
      textAnimation = new TypingAnimation(container, args.Text, args.Speed, args.Direction, args.SplitUnit);
    } else if (args.Effect === 'fade') {
      textAnimation = new FadeAnimation(container, args.Text, args.Speed, args.Direction, args.FadeDirection, args.SplitUnit);
    } else if (args.Effect === 'color') {
      textAnimation = new ColorAnimation(container, args.Text, args.Speed, args.Direction, args.SplitUnit, args.FromColor, args.ToColor);
    } else if (args.Effect === 'wordChange') {
      textAnimation = new WordChangeAnimation(container, args.Words, args.Speed, args.Delay, args.Repeat);
    }
    
    return container;
  },
};

export const Typing = {
  args: {
    Speed: 0.15,
    Direction: 'start',
    SplitUnit: 'chars',
  },
  argTypes: {
    Effect: {
      table: {
        disable: true
      }
    },
    FadeDirection: {
      table: {
        disable: true
      }
    },
    FromColor: {
      table: {
        disable: true
      }
    },
    ToColor: {
      table: {
        disable: true
      }
    },
    Words: {
      table: {
        disable: true
      }
    },
    Delay: {
      table: {
        disable: true
      }
    },
    Repeat: {
      table: {
        disable: true
      }
    }
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;  
    
    textAnimation = new TypingAnimation(container, args.Text, args.Speed, args.Direction, args.SplitUnit);
    
    return container;
  },
};


export const Fade = {
  args: {
    Speed: 0.15,
    Direction: 'start',
    FadeDirection: 'bottom',
    SplitUnit: 'chars',
  },
  argTypes: {
    Effect: {
      table: {
        disable: true
      }
    },
    FromColor: {
      table: {
        disable: true
      }
    },
    ToColor: {
      table: {
        disable: true
      }
    },
    Words: {
      table: {
        disable: true
      }
    },
    Delay: {
      table: {
        disable: true
      }
    },
    Repeat: {
      table: {
        disable: true
      }
    }
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;  
    
    textAnimation = new FadeAnimation(container, args.Text, args.Speed, args.Direction, args.FadeDirection, args.SplitUnit);
    
    return container;
  },
};

export const Color = {
  args: {
    Speed: 0.15,
    Direction: 'start',
    SplitUnit: 'chars',
    FromColor: '#DDD',
    ToColor: '#000',
  },
  argTypes: {
    Effect: {
      table: {
        disable: true
      }
    },
    FadeDirection: {
      table: {
        disable: true
      }
    },
    Words: {
      table: {
        disable: true
      }
    },
    Delay: {
      table: {
        disable: true
      }
    },
    Repeat: {
      table: {
        disable: true
      }
    }
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;  
    
    textAnimation = new ColorAnimation(container, args.Text, args.Speed, args.Direction, args.SplitUnit, args.FromColor, args.ToColor);
    
    return container;
  },
};

export const WordChange = {
  args: {
    Words: 'html, css, scss, javascript, jquery, gsap',
    Speed: 0.15,
    Delay: 2,
    Repeat: -1,
  },
  argTypes: {
    Effect: {
      table: {
        disable: true
      }
    },
    Text: {
      table: {
        disable: true
      }
    },
    Direction: {
      table: {
        disable: true
      }
    },
    FadeDirection: {
      table: {
        disable: true
      }
    },
    SplitUnit: {
      table: {
        disable: true
      }
    },
    FromColor: {
      table: {
        disable: true
      }
    },
    ToColor: {
      table: {
        disable: true
      }
    }
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;  
    
    textAnimation = new WordChangeAnimation(container, args.Words, args.Speed, args.Delay, args.Repeat);
    
    return container;
  },
};
