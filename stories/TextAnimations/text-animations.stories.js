import { TextAnimation } from './text-animation-typing.js';
import textAnimationHtml from './text-animation-typing.html?raw';
import textAnimationCss from './text-animation-typing.css?raw';
import textAnimationJs from './text-animation-typing.js?raw';
import './text-animation-typing.css';

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
${textAnimationJs}
        `
      }
    }
  },
  argTypes: {
    Text : {
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
      options: ['start', 'end', 'center', 'edges'],
      description: '애니메이션 방향',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
  }
};

export const Default = {
  args: {
    Speed: 0.15,
    Direction: 'start'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = textAnimationHtml;
    
    const textAnimation = new TextAnimation(container, args.Text, args.Speed, args.Direction);
    return container;
  }
};

