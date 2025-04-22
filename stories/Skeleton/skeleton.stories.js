// 컴포넌트 및 리소스 가져오기
import './skeleton.css';

export default {
    title: 'Components/Skeleton',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '로딩 상태를 표시하는 스켈레톤 컴포넌트입니다. <br /><a href="https://mui.com/material-ui/react-skeleton/#pulsate-example">Material UI의 Skeleton 컴포넌트</a>를 참고하여 <br />text, circular, rectangular, rounded을 조합하여 다양한 형태의 스켈레톤을 제공합니다.<br /><a href="https://flowbite.com/docs/components/skeleton/">Tailwind CSS의 Flowbite Skeleton 컴포넌트</a>를 참고하였습니다.'
            }
        }
    },
    argTypes: {
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            defaultValue: 'light',
            description: '테마 선택',
            table: {
                category: '스타일'
            }
        },
        animation: {
            control: 'select',
            options: ['wave', 'pulse', 'shine', 'glow', 'fade', 'gradient', 'slide', 'shimmer'],
            defaultValue: 'wave',
            description: '애니메이션 타입',
            table: {
                category: '애니메이션'
            }
        },
        animationSpeed: {
            control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
            defaultValue: 1.5,
            description: '애니메이션 속도 (초 단위)',
            table: {
                category: '애니메이션'
            }
        }
    }
};

// 기본 스켈레톤 컴포넌트들
export const Basic = (args) => `<style>
    :root {
        --animation-duration: ${args.animationSpeed}s;
    }
</style>
<div class="skeleton-section ${args.theme === 'dark' ? 'dark-theme' : ''}" role="status" aria-live="polite" aria-label="로딩 중">
    <h3>Basic Skeletons</h3>
    <div class="skeleton text skeleton-${args.animation}"></div>
    <div class="skeleton circular skeleton-${args.animation}"></div>
    <div class="skeleton rectangular skeleton-${args.animation}"></div>
    <div class="skeleton rounded skeleton-${args.animation}"></div>
</div>
`;
Basic.args = {
    theme: 'light',
    animation: 'wave',
    animationSpeed: 1.5
};
Basic.parameters = {
    docs: {
        description: {
            story: '기본적인 스켈레톤 컴포넌트들입니다. text, circular, rectangular, rounded 형태를 제공합니다.'
        },
        source: {
            code: `
// html
${Basic(Basic.args)}
            `
        }
    }
};

// 카드 스켈레톤
export const Card = (args) => `<style>
    :root {
        --animation-duration: ${args.animationSpeed}s;
    }
</style>
<div class="skeleton-section ${args.theme === 'dark' ? 'dark-theme' : ''}" role="status" aria-live="polite" aria-label="로딩 중">
    <div class="skeleton-card">
        <div class="skeleton rectangular skeleton-${args.animation}"></div>
        <div class="skeleton-card-content">
            <div class="skeleton text skeleton-${args.animation}"></div>
            <div class="skeleton text skeleton-${args.animation}" style="width: 60%"></div>
        </div>
    </div>
</div>
`;
Card.args = {
    theme: 'light',
    animation: 'wave',
    animationSpeed: 1.5
};
Card.parameters = {
    docs: {
        description: {
            story: '카드 형태의 스켈레톤 컴포넌트입니다. 이미지와 텍스트 영역을 포함합니다.'
        },
        source: {
            code: `
// html
${Card(Card.args)}
            `
        }
    }
};

// 프로필 스켈레톤
export const Profile = (args) => `<style>
    :root {
        --animation-duration: ${args.animationSpeed}s;
    }
</style>
<div class="skeleton-section ${args.theme === 'dark' ? 'dark-theme' : ''}" role="status" aria-live="polite" aria-label="로딩 중">
    <div class="skeleton-profile">
        <div class="skeleton circular skeleton-${args.animation}"></div>
        <div class="skeleton-profile-content">
            <div class="skeleton text skeleton-${args.animation}"></div>
            <div class="skeleton text skeleton-${args.animation}" style="width: 60%"></div>
        </div>
    </div>
</div>
`;
Profile.args = {
    theme: 'light',
    animation: 'wave',
    animationSpeed: 1.5
};
Profile.parameters = {
    docs: {
        description: {
            story: '프로필 형태의 스켈레톤 컴포넌트입니다. 프로필 이미지와 사용자 정보를 표시합니다.'
        },
        source: {
            code: `
// html
${Profile(Profile.args)}
            `
        }
    }
};

// 미디어 스켈레톤
export const Media = (args) => `<style>
    :root {
        --animation-duration: ${args.animationSpeed}s;
    }
</style>
<div class="skeleton-section ${args.theme === 'dark' ? 'dark-theme' : ''}" role="status" aria-live="polite" aria-label="로딩 중">
    <div class="skeleton-media">
        <div class="skeleton-media-header">
            <div class="skeleton-media-avatar">
                <div class="skeleton circular skeleton-${args.animation}"></div>
            </div>
            <div class="skeleton-media-content">
                <div class="skeleton text skeleton-${args.animation} skeleton-media-title""></div>
                <div class="skeleton text skeleton-${args.animation}" style="width: 60%;"></div>
            </div>
        </div>
        <div class="skeleton rectangular skeleton-${args.animation}"></div>
        <div class="skeleton-media-body">
            <div class="skeleton text skeleton-${args.animation}"></div>
            <div class="skeleton text skeleton-${args.animation}" style="width: 60%"></div>
            <div class="skeleton text skeleton-${args.animation}" style="width: 40%"></div>
        </div>
    </div>
</div>
`;
Media.args = {
    theme: 'light',
    animation: 'wave',
    animationSpeed: 1.5
};
Media.parameters = {
    docs: {
        description: {
            story: '미디어 형태의 스켈레톤 컴포넌트입니다. 헤더, 이미지, 본문 영역을 포함합니다.'
        },
        source: {
            code: `
// html
${Media(Media.args)}
            `
        }
    }
};

// Media 컴포넌트를 활용한 로딩 토글 스토리
export const MediaWithToggle = (args) => {
    const container = document.createElement('div');
    container.className = `skeleton-section ${args.theme === 'dark' ? 'dark-theme' : ''}`;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-label', '게시글 로딩 중');
    
    // 토글 버튼 생성
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.textContent = 'Toggle Loading';

    // 스켈레톤 컨테이너
    const skeletonContainer = document.createElement('div');
    skeletonContainer.className = 'skeleton-container';
    skeletonContainer.innerHTML = Media(args);
    
    // 실제 데이터 컨테이너
    const realDataContainer = document.createElement('div');
    realDataContainer.className = 'real-data-container';
    realDataContainer.style.display = 'none';
    
    // 실제 데이터 내용
    realDataContainer.innerHTML = `
        <div class="skeleton-media">
            <div class="skeleton-media-header">
                <div class="skeleton-media-avatar">
                    <img src="https://picsum.photos/40/40" alt="프로필 이미지" style="width: 40px; height: 40px; border-radius: 50%;" />
                </div>
                <div class="skeleton-media-content">
                    <h2 class="skeleton-media-title">실제 데이터 제목</h2>
                    <p>실제 데이터 설명입니다.</p>
                </div>
            </div>
            <img src="https://picsum.photos/345/190" alt="미디어 이미지" style="width: 100%; height: auto;" />
            <div class="skeleton-media-body">
                <p>실제 데이터 본문 내용입니다.</p>
                <p>실제 데이터 본문 내용입니다.</p>
                <p>실제 데이터 본문 내용입니다.</p>
            </div>
        </div>
    `;
    
    // 토글 버튼 클릭 이벤트
    toggleButton.addEventListener('click', () => {
        const isSkeletonVisible = skeletonContainer.style.display !== 'none';
        
        if (isSkeletonVisible) {
            skeletonContainer.style.display = 'none';
            container.removeAttribute('role');
            container.removeAttribute('aria-live');
            container.removeAttribute('aria-label');
            realDataContainer.style.display = 'block';
            toggleButton.textContent = 'Show Loading';
        } else {
            skeletonContainer.style.display = 'block';
            container.setAttribute('role', 'status');
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-label', '게시글 로딩 중');
            realDataContainer.style.display = 'none';
            toggleButton.textContent = 'Show Data';
        }
    });
    
    container.appendChild(toggleButton);
    container.appendChild(skeletonContainer);
    container.appendChild(realDataContainer);
    
    return container;
};

MediaWithToggle.args = {
    theme: 'light',
    animation: 'wave',
    animationSpeed: 1.5
};

MediaWithToggle.parameters = {
    docs: {
        description: {
            story: 'Media 컴포넌트를 활용한 로딩 토글 스토리입니다. 버튼을 클릭하여 로딩 상태와 실제 데이터를 전환할 수 있습니다. 스크린 리더 사용자를 위한 접근성이 적용되어 있습니다.'
        },
        source: {
            code: `
// js
const container = document.createElement('div');
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Show Data';

// 스켈레톤 컨테이너 (로딩 중)
const skeletonContainer = document.createElement('div');
skeletonContainer.setAttribute('role', 'status');
skeletonContainer.setAttribute('aria-live', 'polite');
skeletonContainer.setAttribute('aria-label', '게시글 로딩 중');
skeletonContainer.innerHTML = Media({theme: 'light', animation: 'wave', animationSpeed: 1.5});

// 실제 데이터
const realData = \`
    <div class="skeleton-media">
        <div class="skeleton-media-header">
            <div class="skeleton-media-avatar">
                <img src="https://picsum.photos/40/40" alt="프로필 이미지" />
            </div>
            <div class="skeleton-media-content">
                <h2 class="skeleton-media-title">실제 데이터 제목</h2>
                <p>실제 데이터 설명입니다.</p>
            </div>
        </div>
        <img src="https://picsum.photos/345/190" alt="미디어 이미지" />
        <div class="skeleton-media-body">
            <p>실제 데이터 본문 내용입니다.</p>
            <p>실제 데이터 본문 내용입니다.</p>
            <p>실제 데이터 본문 내용입니다.</p>
        </div>
    </div>
\`;

const realDataContainer = document.createElement('div');
realDataContainer.style.display = 'none';
realDataContainer.innerHTML = realData;

// 토글 이벤트 처리
toggleButton.addEventListener('click', () => {
    const isSkeletonVisible = skeletonContainer.style.display !== 'none';
    if (isSkeletonVisible) {
        skeletonContainer.style.display = 'none';
        skeletonContainer.removeAttribute('role');
        skeletonContainer.removeAttribute('aria-live');
        skeletonContainer.removeAttribute('aria-label');
        realDataContainer.style.display = 'block';
    } else {
        skeletonContainer.style.display = 'block';
        skeletonContainer.setAttribute('role', 'status');
        skeletonContainer.setAttribute('aria-live', 'polite');
        skeletonContainer.setAttribute('aria-label', '게시글 로딩 중');
        realDataContainer.style.display = 'none';
    }
});

container.appendChild(toggleButton);
container.appendChild(skeletonContainer);
container.appendChild(realDataContainer);
            `
        }
    }
};