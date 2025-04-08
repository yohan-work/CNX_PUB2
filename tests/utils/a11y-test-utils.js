import { axe } from 'jest-axe';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * 컴포넌트의 접근성 테스트를 수행하는 유틸리티
 * @param {string} htmlContent - 테스트할 HTML 내용
 * @param {Object} options - axe 테스트 옵션
 * @returns {Promise<Object>} - axe 테스트 결과
 */
export async function testAccessibility(htmlContent, options = {}) {
  const dom = new JSDOM(htmlContent);
  const results = await axe(dom.window.document.body, options);
  return results;
}

/**
 * 스토리북 컴포넌트의 HTML을 가져와 접근성 테스트를 수행하는 함수
 * @param {string} storyFilePath - 스토리 파일 경로
 * @param {string} storyId - 테스트할 스토리 ID
 * @param {Object} options - axe 테스트 옵션
 * @returns {Promise<Object>} - axe 테스트 결과
 */
export async function testStoryAccessibility(storyFilePath, storyId, options = {}) {
  try {
    // 스토리 파일 로드 (dynamic import 사용)
    // Windows 경로를 file:// URL로 변환합니다
    const fileUrl = pathToFileURL(path.resolve(process.cwd(), storyFilePath));
    console.log(`Importing story file from: ${fileUrl}`);
    
    const storyModule = await import(fileUrl.href);
    const storyFile = storyModule.default || storyModule;
    
    // 스토리 함수 가져오기
    const story = storyFile[storyId] || storyFile.default;
    
    if (!story) {
      throw new Error(`Story ID "${storyId}" not found in ${storyFilePath}`);
    }
    
    // 스토리의 HTML 생성
    const html = typeof story === 'function' ? story() : story.render();
    
    // 접근성 테스트 수행
    return testAccessibility(html, options);
  } catch (error) {
    console.error(`Error testing story: ${error.message}`);
    throw error;
  }
}

/**
 * HTML 파일에 대한 접근성 테스트를 수행하는 함수
 * @param {string} filePath - HTML 파일 경로
 * @param {Object} options - axe 테스트 옵션
 * @returns {Promise<Object>} - axe 테스트 결과
 */
export async function testHtmlFileAccessibility(filePath, options = {}) {
  const htmlContent = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
  return testAccessibility(htmlContent, options);
}

/**
 * 접근성 테스트 결과를 HTML 보고서로 생성하는 함수
 * @param {Object} results - axe 테스트 결과
 * @param {string} outputPath - 출력 파일 경로
 * @returns {void}
 */
export function generateA11yReport(results, outputPath) {
  let htmlReport = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>접근성 테스트 보고서</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
        h1 { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        h2 { color: #3498db; margin-top: 30px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .violation { background: #ffecec; padding: 15px; margin: 10px 0; border-left: 5px solid #e74c3c; border-radius: 3px; }
        .impact-critical { border-left-color: #e74c3c; }
        .impact-serious { border-left-color: #e67e22; }
        .impact-moderate { border-left-color: #f1c40f; }
        .impact-minor { border-left-color: #3498db; }
        .node-info { background: #f5f5f5; padding: 10px; margin: 10px 0; font-family: monospace; white-space: pre-wrap; }
        .help-info { margin-top: 15px; }
        .help-info a { color: #3498db; text-decoration: none; }
        .help-info a:hover { text-decoration: underline; }
        .pass { color: green; }
        .timestamp { color: #777; font-size: 0.9em; margin-top: 50px; }
      </style>
    </head>
    <body>
      <h1>접근성 테스트 보고서</h1>
      
      <div class="summary">
        <h2>요약</h2>
        <p>테스트 시간: ${new Date().toLocaleString()}</p>
        <p>위반 항목: ${results.violations.length}개</p>
        <p>통과 항목: ${results.passes.length}개</p>
        <p>${results.violations.length === 0 ? 
          '<strong class="pass">모든 접근성 테스트를 통과했습니다!</strong>' : 
          '<strong>접근성 이슈가 발견되었습니다. 아래 세부 정보를 확인하세요.</strong>'}
        </p>
      </div>
      
      <h2>위반 항목 상세</h2>
  `;

  if (results.violations.length === 0) {
    htmlReport += '<p>위반 항목이 없습니다.</p>';
  } else {
    results.violations.forEach(violation => {
      htmlReport += `
        <div class="violation impact-${violation.impact}">
          <h3>${violation.help} (중요도: ${violation.impact})</h3>
          <p>${violation.description}</p>
          <p>위반 규칙: ${violation.id}</p>
          
          <h4>영향받는 요소:</h4>
          ${violation.nodes.map(node => `
            <div class="node-info">
              <p>HTML: ${node.html}</p>
              <p>위치: ${node.target.join(', ')}</p>
              <p>해결 방법: ${node.failureSummary}</p>
            </div>
          `).join('')}
          
          <div class="help-info">
            <a href="${violation.helpUrl}" target="_blank">자세한 내용 보기</a>
          </div>
        </div>
      `;
    });
  }

  htmlReport += `
      <h2>통과된 항목</h2>
      <ul>
        ${results.passes.map(pass => `<li>${pass.id}: ${pass.description}</li>`).join('')}
      </ul>
      
      <div class="timestamp">
        생성 시간: ${new Date().toLocaleString()}
      </div>
    </body>
    </html>
  `;

  // 출력 디렉토리가 없으면 생성
  const dirname = path.dirname(outputPath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  fs.writeFileSync(outputPath, htmlReport);
  console.log(`접근성 테스트 보고서가 생성되었습니다: ${outputPath}`);
} 