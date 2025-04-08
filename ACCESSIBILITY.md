# 접근성 테스트 도구 사용 가이드

이 문서는 Jest와 axe-core를 사용하여 접근성 테스트를 수행하는 방법에 대해 설명합니다.

## 개요

이 프로젝트에는 스토리북 컴포넌트와 HTML 파일의 접근성을 자동으로 테스트하고 보고서를 생성하는 도구가 포함되어 있습니다. 이 도구는 [axe-core](https://github.com/dequelabs/axe-core)와 [jest-axe](https://github.com/nickcolley/jest-axe)를 사용하여 다양한 접근성 기준을 확인합니다.

## 설치된 도구

- `jest`: 테스트 프레임워크
- `jest-axe`: axe-core와 Jest를 통합하는 라이브러리
- `axe-core`: 접근성 테스트를 위한 핵심 라이브러리
- `@testing-library/jest-dom`: DOM 테스트를 위한 Jest 확장
- `@storybook/addon-a11y`: 스토리북의 접근성 애드온

## 테스트 실행 방법

### 1. Jest를 사용한 접근성 테스트

모든 접근성 테스트를 실행하려면:

```bash
npm run test:a11y
```

이 명령은 `*.a11y.test.js` 패턴에 일치하는 모든 테스트 파일을 실행합니다.

### 2. CLI 도구를 사용한 접근성 테스트

#### 단일 스토리 테스트

```bash
npm run a11y:story stories/Button/button.stories.js Primary
```

이 명령은 `stories/Button/button.stories.js` 파일의 `Primary` 스토리에 대한 접근성 테스트를 실행합니다.

#### HTML 파일 테스트

```bash
npm run a11y:html path/to/file.html
```

이 명령은 지정된 HTML 파일에 대한 접근성 테스트를 실행합니다.

#### 모든 스토리 테스트

```bash
npm run a11y:all
```

이 명령은 프로젝트 내 모든 스토리에 대한 접근성 테스트를 실행합니다.

### 3. 간편 스크립트 사용

더 쉬운 사용을 위한 스크립트가 준비되어 있습니다:

#### 단일 파일 테스트

```bash
npm run a11y:check -- --file=stories/Button/button.stories.js
```

#### 특정 디렉토리의 모든 파일 테스트

```bash
npm run a11y:check -- --dir=stories/Button
```

#### 모든 스토리 테스트

```bash
npm run a11y:check -- --all
```

또는 옵션 없이:

```bash
npm run a11y:check
```

## 보고서 확인

테스트 실행 시 생성된 보고서는 기본적으로 `a11y-reports` 디렉토리에 저장됩니다. 각 보고서는 HTML 형식으로 제공되며, 브라우저에서 열어 확인할 수 있습니다.

보고서에는 다음 정보가 포함됩니다:

- 위반 항목 요약
- 각 위반의 세부 정보(영향 받는 요소, 위치, 수정 방법)
- 통과한 검사 항목 목록

## 새 컴포넌트에 접근성 테스트 추가하기

새 컴포넌트에 접근성 테스트를 추가하려면:

1. `tests` 디렉토리에 `ComponentName.a11y.test.js` 형식의 파일을 생성합니다.
2. 다음 템플릿을 사용하여 테스트를 작성합니다:

```javascript
import { testStoryAccessibility, generateA11yReport } from './utils/a11y-test-utils.js';
import { toHaveNoViolations } from 'jest-axe';
import path from 'path';
import fs from 'fs';

expect.extend(toHaveNoViolations);

describe('컴포넌트명 접근성 테스트', () => {
  const storyFilePath = 'stories/ComponentPath/component.stories.js';
  const outputDir = path.join(process.cwd(), 'a11y-reports');
  
  beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });
  
  test('스토리명이 접근성 기준을 충족합니다', async () => {
    const results = await testStoryAccessibility(storyFilePath, '스토리ID');
    
    // 보고서 생성
    const outputFile = path.join(outputDir, 'ComponentName-StoryID.html');
    generateA11yReport(results, outputFile);
    
    // Jest 테스트 수행
    expect(results).toHaveNoViolations();
  });
});
```

## 자동화된 워크플로우

CI/CD 파이프라인에 접근성 테스트를 통합하려면 GitHub Actions 워크플로우 파일에 다음 단계를 추가할 수 있습니다:

```yaml
- name: Install dependencies
  run: npm ci

- name: Run accessibility tests
  run: npm run test:a11y

- name: Archive accessibility reports
  uses: actions/upload-artifact@v2
  with:
    name: a11y-reports
    path: a11y-reports/
```

## 접근성 규칙 사용자 정의

기본적으로 이 도구는 [WCAG 2.1](https://www.w3.org/TR/WCAG21/) 표준을 기반으로 테스트를 수행합니다. 특정 규칙을 추가하거나 제외하려면 테스트 파일에서 `testAccessibility` 함수 호출 시 옵션을 전달하세요:

```javascript
const results = await testStoryAccessibility(storyFilePath, 'StoryID', {
  rules: {
    'color-contrast': { enabled: false }, // 특정 규칙 비활성화
    'aria-roles': { enabled: true }       // 특정 규칙 활성화
  }
});
```

## 문제 해결

### Q: 테스트가 실패하는데 어떻게 해야 하나요?
A: 생성된 HTML 보고서를 확인하여 위반 사항의 세부 정보를 확인하세요. 각 위반 사항에는 문제 해결을 위한 가이드와 관련 링크가 포함되어 있습니다.

### Q: 특정 규칙을 무시하고 싶어요.
A: 테스트 파일에서 옵션을 사용하여 특정 규칙을 비활성화할 수 있습니다(위 '접근성 규칙 사용자 정의' 섹션 참조).

### Q: HTML 파일이 아닌 다른 형식의 보고서를 생성하고 싶어요.
A: `utils/a11y-test-utils.js` 파일에 다른 형식(JSON, CSV 등)의 보고서를 생성하는 함수를 추가할 수 있습니다. 