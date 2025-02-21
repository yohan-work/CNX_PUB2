import toastHtml from './toast.html?raw';
import toastCss from './toast.css?raw';
import './toast.css';

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 토스트 알림 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${toastHtml}

// CSS
${toastCss}
        `
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select', options: ['success', 'error'] },
      description: '토스트 타입',
      defaultValue: 'success'
    },
    title: {
      control: 'text',
      description: '알림 제목'
    },
    message: {
      control: 'text',
      description: '알림 메시지'
    },
    duration: {
      control: 'number',
      description: '표시 지속 시간(ms)',
      defaultValue: 3000
    }
  }
};

export const Success = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = toastHtml;
    
    const toast = container.querySelector('.toast.success');
    toast.querySelector('.toast-title').textContent = args.title || '성공';
    toast.querySelector('.toast-message').textContent = args.message || '작업이 성공적으로 완료되었습니다.';
    
    // 자동 닫기
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => {
        toast.hidden = true;
      }, 300);
    }, args.duration);
    
    // 닫기 버튼
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('hiding');
      setTimeout(() => {
        toast.hidden = true;
      }, 300);
    });
    
    return container;
  }
};

export const Error = {
  ...Success,
  args: {
    type: 'error',
    title: '오류',
    message: '작업 중 오류가 발생했습니다.'
  }
}; 