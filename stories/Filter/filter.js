export class Filter {
  constructor(options = {}) {
    const {
      filters = [],
      onFilter = () => {},
      onReset = () => {}
    } = options;

    this.filters = filters;
    this.onFilter = onFilter;
    this.onReset = onReset;
    this.selectedFilters = new Map();

    this.element = this.createFilterElement();
    this.init();
  }

  createFilterElement() {
    const container = document.createElement('div');
    container.className = 'filter-container';

    // 모바일용 필터 열기 버튼(아이콘)
    const openBtn = document.createElement('button');
    openBtn.className = 'filter-open-btn';
    openBtn.setAttribute('aria-label', 'Open filter');
    openBtn.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="#222" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    container.appendChild(openBtn);

    // 필터 섹션
    const filterSection = document.createElement('section');
    filterSection.className = 'filter-section';

    // 필터 헤더
    const filterHeader = document.createElement('div');
    filterHeader.className = 'filter-header';
    filterHeader.innerHTML = `
      <span class="filter-header__title" role="button">
        <svg class="icon icon--open" viewBox="0 0 24 24" width="24" height="24">
          <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"/>
        </svg>
        <svg class="icon icon--close" viewBox="0 0 24 24" width="24" height="24">
          <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"/>
        </svg>
        Filter
      </span>
    `;

    // 필터 푸터 추가
    const filterFooter = document.createElement('div');
    filterFooter.className = 'filter-footer';
    filterFooter.innerHTML = `
      <div class="filter-footer__buttons">
        <a href="javascript:void(0);" class="filter-footer__result" role="button">
          <p class="filter-footer__result-text--mobile">View results (<span class="filter-footer__result-count">0</span>)</p>
        </a>
        <button class="filter-footer__reset" role="button">
          <span class="pc">Reset</span>
          <span class="mo">Reset</span>
        </button>
      </div>
    `;

    // 필터 컨텐츠
    const filterContents = document.createElement('div');
    filterContents.className = 'filter-contents';

    // 모바일용 타이틀
    const mobileTitle = document.createElement('div');
    mobileTitle.className = 'filter-mobile-title';
    mobileTitle.innerHTML = `
      <h2 class="filter-mobile-title__title">Filter</h2>
      <a href="javascript:void(0);" class="filter-mobile-title__close" role="button">
        <span class="hidden">close</span>
        <svg class="icon" viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
        </svg>
      </a>
    `;

    // 필터 리스트
    const filterList = document.createElement('div');
    filterList.className = 'filter-list';

    // 각 필터 카테고리 생성
    this.filters.forEach((category, index) => {
      const filterItem = this.createFilterCategory(category, index);
      filterList.appendChild(filterItem);
    });

    filterContents.appendChild(mobileTitle);
    filterContents.appendChild(filterList);
    filterSection.appendChild(filterHeader);
    filterSection.appendChild(filterContents);
    filterSection.appendChild(filterFooter);

    // 오버레이 추가
    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    container.appendChild(overlay);

    // 결과 영역
    const resultSection = document.createElement('section');
    resultSection.className = 'result-section';
    resultSection.innerHTML = `
      <div class="result-header">
        <h2 class="result-header__title">Results</h2>
        <div class="result-header__count">Showing <span class="result-header__count-number">0</span> results</div>
      </div>
      <div class="result-contents">
        <div class="result-list">
          <!-- 결과 아이템들이 여기에 동적으로 추가됩니다 -->
        </div>
      </div>
    `;

    container.appendChild(filterSection);
    container.appendChild(resultSection);

    // 버튼, 섹션, 오버레이를 this에 저장
    this._openBtn = openBtn;
    this._filterSection = filterSection;
    this._overlay = overlay;

    return container;
  }

  createFilterCategory(category, index) {
    const filterItem = document.createElement('div');
    filterItem.className = 'filter-list';

    const title = document.createElement('h2');
    title.className = 'filter-item-title';
    title.innerHTML = `
      <a href="javascript:void(0);" class="filter-item-title__anchor" role="button">
        ${category.title}
        <span class="filter-item-title__toggle">
          <span class="hidden">Collapse</span>
          <svg class="icon icon--close" viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 10l5 5 5-5z" fill="currentColor"/>
          </svg>
          <svg class="icon icon--open" viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 14l5-5 5 5z" fill="currentColor"/>
          </svg>
        </span>
      </a>
    `;

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'filter-options';
    fieldset.innerHTML = `<legend>${category.title}</legend>`;

    // All 옵션 추가
    const allOption = this.createRadioOption(category.id, 'all', 'All', true);
    fieldset.appendChild(allOption);

    // 각 필터 옵션 추가
    category.options.forEach(option => {
      const radioOption = this.createRadioOption(category.id, option.value, option.label);
      fieldset.appendChild(radioOption);
    });

    filterItem.appendChild(title);
    filterItem.appendChild(fieldset);

    return filterItem;
  }

  createRadioOption(categoryId, value, label, isAll = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'filter-option';
    wrapper.innerHTML = `
      <div class="radio-v3">
        <input class="radio-v3__input" type="radio" name="select-${categoryId}" id="${categoryId}-${value}" value="${value}">
        <label class="radio-v3__label" for="${categoryId}-${value}">
          <span class="radio-v3__label-box-wrap">
            <span class="radio-v3__label-box"></span>
          </span>
          <span class="radio-v3__label-text">${label}</span>
        </label>
      </div>
    `;

    const input = wrapper.querySelector('input');
    if (isAll) {
      input.checked = true;
      this.selectedFilters.set(categoryId, value);
    }

    input.addEventListener('change', () => {
      if (isAll) {
        this.handleAllSelection(categoryId, value);
      } else {
        this.handleOptionSelection(categoryId, value);
      }
    });

    return wrapper;
  }

  handleAllSelection(categoryId, value) {
    const inputs = this.element.querySelectorAll(`input[name="select-${categoryId}"]`);
    inputs.forEach(input => {
      input.checked = input.value === value;
    });

    this.selectedFilters.set(categoryId, value);
    this.updateResults();
    this.onFilter(this.getSelectedFilters());
  }

  handleOptionSelection(categoryId, value) {
    const allInput = this.element.querySelector(`input[name="select-${categoryId}"][value="all"]`);
    if (allInput) {
      allInput.checked = false;
    }

    const selectedInput = this.element.querySelector(`input[name="select-${categoryId}"][value="${value}"]`);
    if (selectedInput) {
      selectedInput.checked = true;
    }

    this.selectedFilters.set(categoryId, value);
    this.updateResults();
    this.onFilter(this.getSelectedFilters());
  }

  updateResults() {
    const resultCount = this.element.querySelector('.result-header__count-number');
    const resultList = this.element.querySelector('.result-list');
    const selectedFilters = this.getSelectedFilters();
    
    // 선택된 필터 수 업데이트
    const totalSelected = Object.keys(selectedFilters).length;
    resultCount.textContent = totalSelected;

    // 결과 리스트 업데이트 (예시)
    resultList.innerHTML = `
      <div class="result-item">
        <h3 class="result-item__title">Selected Filters:</h3>
        <ul class="result-item__list">
          ${Object.entries(selectedFilters).map(([category, value]) => `
            <li class="result-item__list-item">
              ${this.filters.find(f => f.id === category)?.title || category}: ${value}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  init() {
    // 아코디언 토글 이벤트
    const anchors = this.element.querySelectorAll('.filter-item-title__anchor');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const item = anchor.closest('.filter-list');
        item.classList.toggle('is-open');
      });
    });

    // 모바일 필터 열기 버튼
    this._openBtn.addEventListener('click', () => {
      this._filterSection.classList.add('is-show');
      this._overlay.style.display = 'block';
    });

    // 모바일 닫기 버튼
    const closeButton = this.element.querySelector('.filter-mobile-title__close');
    closeButton.addEventListener('click', () => {
      this._filterSection.classList.remove('is-show');
      this._overlay.style.display = 'none';
    });

    // 오버레이 클릭 시 닫기
    this._overlay.addEventListener('click', () => {
      this._filterSection.classList.remove('is-show');
      this._overlay.style.display = 'none';
    });

    // 필터 푸터 버튼들 이벤트 추가 (이벤트 위임 사용)
    const filterFooter = this._filterSection.querySelector('.filter-footer');
    console.log('Filter Footer:', filterFooter); // 디버깅

    if (filterFooter) {
      filterFooter.addEventListener('click', (e) => {
        // 결과 버튼 클릭
        if (e.target.closest('.filter-footer__result')) {
          console.log('Result Button clicked'); // 디버깅
          e.preventDefault();
          this._filterSection.classList.remove('is-show');
          this._overlay.style.display = 'none';
        }
        
        // 리셋 버튼 클릭
        if (e.target.closest('.filter-footer__reset')) {
          console.log('Reset Button clicked'); // 디버깅
          // 각 카테고리별로 'all' 옵션 선택
          this.filters.forEach(filter => {
            const allInput = this._filterSection.querySelector(`input[name="select-${filter.id}"][value="all"]`);
            if (allInput) {
              allInput.checked = true;
              this.handleAllSelection(filter.id, 'all');
            }
          });

          // 결과 업데이트
          this.updateResults();
          this.onReset();
        }
      });
    }
  }

  getSelectedFilters() {
    return Object.fromEntries(this.selectedFilters);
  }
} 