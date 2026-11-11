# OOD Detection — WEEK 02 웹 발표자료

개별 파일 구성: `index.html` / `styles.css` / `slides.js` / `assets/`.

## 사용
- 동일한 폴더 구조로 저장하고 `index.html`을 Chrome 또는 Edge에서 실행하세요.
- GitHub Pages에 올리는 경우 `ood-research-presentation/week2/` 아래에 이 폴더의 내용물을 넣으면 됩니다. 현재 자동 연결이나 푸시는 하지 않았습니다.
- 필요 이미지 두 장은 ZIP 내부 `assets/id_airplane_tank.jpg`, `assets/ood_airplane_tank.jpg`입니다. 이번 대화에서 사용자가 제공한 실제 실험 사례 이미지입니다.
- 화살표 키(←/→)로 슬라이드 이동, `N`으로 발표자 메모, `F`로 전체화면.
- 각 슬라이드의 대본은 `index.html`의 `data-notes` 속성에서 수정할 수 있습니다.

## 내용
17장: 표지, 목차, 프로젝트 리마인드, OOD 정의, 이번 주 비교 목표, Logit, Softmax, MSP, Energy, 실험 설계, 성능 비교, 판단 불일치, ID/OOD 사례, Logit 분석, 교수님 피드백·연구 방향, 다음 주, 감사합니다.

## 주의
- 실험 수치는 Seed 42·43에서 관찰한 결과이며, Seed 44는 다음 주 계획에만 포함했습니다.
- FPR95는 ROC상 ID TPR=95% 기준으로 측정됩니다. 판단 불일치 사례는 ID Validation 기반 별도 고정 임계값을 사용합니다.
- Energy는 본 구현에서 원 논문의 음수 Energy 대신 부호 반전된 LogSumExp 점수(높을수록 ID)를 사용합니다.
- 실제 비행기/탱크 사례는 점수 함수 차이를 설명하는 사례이며 전체 데이터에 대한 인과적 증거는 아닙니다.
- 브라우저 네이티브 MathML로 분수, 첨자, 시그마를 렌더링하며 외부 CDN이 필요 없습니다.
