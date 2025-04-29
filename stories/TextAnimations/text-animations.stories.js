import { TextAnimation as TypingAnimation } from './text-animation-typing.js';
import { TextAnimation as FadeAnimation } from './text-animation-fade.js';
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
      options: ['typing', 'fade'],
      description: '애니메이션 효과 선택',
      table: {
        defaultValue: { summary: 'typing' },
      },
    },
    Text: {
      control: 'text',
      description: '텍스트 내용',
      table: {
        defaultValue: { summary: '텍스트 내용' },
      },
    },
    Speed: {
      control: { 
        type: 'range',
        min: 0.1,
        max: 1,
        step: 0.05
      },
      description: '애니메이션 속도',
      table: {
        defaultValue: { summary: '0.15' },
      },
    },
    Direction: {
      control: 'select',
      options: ['start', 'end', 'center', 'edges', 'random'],
      description: '애니메이션 방향',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
  },
};

export const AllEffects = {
  args: {
    Effect: 'typing',
    Speed: 0.15,
    Direction: 'start',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;
    
    if (args.Effect === 'typing') {
      textAnimation = new TypingAnimation(container, args.Text, args.Speed, args.Direction);
    } else if (args.Effect === 'fade') {
      textAnimation = new FadeAnimation(container, args.Text, args.Speed, args.Direction);
    }

    
    return container;
  },
};

export const Typing = {
  args: {
    Speed: 0.15,
    Direction: 'start',   
  },
  argTypes: {
    Effect: {
      table: {
        disable: true
      }
    }
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;  
    
    textAnimation = new TypingAnimation(container, args.Text, args.Speed, args.Direction);
    
    return container;
  },
};


export const Fade = {
  args: {
    Speed: 0.15,
    Direction: 'start',
  },
  argTypes: {
    Effect: {
      table: {
        disable: true
      }
    }
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    let textAnimation;  
    
    textAnimation = new FadeAnimation(container, args.Text, args.Speed, args.Direction);
    
    return container;
  },
};
