import { Button } from './button.js';
import buttonHtml from './button.html?raw';
import buttonCss from './button.css?raw';  // CSS 파일도 raw로 import
import './button.css';

// 메타데이터 설정
export default {
  title: 'Components/Button',
  tags: ['autodocs'], // 자동 문서화 활성화
  parameters: {
    docs: {
      description: {
        component: '테스트 아 아 아 응답 응답'
      },
      source: {
        // 코드 예제 표시
        code: buttonHtml,
        language: 'html',
        type: 'code'
      }
    },
    // CSS 코드도 표시
    cssSource: {
      code: buttonCss,
      language: 'css'
    }
  },
  argTypes: {
    label: { 
      control: 'text',
      description: '버튼에 표시될 텍스트'
    },
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
      description: '버튼의 스타일 변형'
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: '버튼의 크기'
    }
  }
};

// 스토리 정의
export const Primary = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = buttonHtml;
    
    const buttonElement = container.querySelector('.btn');
    const button = new Button(buttonElement);
    
    button.setText(args.label);
    button.setVariant(args.variant);
    button.setSize(args.size);
    
    return container;
  },
  args: {
    label: '보여지는 텍스트',
    variant: 'primary',
    size: 'medium'
  },
  parameters: {
    docs: {
      story: {
        inline: true
      }
    }
  }
};

// 다양한 상태의 버튼 예제
export const Secondary = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'secondary'
  }
};

export const Small = {
  ...Primary,
  args: {
    ...Primary.args,
    size: 'small'
  }
};

export const Large = {
  ...Primary,
  args: {
    ...Primary.args,
    size: 'large'
  }
}; 