import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText) 

export class TextAnimation {
  constructor(element, words = ['첫번째', '두번째', '세번째'], speed = 0.15, delay = 2, repeat = -1) {
    if (!element) return;
    this.element = element;
    this.init(words, speed, delay, repeat);
  }

  wordChange(text, words, speed, delay, repeat) {
    if (!words || words.length === 0) return;
    
    // 첫 단어 설정
    gsap.set(text, { textContent: words[0] });
    
    // 타임라인 생성
    const tl = gsap.timeline({
      repeat: repeat,
      repeatDelay: 0.5
    });
    
    // 첫 단어를 충분히 보여주기 위한 딜레이 추가
    tl.to(text, {
      duration: delay,
      opacity: 1
    });
    
    // 단어 수가 1개 이상일 경우만 애니메이션 적용
    if (words.length > 1) {
      // 각 단어에 대한 애니메이션 추가
      words.forEach((word, index) => {
        const nextIndex = (index + 1) % words.length;
        
        // 현재 단어에서 다음 단어로 전환
        tl.to(text, {
          duration: speed,
          opacity: 0,
          onComplete: () => {
            gsap.set(text, { textContent: words[nextIndex] });
          }
        })
        .to(text, {
          duration: speed,
          opacity: 1
        })
        .to(text, {
          duration: delay,
        });
      });
    }
    
    return tl;
  }

  init(words, speed, delay, repeat) {
    const text = this.element.querySelector('.typing-text');
    // words가 문자열인 경우 콤마로 분리된 단어 배열로 변환
    const wordArray = Array.isArray(words) ? words : 
                     (typeof words === 'string' ? words.split(',').map(w => w.trim()) : ['텍스트']);
    
    this.wordChange(text, wordArray, speed, delay, repeat);
  }
} 