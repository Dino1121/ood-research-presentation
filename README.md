# Research Exploration — OOD Detection

**주차별 발표자료 홈페이지 + 웹 슬라이드** 구조의 별도 정적 웹사이트입니다.

- **홈페이지:** `index.html`
- **WEEK 01 발표:** `week1/index.html` — OOD Detection Survey 학습 및 향후 구현 계획 (12장)
- **스타일:** `styles.css`, `week1/slides.css`
- **슬라이드 동작:** `week1/slides.js` (외부 프레임워크 의존성 없이 작동)
- **원본 논문 Figure 1(a):** `assets/survey_taxonomy.png` (발표 목적의 인용, 슬라이드에 출처 기재)

## 로컬 실행

`index.html` 파일을 브라우저에서 열거나 폴더에서 다음 명령어를 실행합니다.

```bash
python -m http.server 8000
```

이후 `http://localhost:8000/` 접속.

## 발표 시 단축키

- `←` / `→`: 이전 / 다음 슬라이드
- `Home` / `End`: 처음 / 마지막 슬라이드
- `F`: 전체 화면
- `N`: 발표 메모 열기/닫기
- 슬라이드 오른쪽 아래 컨트롤로 클릭 이동 가능
- URL의 `#/0`, `#/1` 등의 해시로 페이지 위치 유지

## GitHub Pages 배포

1. 별도 **공개 Repository**(예: `ood-research-presentation`)를 생성합니다.
2. 이 폴더의 **내용물**(index.html, styles.css, assets/, week1/, README.md)을 저장소 루트에 업로드합니다.
3. 저장소 **Settings → Pages → Build and deployment → Deploy from a branch**에서 `main` / `/(root)`를 선택합니다.
4. 배포 후 URL은 `https://Dino1121.github.io/<repository-name>/` 형식입니다.


