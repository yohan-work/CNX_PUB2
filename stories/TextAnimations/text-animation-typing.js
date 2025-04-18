import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText) 

export class TextAnimation {
  constructor(element, changeText, speed = 0.15, direction = 'start') {
    if (!element) return;
    this.element = element;
    this.init(changeText, speed, direction);
  }

  typing(text, speed, direction) {
    const splitText = new SplitText(text, { type: "chars" });
    gsap.from(splitText.chars, {
      opacity: 0,
      stagger: {
        each: speed,
        from: direction,
      },
    });
  }

  init(changeText, speed, direction) {
    const text = this.element.querySelector('.typing-text');
    if(changeText) {
      gsap.set(
        text,
        {
          textContent: changeText,
        }
      )
    }
    this.typing(text, speed, direction);
  }
}
