const CURRICULUM = Object.freeze({version:2,levels:[{name:'첫걸음',goal:'화면·입력·데이터·상태를 연결하기'},{name:'기초 확장',goal:'늘어난 데이터와 예상 밖의 입력 다루기'},{name:'연결과 배포',goal:'서버·DB·권한을 연결하고 문제 확인·복구하기'},{name:'실전 완성',goal:'내 아이디어를 구현하고 직접 써서 개선하기'}],historyKey:'project-pinball:curriculum4:history:v1',collectionKey:'project-pinball:curriculum4:collection:v1',legacyHistoryKey:'project-pinball:roster27:v1',legacyCollectionKey:'project-pinball:collection:v1'});
const PROJECTS = [
  {
    "id": "p01",
    "title": "나만의 프로필 카드",
    "summary": "소개·사진·링크가 담긴 반응형 페이지를 만들고 직접 동작을 바꿔봐요.",
    "level": 0,
    "concepts": "HTML, CSS, 링크, 반응형",
    "time": "1~2시간",
    "prerequisites": [],
    "completionCriteria": [
      "소개·사진·링크를 HTML로 배치하고 CSS로 꾸미기",
      "화면 폭을 바꾸면 배치가 자연스럽게 바뀌는지 확인",
      "소개 접기/펼치기처럼 동작 하나를 직접 바꿔 확인"
    ],
    "challenge": "소개 접기/펼치기 버튼을 추가하고 키보드로도 눌러보기",
    "question": "내용의 구조와 디자인은 각각 어느 코드가 담당하나요?",
    "learning": [
      {
        "feature": "소개·사진·링크 배치",
        "technology": "HTML 시맨틱 태그 · CSS Flexbox",
        "knowledge": "문서 구조와 시각 디자인을 나누는 방법"
      },
      {
        "feature": "좁은 화면과 소개 토글",
        "technology": "미디어 쿼리 · 버튼 클릭 이벤트",
        "knowledge": "화면 폭과 사용자 행동에 따라 화면을 바꾸는 방법"
      }
    ],
    "order": 1,
    "features": "소개·사진·링크를 HTML로 배치하고 CSS로 꾸미기·화면 폭을 바꾸면 배치가 자연스럽게 바뀌는지 확인·소개 접기/펼치기처럼 동작 하나를 직접 바꿔 확인",
    "quoteId": "q01"
  },
  {
    "id": "p06",
    "title": "글자 수 세기",
    "summary": "입력한 글의 길이를 실시간으로 계산하고 계산 기준을 직접 설명해봐요.",
    "level": 0,
    "concepts": "문자열, 입력 이벤트, 파생값",
    "time": "1~2시간",
    "prerequisites": [],
    "completionCriteria": [
      "입력할 때마다 글자 수를 계산하고 초기화하기",
      "공백 포함/제외를 전환하고 빈 입력도 확인",
      "줄바꿈과 이모지를 어떤 기준으로 세는지 설명"
    ],
    "challenge": "최대 글자 수를 정하고 초과했을 때 안내하기",
    "question": "공백과 줄바꿈, 이모지는 몇 글자로 계산되며 왜 그렇게 정했나요?",
    "learning": [
      {
        "feature": "입력과 동시에 길이 표시",
        "technology": "textarea · input 이벤트 · 문자열",
        "knowledge": "입력 변화로 계산 결과를 갱신하는 흐름"
      },
      {
        "feature": "계산 기준 전환",
        "technology": "문자열 처리 · 조건문",
        "knowledge": "원본 입력과 계산으로 얻은 값을 구분하는 방법"
      }
    ],
    "order": 2,
    "features": "입력할 때마다 글자 수를 계산하고 초기화하기·공백 포함/제외를 전환하고 빈 입력도 확인·줄바꿈과 이모지를 어떤 기준으로 세는지 설명",
    "quoteId": "q03"
  },
  {
    "id": "p02",
    "title": "다크 모드 스위치",
    "summary": "테마를 바꾸고 선택을 저장하며 첫 방문에서도 자연스럽게 작동하게 만들어요.",
    "level": 0,
    "concepts": "CSS 변수, 이벤트, 저장소, 기본값",
    "time": "1~2시간",
    "prerequisites": [],
    "completionCriteria": [
      "버튼으로 밝은 테마와 어두운 테마 전환",
      "새로고침 후 선택한 테마 복원",
      "저장값이 없거나 잘못되어도 기본 테마로 작동"
    ],
    "challenge": "버튼에 현재 테마 이름과 다음에 바뀔 테마 표시",
    "question": "저장값이 없는 첫 방문에서는 어떤 테마를 보여주나요?",
    "learning": [
      {
        "feature": "테마 색상 일괄 전환",
        "technology": "CSS 변수 · JavaScript 이벤트",
        "knowledge": "동작과 스타일을 연결하면서 중복을 줄이는 방법"
      },
      {
        "feature": "설정 저장과 기본값",
        "technology": "localStorage · 값 검증",
        "knowledge": "저장된 값이 없는 경우까지 생각하는 방법"
      }
    ],
    "order": 3,
    "features": "버튼으로 밝은 테마와 어두운 테마 전환·새로고침 후 선택한 테마 복원·저장값이 없거나 잘못되어도 기본 테마로 작동",
    "quoteId": "q20"
  },
  {
    "id": "p03",
    "title": "랜덤 메뉴 추천기",
    "summary": "조건에 맞는 메뉴 중 하나를 추천하고 후보가 없을 때도 안내해요.",
    "level": 0,
    "concepts": "배열, 난수, 조건문, 필터",
    "time": "1~2시간",
    "prerequisites": [],
    "completionCriteria": [
      "카테고리 선택 후 해당 메뉴 중 무작위 추천",
      "후보가 0개·1개일 때도 올바르게 표시",
      "메뉴 데이터를 직접 추가하고 결과 확인"
    ],
    "challenge": "맵기 조건을 추가하고 후보 0개 안내도 바꾸기",
    "question": "무작위 숫자가 어떻게 후보 하나를 가리키나요?",
    "learning": [
      {
        "feature": "메뉴 후보 추첨",
        "technology": "배열 · Math.random · 인덱스",
        "knowledge": "여러 데이터에서 한 항목을 고르는 원리"
      },
      {
        "feature": "카테고리와 빈 후보",
        "technology": "Array.filter · 조건부 표시",
        "knowledge": "조건을 적용한 뒤 예외 상황을 처리하는 방법"
      }
    ],
    "order": 4,
    "features": "카테고리 선택 후 해당 메뉴 중 무작위 추천·후보가 0개·1개일 때도 올바르게 표시·메뉴 데이터를 직접 추가하고 결과 확인",
    "quoteId": "q02"
  },
  {
    "id": "p07",
    "title": "용돈 계산기",
    "summary": "수입·지출을 기록해 잔액을 계산하고 잘못된 금액 입력을 다뤄요.",
    "level": 0,
    "concepts": "숫자 변환, 검증, 합계, 객체 배열",
    "time": "2~4시간",
    "prerequisites": [],
    "completionCriteria": [
      "수입·지출 내역 추가·삭제와 잔액 계산",
      "빈 값·숫자가 아닌 값·잘못된 금액 안내",
      "내역 하나를 바꿔 합계가 맞는지 직접 검산"
    ],
    "challenge": "내역에 분류를 추가하고 분류별로 목록 좁히기",
    "question": "입력값을 숫자로 바꾸지 않고 더하면 어떤 문제가 생기나요?",
    "learning": [
      {
        "feature": "금액 입력과 잔액 표시",
        "technology": "HTML form · Number · reduce",
        "knowledge": "문자 입력을 숫자로 바꿔 집계하는 방법"
      },
      {
        "feature": "잘못된 입력 차단",
        "technology": "조건문 · 입력 검증",
        "knowledge": "사용자 입력을 그대로 믿지 않는 습관"
      }
    ],
    "order": 5,
    "features": "수입·지출 내역 추가·삭제와 잔액 계산·빈 값·숫자가 아닌 값·잘못된 금액 안내·내역 하나를 바꿔 합계가 맞는지 직접 검산",
    "quoteId": "q19"
  },
  {
    "id": "p05",
    "title": "나만의 할 일 목록",
    "summary": "할 일을 추가·완료·삭제하고 ID로 항목을 구분하며 저장해요.",
    "level": 0,
    "concepts": "배열, 객체, ID, 입력, 저장소",
    "time": "2~4시간",
    "prerequisites": [],
    "completionCriteria": [
      "할 일 추가·완료·삭제가 각각 정확히 동작",
      "새로고침 후 데이터와 완료 상태 유지",
      "같은 이름의 항목 두 개를 ID로 구분해 수정"
    ],
    "challenge": "완료한 일만 보기 버튼을 추가하고 원본 데이터 확인",
    "question": "제목이 같은 두 항목을 안전하게 구분하려면 무엇이 필요한가요?",
    "learning": [
      {
        "feature": "목록과 완료 상태",
        "technology": "객체 배열 · 고유 ID · DOM 갱신",
        "knowledge": "데이터의 변경을 화면과 연결하는 방법"
      },
      {
        "feature": "목록 저장·복원",
        "technology": "JSON · localStorage",
        "knowledge": "데이터를 문자열로 저장하고 다시 읽는 방법"
      }
    ],
    "order": 6,
    "features": "할 일 추가·완료·삭제가 각각 정확히 동작·새로고침 후 데이터와 완료 상태 유지·같은 이름의 항목 두 개를 ID로 구분해 수정",
    "quoteId": "q22"
  },
  {
    "id": "p04",
    "title": "집중 타이머",
    "summary": "시간을 정확하게 계산하고 시작 연타와 정지·재개 상황을 다뤄요.",
    "level": 0,
    "concepts": "타이머, 상태, 실제 경과 시간, 중복 방지",
    "time": "2~3시간",
    "prerequisites": [],
    "completionCriteria": [
      "시작·정지·재개·초기화의 동작을 구분",
      "시작 버튼을 연타해도 타이머가 중복 실행되지 않음",
      "정지 후 재개와 지연된 화면 갱신에서도 남은 시간 확인"
    ],
    "challenge": "정지한 시간을 제외한 실제 경과 시간 기준으로 계산하기",
    "question": "화면 갱신 횟수만 세면 시간이 틀어질 수 있는 이유는 무엇인가요?",
    "learning": [
      {
        "feature": "정확한 남은 시간 표시",
        "technology": "현재 시각 · 목표 시각 · 타이머",
        "knowledge": "화면 갱신과 실제 시간 계산을 분리하는 방법"
      },
      {
        "feature": "연타 방지와 정지·재개",
        "technology": "상태 변수 · 타이머 정리",
        "knowledge": "중복 실행을 막고 정지 시간을 누적 관리하는 방법"
      }
    ],
    "order": 7,
    "features": "시작·정지·재개·초기화의 동작을 구분·시작 버튼을 연타해도 타이머가 중복 실행되지 않음·정지 후 재개와 지연된 화면 갱신에서도 남은 시간 확인",
    "quoteId": "q04"
  },
  {
    "id": "p08",
    "title": "OX 퀴즈 게임",
    "summary": "문제·채점·결과 화면을 연결하고 빠른 연타에도 점수가 맞게 만들어요.",
    "level": 0,
    "concepts": "객체 배열, 조건문, 화면 상태, 입력 잠금",
    "time": "2~4시간",
    "prerequisites": [],
    "completionCriteria": [
      "문제 진행·채점·최종 결과 표시",
      "같은 문제에서 연타해도 한 번만 채점",
      "재시작 시 문제 위치와 점수, 입력 상태 초기화"
    ],
    "challenge": "정답 설명을 확인한 뒤 다음 문제로 넘어가게 만들기",
    "question": "한 문제의 답이 두 번 처리되지 않게 하려면 어떤 상태가 필요한가요?",
    "learning": [
      {
        "feature": "문제와 결과 화면",
        "technology": "객체 배열 · 화면 상태 · 조건문",
        "knowledge": "데이터에 맞춰 여러 화면을 연결하는 방법"
      },
      {
        "feature": "중복 채점 방지",
        "technology": "입력 잠금 · 상태 초기화",
        "knowledge": "사용자의 빠른 입력과 재시작 예외를 다루는 방법"
      }
    ],
    "order": 8,
    "features": "문제 진행·채점·최종 결과 표시·같은 문제에서 연타해도 한 번만 채점·재시작 시 문제 위치와 점수, 입력 상태 초기화",
    "quoteId": "q14"
  },
  {
    "id": "p14",
    "title": "이미지 미리보기",
    "summary": "파일을 업로드하지 않고 이미지와 정보를 확인하며 자원도 정리해요.",
    "level": 1,
    "concepts": "File 객체, 미리보기, MIME, 자원 정리",
    "time": "2~4시간",
    "prerequisites": [],
    "completionCriteria": [
      "선택한 이미지와 가로세로 크기·용량 표시",
      "잘못된 파일 유형과 취소 상황 안내",
      "파일을 교체하거나 화면을 닫을 때 미리보기 자원 정리"
    ],
    "challenge": "허용 용량을 정하고 초과한 파일은 안내만 표시",
    "question": "미리보기는 서버 업로드 없이 어떻게 가능하고, 사용한 URL은 왜 정리하나요?",
    "learning": [
      {
        "feature": "이미지와 파일 정보 표시",
        "technology": "File API · img · Object URL",
        "knowledge": "브라우저 안에서 파일과 메타데이터를 다루는 방법"
      },
      {
        "feature": "잘못된 파일·교체 처리",
        "technology": "MIME 검사 · revokeObjectURL",
        "knowledge": "입력을 검증하고 사용한 자원을 해제하는 방법"
      }
    ],
    "order": 9,
    "features": "선택한 이미지와 가로세로 크기·용량 표시·잘못된 파일 유형과 취소 상황 안내·파일을 교체하거나 화면을 닫을 때 미리보기 자원 정리",
    "quoteId": "q05"
  },
  {
    "id": "p09",
    "title": "북마크·읽기 자료 보관함",
    "summary": "링크 보관함과 읽기 자료를 합쳐 목록·상세·태그 검색을 만들어요.",
    "level": 1,
    "concepts": "CRUD, URL 검증, 태그, 목록·상세",
    "time": "4~6시간",
    "prerequisites": [],
    "completionCriteria": [
      "자료 추가·수정·삭제와 제목 검색",
      "태그 필터와 선택한 자료의 상세 보기",
      "잘못된 주소를 안내하고 새로고침 후 자료 유지"
    ],
    "challenge": "읽음/안 읽음 상태를 추가하고 태그와 함께 필터하기",
    "question": "목록에서 선택한 항목과 상세 화면의 자료는 어떻게 연결되나요?",
    "learning": [
      {
        "feature": "목록과 상세 자료 관리",
        "technology": "항목 ID · URL 검증 · CRUD",
        "knowledge": "자료를 구분해 수정하고 연결된 화면에 표시하는 방법"
      },
      {
        "feature": "검색·태그·저장",
        "technology": "배열 필터 · 데이터 모델 · localStorage",
        "knowledge": "원본 자료와 화면에 보이는 결과를 분리하는 방법"
      }
    ],
    "order": 10,
    "features": "자료 추가·수정·삭제와 제목 검색·태그 필터와 선택한 자료의 상세 보기·잘못된 주소를 안내하고 새로고침 후 자료 유지",
    "quoteId": "q10"
  },
  {
    "id": "p13",
    "title": "CSV 미리보기",
    "summary": "현실적인 CSV의 쉼표·따옴표·빈 셀을 처리해 표로 보여줘요.",
    "level": 1,
    "concepts": "파일 입력, CSV 파싱, 오류 처리, 표시 제한",
    "time": "3~5시간",
    "prerequisites": [],
    "completionCriteria": [
      "쉼표·따옴표·빈 셀이 포함된 CSV를 올바른 표로 표시",
      "잘못된 파일과 파싱 오류를 안내",
      "표시 행 수를 제한하고 실제 데이터와 비교"
    ],
    "challenge": "첫 행을 헤더로 사용할지 선택하는 기능 추가",
    "question": "CSV를 단순히 쉼표로 나누면 어떤 파일에서 결과가 틀리나요?",
    "learning": [
      {
        "feature": "파일을 행과 열로 읽기",
        "technology": "File API · CSV 파서 · HTML table",
        "knowledge": "파일의 텍스트를 구조화된 데이터로 해석하는 방법"
      },
      {
        "feature": "오류와 큰 파일 표시 제한",
        "technology": "try/catch · 행 제한",
        "knowledge": "읽기 실패와 화면에 보여줄 분량을 관리하는 방법"
      }
    ],
    "order": 11,
    "features": "쉼표·따옴표·빈 셀이 포함된 CSV를 올바른 표로 표시·잘못된 파일과 파싱 오류를 안내·표시 행 수를 제한하고 실제 데이터와 비교",
    "quoteId": "q21"
  },
  {
    "id": "p16",
    "title": "기억력 카드 게임",
    "summary": "카드를 섞고 짝을 찾으며 대기 중 입력과 재시작을 안정적으로 처리해요.",
    "level": 1,
    "concepts": "섞기, 게임 상태, 입력 잠금, 초기화",
    "time": "3~5시간",
    "prerequisites": [],
    "completionCriteria": [
      "카드 섞기·짝 판정·횟수·승리 표시",
      "두 장을 확인하는 동안 다른 카드를 뒤집지 못함",
      "재시작 시 지연 처리와 모든 카드 상태까지 초기화"
    ],
    "challenge": "판정 대기 중 재시작해도 이전 콜백이 새 게임을 바꾸지 않게 하기",
    "question": "새 게임을 시작한 뒤 예전 타이머가 실행되면 어떤 문제가 생기나요?",
    "learning": [
      {
        "feature": "짝 판정과 무작위 배치",
        "technology": "배열 섞기 · 카드 ID · 게임 상태",
        "knowledge": "게임 데이터와 판정 로직을 구분하는 방법"
      },
      {
        "feature": "대기와 완전한 재시작",
        "technology": "입력 잠금 · 타이머 정리",
        "knowledge": "지연된 동작이 새 상태를 망가뜨리지 않게 하는 방법"
      }
    ],
    "order": 12,
    "features": "카드 섞기·짝 판정·횟수·승리 표시·두 장을 확인하는 동안 다른 카드를 뒤집지 못함·재시작 시 지연 처리와 모든 카드 상태까지 초기화",
    "quoteId": "q13"
  },
  {
    "id": "p10",
    "title": "습관 체크 달력",
    "summary": "월을 이동하며 날짜별 습관을 기록하고 월말·연도 변경을 확인해요.",
    "level": 1,
    "concepts": "날짜, 달력 배치, 데이터 모델, 저장소",
    "time": "4~6시간",
    "prerequisites": [],
    "completionCriteria": [
      "날짜별 체크·월 이동·새로고침 후 저장 유지",
      "월말과 12월→1월 이동에서 날짜가 맞음",
      "윤년 2월 등 날짜 경계 사례 확인"
    ],
    "challenge": "선택한 달의 달성 일수와 비율 표시",
    "question": "화면에 보이는 날짜 문구와 저장하는 날짜 키를 왜 나누나요?",
    "learning": [
      {
        "feature": "월별 달력 만들기",
        "technology": "Date · CSS Grid · 날짜 키",
        "knowledge": "날짜를 데이터와 화면의 칸으로 표현하는 방법"
      },
      {
        "feature": "날짜 경계와 기록 유지",
        "technology": "월·연도 계산 · localStorage",
        "knowledge": "월말·윤년 같은 경계 조건을 검증하는 방법"
      }
    ],
    "order": 13,
    "features": "날짜별 체크·월 이동·새로고침 후 저장 유지·월말과 12월→1월 이동에서 날짜가 맞음·윤년 2월 등 날짜 경계 사례 확인",
    "quoteId": "q26"
  },
  {
    "id": "p12",
    "title": "지출 대시보드",
    "summary": "앞에서 만든 용돈 계산기를 확장해 월별·분류별 지출과 차트를 보여줘요.",
    "level": 1,
    "concepts": "기존 코드 읽기, 집계, 분류, 차트",
    "time": "4~6시간",
    "prerequisites": [
      "p07"
    ],
    "baseProjectId": "p07",
    "completionCriteria": [
      "기존 용돈 계산기의 데이터와 입력 기능을 이어서 사용",
      "월별·분류별 합계와 차트 표시",
      "기능 추가 후 기존 잔액 계산·수정·삭제도 정상인지 확인"
    ],
    "challenge": "지출이 가장 큰 분류를 강조하고 원본 내역과 검산",
    "question": "기존 기능을 유지하면서 집계 화면을 추가하려면 어떤 구조를 바꾸면 좋을까요?",
    "learning": [
      {
        "feature": "기존 앱에 통계 추가",
        "technology": "기존 객체 배열 · reduce · 날짜 필터",
        "knowledge": "이미 있는 구조를 읽고 필요한 부분을 확장하는 방법"
      },
      {
        "feature": "수치를 차트로 표현",
        "technology": "집계 데이터 · CSS 막대 또는 차트 도구",
        "knowledge": "원본 데이터와 통계, 시각화를 나누는 방법"
      }
    ],
    "order": 14,
    "features": "기존 용돈 계산기의 데이터와 입력 기능을 이어서 사용·월별·분류별 합계와 차트 표시·기능 추가 후 기존 잔액 계산·수정·삭제도 정상인지 확인",
    "quoteId": "q15"
  },
  {
    "id": "p15",
    "title": "드래그 칸반 보드",
    "summary": "카드를 수정하고 칸 사이로 이동시키며 드래그 외의 조작도 지원해요.",
    "level": 1,
    "concepts": "상태 구조, 이동 이벤트, 접근성, 저장소",
    "time": "4~6시간",
    "prerequisites": [],
    "completionCriteria": [
      "카드 추가·수정과 칸 사이 이동",
      "드래그와 버튼 이동이 같은 상태 변경을 수행",
      "새로고침 후 카드 내용과 위치 유지"
    ],
    "challenge": "완료 칸의 카드 수를 표시하고 키보드만으로 이동하기",
    "question": "화면의 카드 위치와 이동 결과를 결정하는 데이터는 무엇인가요?",
    "learning": [
      {
        "feature": "카드와 칸의 상태 설계",
        "technology": "카드 ID · 상태 객체 · 이동 이벤트",
        "knowledge": "화면 위치를 데이터로 표현하는 방법"
      },
      {
        "feature": "드래그·버튼·저장 연결",
        "technology": "드래그 이벤트 · HTML 버튼 · localStorage",
        "knowledge": "여러 입력 방식을 같은 로직으로 처리하는 방법"
      }
    ],
    "order": 15,
    "features": "카드 추가·수정과 칸 사이 이동·드래그와 버튼 이동이 같은 상태 변경을 수행·새로고침 후 카드 내용과 위치 유지",
    "quoteId": "q06"
  },
  {
    "id": "p18",
    "title": "GitHub 프로필 조회",
    "summary": "공개 API로 프로필을 검색하고 응답 상태에 따라 화면을 구분해요.",
    "level": 2,
    "concepts": "HTTP, fetch, JSON, 상태 코드, 호출 제한",
    "time": "3~5시간",
    "prerequisites": [],
    "completionCriteria": [
      "사용자 입력으로 API를 요청하고 프로필 정보 표시",
      "로딩·성공·없는 사용자·호출 제한·통신 실패를 구분",
      "빠르게 검색을 바꿔도 이전 응답이 최신 결과를 덮지 않음"
    ],
    "challenge": "느린 응답을 재현하고 마지막 검색 결과만 남기기",
    "question": "404 응답과 네트워크 요청 실패는 무엇이 다른가요?",
    "learning": [
      {
        "feature": "공개 API 요청과 화면 표시",
        "technology": "fetch · HTTP · JSON · async/await",
        "knowledge": "외부 서버의 응답 구조를 읽어 화면에 연결하는 방법"
      },
      {
        "feature": "실패 유형과 응답 순서",
        "technology": "상태 코드 · 요청 취소 또는 요청 ID",
        "knowledge": "통신 오류와 늦게 도착한 응답을 관리하는 방법"
      }
    ],
    "order": 16,
    "features": "사용자 입력으로 API를 요청하고 프로필 정보 표시·로딩·성공·없는 사용자·호출 제한·통신 실패를 구분·빠르게 검색을 바꿔도 이전 응답이 최신 결과를 덮지 않음",
    "quoteId": "q09"
  },
  {
    "id": "p17",
    "title": "서버를 거치는 날씨 앱",
    "summary": "브라우저 → 내 서버 → 외부 API 흐름으로 날씨를 조회하고 로그를 확인해요.",
    "level": 2,
    "concepts": "서버 API, 환경변수, 요청·응답, 로그, 단위",
    "time": "4~6시간",
    "prerequisites": [
      "p18"
    ],
    "completionCriteria": [
      "브라우저가 내 서버를 거쳐 날씨 API 결과를 표시",
      "API 설정을 환경변수로 관리하고 비밀 값은 브라우저·Git·로그에 노출하지 않음",
      "서버 요청·실패 로그를 확인하고 로딩·오류·단위 처리 검증"
    ],
    "challenge": "잘못된 도시와 서버 실패를 재현하고 로그로 원인 찾기",
    "question": "브라우저와 서버 중 어디에서 비밀 설정을 읽어야 하며, 응답에는 무엇을 담아야 하나요?",
    "learning": [
      {
        "feature": "서버를 거쳐 날씨 조회",
        "technology": "서버 API 라우트 · fetch · 외부 API",
        "knowledge": "클라이언트와 서버의 역할과 요청 경로를 구분하는 방법"
      },
      {
        "feature": "설정과 실패 원인 확인",
        "technology": "서버 환경변수 · .gitignore · 서버 로그",
        "knowledge": "비밀 값을 지키며 요청 실패의 위치를 찾는 방법"
      }
    ],
    "order": 17,
    "features": "브라우저가 내 서버를 거쳐 날씨 API 결과를 표시·API 설정을 환경변수로 관리하고 비밀 값은 브라우저·Git·로그에 노출하지 않음·서버 요청·실패 로그를 확인하고 로딩·오류·단위 처리 검증",
    "quoteId": "q27"
  },
  {
    "id": "p25",
    "quoteId": "q16",
    "title": "클라우드 메모 검색 앱",
    "summary": "메모를 서버 DB에 저장해 다른 브라우저에서도 같은 내용을 확인해요.",
    "level": 2,
    "concepts": "서버 DB, CRUD, 데이터 모델, 비동기, 오류 처리",
    "time": "5~8시간",
    "prerequisites": [
      "p17"
    ],
    "completionCriteria": [
      "서버 DB에서 메모 추가·조회·수정·삭제와 검색",
      "새로고침과 다른 브라우저에서 같은 데이터 확인",
      "저장 실패를 안내하고 성공한 뒤에만 저장 완료 표시"
    ],
    "challenge": "DB 연결 실패를 재현하고 입력한 메모가 사라지지 않게 하기",
    "question": "localStorage 저장과 서버 DB 저장은 데이터가 놓이는 위치가 어떻게 다른가요?",
    "learning": [
      {
        "feature": "메모 CRUD와 검색",
        "technology": "서버 API · DB 테이블 또는 컬렉션 · 항목 ID",
        "knowledge": "화면·서버·DB 사이에서 데이터가 이동하는 방법"
      },
      {
        "feature": "브라우저를 넘어 저장 유지",
        "technology": "비동기 요청 · 저장 결과 처리 · 오류 상태",
        "knowledge": "영속 저장과 실패 시 사용자 입력을 보존하는 방법"
      }
    ],
    "order": 18,
    "features": "서버 DB에서 메모 추가·조회·수정·삭제와 검색·새로고침과 다른 브라우저에서 같은 데이터 확인·저장 실패를 안내하고 성공한 뒤에만 저장 완료 표시"
  },
  {
    "id": "p26",
    "quoteId": "q07",
    "title": "나만의 메모 계정 만들기",
    "summary": "앞의 메모 앱에 로그인·로그아웃과 사용자별 데이터 접근 제한을 붙여요.",
    "level": 2,
    "concepts": "인증, 세션, 사용자 ID, 서버 권한 검사",
    "time": "5~8시간",
    "prerequisites": [
      "p25"
    ],
    "baseProjectId": "p25",
    "completionCriteria": [
      "기존 메모 앱에 로그인·로그아웃과 인증 상태 표시",
      "메모에 사용자 ID를 연결하고 서버 또는 DB 규칙에서 접근 검사",
      "두 계정으로 서로의 메모 조회·수정·삭제 요청이 차단되는지 검증"
    ],
    "challenge": "화면 숨기기를 넘어 다른 계정의 메모 ID로 직접 요청해 차단 확인",
    "question": "로그인 여부 확인과 해당 메모의 소유자 확인은 왜 서로 다른 검사인가요?",
    "learning": [
      {
        "feature": "계정과 세션 연결",
        "technology": "인증 서비스 · 세션 · 사용자 ID",
        "knowledge": "사용자가 누구인지 확인하고 앱 상태와 연결하는 방법"
      },
      {
        "feature": "사용자별 메모 접근 제한",
        "technology": "서버 권한 검사 또는 DB 접근 규칙",
        "knowledge": "화면 필터만으로 보호하지 않고 데이터 접근을 제한하는 방법"
      }
    ],
    "order": 19,
    "features": "기존 메모 앱에 로그인·로그아웃과 인증 상태 표시·메모에 사용자 ID를 연결하고 서버 또는 DB 규칙에서 접근 검사·두 계정으로 서로의 메모 조회·수정·삭제 요청이 차단되는지 검증"
  },
  {
    "id": "p27",
    "quoteId": "q11",
    "title": "기존 앱 버그 수리소",
    "summary": "앞에서 만든 앱의 오류를 재현하고 실패 테스트부터 만든 뒤 고쳐요.",
    "level": 2,
    "concepts": "기존 코드 읽기, 오류 재현, 실패 테스트, 디버깅, 회귀 검사",
    "time": "3~5시간",
    "prerequisites": [
      "p05"
    ],
    "baseProjectId": "p05",
    "completionCriteria": [
      "기존 앱 하나를 골라 재현 행동·문제·기대 결과를 작성",
      "수정 전 실패하는 자동 테스트를 만들고 원인 수정",
      "테스트 통과와 기존 다른 기능의 정상 동작 확인"
    ],
    "challenge": "버그 원인과 바꾼 코드, 다시 확인한 기능을 짧게 기록",
    "question": "어떤 행동에서 무엇이 잘못됐고, 수정 후에는 어떤 결과가 나와야 하나요?",
    "learning": [
      {
        "feature": "기존 오류를 재현·설명",
        "technology": "재현 절차 · 기존 코드 탐색 · 실패 테스트",
        "knowledge": "증상과 기대 결과를 구체적으로 정의하는 방법"
      },
      {
        "feature": "수정과 회귀 확인",
        "technology": "디버깅 · 단위 또는 통합 테스트 · Git 변경 비교",
        "knowledge": "작은 변경으로 고치고 다른 기능에 영향이 없는지 확인하는 방법"
      }
    ],
    "order": 20,
    "features": "기존 앱 하나를 골라 재현 행동·문제·기대 결과를 작성·수정 전 실패하는 자동 테스트를 만들고 원인 수정·테스트 통과와 기존 다른 기능의 정상 동작 확인"
  },
  {
    "id": "p24",
    "title": "프로젝트 전시관 배포",
    "summary": "작품 소개 사이트를 배포하고 수정·재배포·이전 버전 복구까지 연습해요.",
    "level": 2,
    "concepts": "Git, 빌드, 배포, 환경 설정, 로그, 복구",
    "time": "4~6시간",
    "prerequisites": [
      "p18",
      "p17",
      "p25",
      "p26",
      "p27"
    ],
    "completionCriteria": [
      "작품 소개·저장소 링크를 만들고 실제 주소에 배포",
      "환경 설정과 빌드·배포 로그를 확인한 뒤 수정·재배포",
      "이전 정상 버전으로 복구하고 동작 확인"
    ],
    "challenge": "작품 설명을 수정해 재배포한 뒤 이전 버전으로 되돌려보기",
    "question": "로컬 변경부터 공개 사이트 반영까지 어떤 단계가 있고, 실패하면 어디서 확인하나요?",
    "learning": [
      {
        "feature": "소개 사이트 배포",
        "technology": "HTML · CSS · Git 커밋 · 빌드 · 배포",
        "knowledge": "로컬 코드가 실제 접속 주소로 공개되는 흐름"
      },
      {
        "feature": "수정·재배포·복구",
        "technology": "환경 설정 · 배포 로그 · 이전 배포 버전",
        "knowledge": "변경을 추적하고 문제가 생겼을 때 정상 버전으로 돌아가는 방법"
      }
    ],
    "order": 21,
    "features": "작품 소개·저장소 링크를 만들고 실제 주소에 배포·환경 설정과 빌드·배포 로그를 확인한 뒤 수정·재배포·이전 정상 버전으로 복구하고 동작 확인",
    "quoteId": "q23"
  },
  {
    "id": "p28",
    "quoteId": "q08",
    "title": "내가 쓸 서비스 설계하기",
    "summary": "나만의 프로젝트 진행 보드를 주제로 문제·화면·데이터·완료 기준을 직접 정해요.",
    "level": 3,
    "concepts": "사용자, 문제 정의, MVP, 화면 설계, 데이터 모델, 인수 기준",
    "time": "2~4시간",
    "prerequisites": [
      "p24"
    ],
    "completionCriteria": [
      "누가 어떤 문제를 해결할 서비스인지 작성",
      "핵심 기능 3개와 화면·데이터 구조를 정리",
      "각 기능을 완료했다고 판단할 행동과 결과를 작성"
    ],
    "challenge": "추가·수정·삭제 / 준비·진행·완료 이동 / 프로젝트별 메모를 핵심 3개로 설계",
    "question": "누가 언제 쓰며, 어떤 행동을 할 수 있으면 첫 버전이 완성인가요?",
    "learning": [
      {
        "feature": "서비스 범위와 화면 설계",
        "technology": "사용자 시나리오 · 와이어프레임 · MVP",
        "knowledge": "막연한 아이디어를 작은 구현 범위로 줄이는 방법"
      },
      {
        "feature": "데이터와 완료 기준",
        "technology": "데이터 모델 · 권한 구분 · 인수 조건",
        "knowledge": "AI에게 맡길 작업과 직접 검증할 결과를 명확히 쓰는 방법"
      }
    ],
    "order": 22,
    "features": "누가 어떤 문제를 해결할 서비스인지 작성·핵심 기능 3개와 화면·데이터 구조를 정리·각 기능을 완료했다고 판단할 행동과 결과를 작성"
  },
  {
    "id": "p29",
    "quoteId": "q18",
    "title": "설계한 서비스 구현하기",
    "summary": "설계한 프로젝트 진행 보드에 핵심 기능·DB 저장·사용자별 권한을 연결해요.",
    "level": 3,
    "concepts": "서비스 통합, DB, 인증·권한, 상태 이동, 오류 처리, 테스트",
    "time": "8~12시간",
    "prerequisites": [
      "p28"
    ],
    "baseProjectId": "p28",
    "completionCriteria": [
      "설계한 핵심 기능 3개를 동작하는 한 서비스로 연결",
      "서버 DB 저장과 필요한 로그인·사용자별 데이터 분리 적용",
      "빈 결과·저장 실패·권한 오류와 완료 기준을 직접 검증"
    ],
    "challenge": "처음 정한 범위를 늘리지 않고 핵심 3개부터 완성하기",
    "question": "화면·서버·DB·권한 중 어떤 경계에서 실패할 수 있고 어떻게 확인했나요?",
    "learning": [
      {
        "feature": "진행 보드의 기능 연결",
        "technology": "컴포넌트 · 상태 이동 · 서버 API · DB",
        "knowledge": "작은 기능들을 하나의 실제 사용 흐름으로 통합하는 방법"
      },
      {
        "feature": "저장·권한·오류 검증",
        "technology": "인증 · 소유자 검사 · 자동 테스트와 실제 조작",
        "knowledge": "정상 화면뿐 아니라 데이터와 접근 제한까지 확인하는 방법"
      }
    ],
    "order": 23,
    "features": "설계한 핵심 기능 3개를 동작하는 한 서비스로 연결·서버 DB 저장과 필요한 로그인·사용자별 데이터 분리 적용·빈 결과·저장 실패·권한 오류와 완료 기준을 직접 검증"
  },
  {
    "id": "p30",
    "quoteId": "q12",
    "title": "실제로 사용하고 개선해 재배포하기",
    "summary": "완성한 같은 서비스를 직접 쓰고 불편한 점을 찾아 바꾼 뒤 다시 배포해요.",
    "level": 3,
    "concepts": "사용 피드백, 기존 코드 수정, 디버깅, 회귀 검사, 재배포",
    "time": "4~8시간",
    "prerequisites": [
      "p29"
    ],
    "baseProjectId": "p29",
    "completionCriteria": [
      "실제 주소에 배포한 뒤 프로젝트와 메모를 직접 관리해보기",
      "발견한 불편함을 기록하고 필요한 기능 하나를 선택해 변경",
      "오류 수정·기존 기능 검사 후 재배포하고 실제 주소에서 확인"
    ],
    "challenge": "직접 필요하다고 느낀 검색 또는 필터를 하나 추가하고 사용 전후 비교",
    "question": "직접 써보고 무엇이 불편했으며, 어떤 변경이 그 문제를 해결했나요?",
    "learning": [
      {
        "feature": "사용 경험으로 개선점 찾기",
        "technology": "실사용 기록 · 우선순위 · 변경 범위 정리",
        "knowledge": "작동하는 결과물에서 실제 필요를 발견하는 방법"
      },
      {
        "feature": "기존 서비스 수정·재배포",
        "technology": "Git 변경 비교 · 오류 재현 · 회귀 검사 · 배포 로그",
        "knowledge": "운영 중인 구조를 이해하고 안전하게 고친 뒤 다시 전달하는 방법"
      }
    ],
    "order": 24,
    "features": "실제 주소에 배포한 뒤 프로젝트와 메모를 직접 관리해보기·발견한 불편함을 기록하고 필요한 기능 하나를 선택해 변경·오류 수정·기존 기능 검사 후 재배포하고 실제 주소에서 확인"
  }
];
