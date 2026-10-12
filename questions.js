/*
 * 상식 퀴즈 문항 데이터
 * 문항 작성 규칙은 CLAUDE.md의 "문항 작성 규칙"을 따릅니다.
 *
 * 문항 하나의 형식
 *   id          카테고리 약어-번호 (예: kh-01)
 *   question    문제 문장
 *   choices     보기 4개 (서로 달라야 함)
 *   answer      정답 보기의 위치 (0~3)
 *   explanation 해설 1~2문장 (출처에서 확인한 내용만)
 *   source      { title, url } 출처 이름과 주소 (https)
 */
window.QUESTIONS = {
  "한국사": [
    {
      id: "kh-01",
      question: "훈민정음을 창제한 조선의 왕은?",
      choices: ["태종", "세종", "정조", "영조"],
      answer: 1,
      explanation: "훈민정음은 세종이 1443년에 창제하고 1446년에 반포한 우리 글자이다.",
      source: { title: "위키백과, 「훈민정음」", url: "https://ko.wikipedia.org/wiki/훈민정음" }
    },
    {
      id: "kh-02",
      question: "임진왜란이 시작된 해는?",
      choices: ["1392년", "1592년", "1636년", "1910년"],
      answer: 1,
      explanation: "임진왜란은 1592년에 일본군이 조선을 침략하면서 시작되었다.",
      source: { title: "위키백과, 「임진왜란」", url: "https://ko.wikipedia.org/wiki/임진왜란" }
    },
    {
      id: "kh-03",
      question: "임진왜란 때 거북선을 활용한 수군을 이끈 장군은?",
      choices: ["이순신", "권율", "김유신", "강감찬"],
      answer: 0,
      explanation: "거북선은 임진왜란 때 이순신이 이끈 조선 수군이 활용한 돌격선이다.",
      source: { title: "위키백과, 「거북선」", url: "https://ko.wikipedia.org/wiki/거북선" }
    },
    {
      id: "kh-04",
      question: "고구려의 제19대 왕으로, 영토를 크게 넓힌 왕은?",
      choices: ["동명성왕", "소수림왕", "광개토왕", "장수왕"],
      answer: 2,
      explanation: "광개토왕은 고구려의 제19대 왕으로, 정복 활동을 통해 영토를 크게 넓혔다.",
      source: { title: "위키백과, 「광개토왕」", url: "https://ko.wikipedia.org/wiki/광개토왕" }
    },
    {
      id: "kh-05",
      question: "일제강점기에 전국으로 번진 3·1 운동이 일어난 해는?",
      choices: ["1905년", "1910년", "1919년", "1945년"],
      answer: 2,
      explanation: "3·1 운동은 1919년 3월 1일부터 전국에서 일어난 독립 만세 운동이다.",
      source: { title: "위키백과, 「3·1 운동」", url: "https://ko.wikipedia.org/wiki/3·1_운동" }
    },
    {
      id: "kh-06",
      question: "고려 시대에 만든 팔만대장경판을 보관하고 있는 절은?",
      choices: ["불국사", "해인사", "통도사", "송광사"],
      answer: 1,
      explanation: "팔만대장경판은 경남 합천 해인사의 장경판전에 보관되어 있다.",
      source: { title: "위키백과, 「팔만대장경」", url: "https://ko.wikipedia.org/wiki/팔만대장경" }
    },
    {
      id: "kh-07",
      question: "현존하는 금속활자 인쇄본 가운데 가장 오래된 책으로 알려진 것은?",
      choices: ["삼국유사", "훈민정음 해례본", "직지심체요절", "조선왕조실록"],
      answer: 2,
      explanation: "직지심체요절은 고려 말인 1377년에 청주 흥덕사에서 금속활자로 찍어 낸 책이다.",
      source: { title: "위키백과, 「직지심체요절」", url: "https://ko.wikipedia.org/wiki/직지심체요절" }
    },
    {
      id: "kh-08",
      question: "1392년에 고려를 대신해 조선을 세운 인물은?",
      choices: ["왕건", "궁예", "견훤", "이성계"],
      answer: 3,
      explanation: "이성계가 1392년에 조선을 세우고 왕위에 올랐다.",
      source: { title: "위키백과, 「조선」", url: "https://ko.wikipedia.org/wiki/조선" }
    },
    {
      id: "kh-09",
      question: "6·25 전쟁(한국 전쟁)이 일어난 해는?",
      choices: ["1945년", "1948년", "1950년", "1953년"],
      answer: 2,
      explanation: "6·25 전쟁은 1950년 6월 25일에 시작되어 1953년 정전 협정으로 전투가 멈추었다.",
      source: { title: "위키백과, 「한국 전쟁」", url: "https://ko.wikipedia.org/wiki/한국_전쟁" }
    },
    {
      id: "kh-10",
      question: "1919년 4월에 대한민국 임시정부가 처음 수립된 도시는?",
      choices: ["상하이", "베이징", "충칭", "도쿄"],
      answer: 0,
      explanation: "대한민국 임시정부는 1919년 중국 상하이에서 수립되었다.",
      source: { title: "위키백과, 「대한민국 임시정부」", url: "https://ko.wikipedia.org/wiki/대한민국_임시정부" }
    }
  ],

  "세계지리": [
    {
      id: "wg-01",
      question: "면적이 가장 넓은 나라는?",
      choices: ["캐나다", "중국", "미국", "러시아"],
      answer: 3,
      explanation: "러시아는 면적이 약 1,710만 km²로 세계에서 가장 넓은 나라이다.",
      source: { title: "위키백과, 「러시아」", url: "https://ko.wikipedia.org/wiki/러시아" }
    },
    {
      id: "wg-02",
      question: "면적과 인구가 모두 가장 큰 대륙은?",
      choices: ["아프리카", "아시아", "유럽", "북아메리카"],
      answer: 1,
      explanation: "아시아는 면적과 인구가 모두 가장 큰 대륙이다.",
      source: { title: "위키백과, 「아시아」", url: "https://ko.wikipedia.org/wiki/아시아" }
    },
    {
      id: "wg-03",
      question: "에베레스트산이 속한 산맥은?",
      choices: ["알프스산맥", "안데스산맥", "로키산맥", "히말라야산맥"],
      answer: 3,
      explanation: "에베레스트산은 네팔과 중국 티베트의 국경에 걸친 히말라야산맥에 있다.",
      source: { title: "위키백과, 「에베레스트산」", url: "https://ko.wikipedia.org/wiki/에베레스트산" }
    },
    {
      id: "wg-04",
      question: "세계에서 가장 넓은 바다(대양)는?",
      choices: ["대서양", "인도양", "태평양", "북극해"],
      answer: 2,
      explanation: "태평양은 지구 표면의 약 3분의 1을 차지하는, 세계에서 가장 넓은 대양이다.",
      source: { title: "위키백과, 「태평양」", url: "https://ko.wikipedia.org/wiki/태평양" }
    },
    {
      id: "wg-05",
      question: "이집트의 수도는?",
      choices: ["알렉산드리아", "룩소르", "아스완", "카이로"],
      answer: 3,
      explanation: "이집트의 수도 카이로는 나일강 변에 자리 잡은 도시이다.",
      source: { title: "위키백과, 「카이로」", url: "https://ko.wikipedia.org/wiki/카이로" }
    },
    {
      id: "wg-06",
      question: "호주의 수도는?",
      choices: ["시드니", "멜버른", "캔버라", "브리즈번"],
      answer: 2,
      explanation: "호주의 수도는 시드니가 아니라 캔버라이다. 시드니와 멜버른 사이에 계획해서 만든 도시이다.",
      source: { title: "위키백과, 「캔버라」", url: "https://ko.wikipedia.org/wiki/캔버라" }
    },
    {
      id: "wg-07",
      question: "아마존강 유역에서 가장 큰 부분이 속한 나라는?",
      choices: ["브라질", "아르헨티나", "칠레", "멕시코"],
      answer: 0,
      explanation: "아마존강 유역에서 가장 큰 부분은 브라질에 속해 있다.",
      source: { title: "위키백과, 「아마존강」", url: "https://ko.wikipedia.org/wiki/아마존강" }
    },
    {
      id: "wg-08",
      question: "사하라 사막이 펼쳐진 대륙은?",
      choices: ["아시아", "남아메리카", "오세아니아", "아프리카"],
      answer: 3,
      explanation: "사하라 사막은 아프리카 북부에 펼쳐진, 세계에서 가장 큰 더운 사막이다.",
      source: { title: "위키백과, 「사하라 사막」", url: "https://ko.wikipedia.org/wiki/사하라_사막" }
    },
    {
      id: "wg-09",
      question: "보스포루스 해협을 사이에 두고 유럽과 아시아에 걸쳐 있는 튀르키예의 도시는?",
      choices: ["앙카라", "이스탄불", "이즈미르", "안탈리아"],
      answer: 1,
      explanation: "이스탄불은 보스포루스 해협을 사이에 두고 유럽 쪽과 아시아 쪽에 걸쳐 있다.",
      source: { title: "위키백과, 「이스탄불」", url: "https://ko.wikipedia.org/wiki/이스탄불" }
    },
    {
      id: "wg-10",
      question: "캐나다의 수도는?",
      choices: ["토론토", "밴쿠버", "오타와", "몬트리올"],
      answer: 2,
      explanation: "캐나다의 수도는 가장 큰 도시인 토론토가 아니라 오타와이다.",
      source: { title: "위키백과, 「오타와」", url: "https://ko.wikipedia.org/wiki/오타와" }
    }
  ],

  "과학": [
    {
      id: "sc-01",
      question: "물의 화학식은?",
      choices: ["CO2", "O2", "NaCl", "H2O"],
      answer: 3,
      explanation: "물 분자는 수소 원자 2개와 산소 원자 1개로 이루어진 H2O이다.",
      source: { title: "위키백과, 「물」", url: "https://ko.wikipedia.org/wiki/물" }
    },
    {
      id: "sc-02",
      question: "지구에서 가장 가까운 별은?",
      choices: ["시리우스", "프록시마 센타우리", "북극성", "태양"],
      answer: 3,
      explanation: "태양은 지구에서 약 1억 5천만 km 떨어진, 지구에서 가장 가까운 별이다.",
      source: { title: "위키백과, 「태양」", url: "https://ko.wikipedia.org/wiki/태양" }
    },
    {
      id: "sc-03",
      question: "진공에서 빛의 속도는 초속 약 몇 km인가?",
      choices: ["약 3천 km", "약 3만 km", "약 30만 km", "약 300만 km"],
      answer: 2,
      explanation: "진공에서 빛은 초속 299,792km로 나아가며, 흔히 약 30만 km로 어림한다.",
      source: { title: "위키백과, 「광속」", url: "https://ko.wikipedia.org/wiki/광속" }
    },
    {
      id: "sc-04",
      question: "사람 몸에서 가장 넓은 기관은?",
      choices: ["간", "폐", "피부", "큰창자"],
      answer: 2,
      explanation: "피부는 몸 전체를 덮고 있어 사람 몸에서 가장 넓은 기관으로 꼽힌다.",
      source: { title: "위키백과, 「피부」", url: "https://ko.wikipedia.org/wiki/피부" }
    },
    {
      id: "sc-05",
      question: "식물이 광합성을 할 때 공기 중에서 흡수하는 기체는?",
      choices: ["이산화탄소", "산소", "질소", "수소"],
      answer: 0,
      explanation: "식물은 빛에너지를 이용해 이산화탄소와 물로 포도당을 만들고 산소를 내보낸다.",
      source: { title: "위키백과, 「광합성」", url: "https://ko.wikipedia.org/wiki/광합성" }
    },
    {
      id: "sc-06",
      question: "태양계에서 가장 큰 행성은?",
      choices: ["토성", "지구", "해왕성", "목성"],
      answer: 3,
      explanation: "목성은 태양계 행성 가운데 가장 크고 무겁다.",
      source: { title: "위키백과, 「목성」", url: "https://ko.wikipedia.org/wiki/목성" }
    },
    {
      id: "sc-07",
      question: "식탁용 소금의 주성분은?",
      choices: ["탄산칼슘", "염화 나트륨", "수산화 나트륨", "염화 칼륨"],
      answer: 1,
      explanation: "식탁용 소금은 주로 염화 나트륨(NaCl)으로 이루어져 있다.",
      source: { title: "위키백과, 「염화 나트륨」", url: "https://ko.wikipedia.org/wiki/염화_나트륨" }
    },
    {
      id: "sc-08",
      question: "1953년에 DNA의 이중 나선 구조를 제안한 두 과학자는?",
      choices: ["멘델과 다윈", "퀴리 부부", "뉴턴과 호이겐스", "왓슨과 크릭"],
      answer: 3,
      explanation: "제임스 왓슨과 프랜시스 크릭이 1953년에 DNA의 이중 나선 구조 모형을 제안했다.",
      source: { title: "위키백과, 「DNA」", url: "https://ko.wikipedia.org/wiki/DNA" }
    },
    {
      id: "sc-09",
      question: "소리가 전달되지 않는 곳은?",
      choices: ["물속", "공기 중", "진공", "쇠막대 안"],
      answer: 2,
      explanation: "소리는 공기나 물 같은 매질이 진동하며 전달되므로, 매질이 없는 진공에서는 전달되지 않는다.",
      source: { title: "위키백과, 「소리」", url: "https://ko.wikipedia.org/wiki/소리" }
    },
    {
      id: "sc-10",
      question: "건강한 사람의 체온으로 흔히 알려진 값은?",
      choices: ["약 26.5℃", "약 36.5℃", "약 46.5℃", "약 56.5℃"],
      answer: 1,
      explanation: "건강한 사람의 체온은 보통 36.5℃ 안팎이다.",
      source: { title: "위키백과, 「체온」", url: "https://ko.wikipedia.org/wiki/체온" }
    }
  ],

  "예술과 문화": [
    {
      id: "ac-01",
      question: "「모나리자」를 그린 화가는?",
      choices: ["미켈란젤로", "라파엘로", "렘브란트", "레오나르도 다 빈치"],
      answer: 3,
      explanation: "「모나리자」는 르네상스 시대의 화가 레오나르도 다 빈치가 그린 초상화이다.",
      source: { title: "위키백과, 「모나리자」", url: "https://ko.wikipedia.org/wiki/모나리자" }
    },
    {
      id: "ac-02",
      question: "「별이 빛나는 밤」을 그린 화가는?",
      choices: ["클로드 모네", "빈센트 반 고흐", "폴 세잔", "에드바르 뭉크"],
      answer: 1,
      explanation: "「별이 빛나는 밤」은 빈센트 반 고흐가 1889년에 그린 작품이다.",
      source: { title: "위키백과, 「별이 빛나는 밤」", url: "https://ko.wikipedia.org/wiki/별이_빛나는_밤" }
    },
    {
      id: "ac-03",
      question: "베토벤의 교향곡 제9번에 붙은 별칭은?",
      choices: ["운명", "전원", "합창", "영웅"],
      answer: 2,
      explanation: "교향곡 제9번은 마지막 악장에 합창이 들어가 「합창」이라는 별칭으로 불린다.",
      source: { title: "위키백과, 「교향곡 제9번 (베토벤)」", url: "https://ko.wikipedia.org/wiki/교향곡_제9번_(베토벤)" }
    },
    {
      id: "ac-04",
      question: "셰익스피어의 4대 비극에 속하는 작품은?",
      choices: ["로미오와 줄리엣", "베니스의 상인", "한여름 밤의 꿈", "햄릿"],
      answer: 3,
      explanation: "셰익스피어의 4대 비극은 「햄릿」, 「오셀로」, 「리어 왕」, 「맥베스」이다.",
      source: { title: "위키백과, 「햄릿」", url: "https://ko.wikipedia.org/wiki/햄릿" }
    },
    {
      id: "ac-05",
      question: "스페인 내전 중의 폭격을 주제로 「게르니카」를 그린 화가는?",
      choices: ["살바도르 달리", "앙리 마티스", "호안 미로", "파블로 피카소"],
      answer: 3,
      explanation: "파블로 피카소는 1937년에 게르니카 폭격의 참상을 담아 「게르니카」를 그렸다.",
      source: { title: "위키백과, 「게르니카 (그림)」", url: "https://ko.wikipedia.org/wiki/게르니카_(그림)" }
    },
    {
      id: "ac-06",
      question: "판소리에서 북을 치며 장단을 맞추는 사람은?",
      choices: ["소리꾼", "고수", "상쇠", "악장"],
      answer: 1,
      explanation: "판소리는 소리꾼이 노래와 말, 몸짓으로 이야기를 풀어 가고, 고수가 북으로 장단을 맞추는 공연이다.",
      source: { title: "위키백과, 「판소리」", url: "https://ko.wikipedia.org/wiki/판소리" }
    },
    {
      id: "ac-07",
      question: "한복에서 윗도리에 해당하는 옷은?",
      choices: ["치마", "버선", "고무신", "저고리"],
      answer: 3,
      explanation: "저고리는 한복의 윗도리이며, 여성 한복에서는 치마와 함께 입는다.",
      source: { title: "위키백과, 「한복」", url: "https://ko.wikipedia.org/wiki/한복" }
    },
    {
      id: "ac-08",
      question: "2019년 칸 영화제에서 황금종려상을 받은 한국 영화는?",
      choices: ["올드보이", "버닝", "박쥐", "기생충"],
      answer: 3,
      explanation: "봉준호 감독의 「기생충」은 한국 영화 최초로 칸 영화제 황금종려상을 받았다.",
      source: { title: "위키백과, 「기생충 (영화)」", url: "https://ko.wikipedia.org/wiki/기생충_(영화)" }
    },
    {
      id: "ac-09",
      question: "2013년에 유네스코 인류무형문화유산으로 등재된 한국의 음식 문화는?",
      choices: ["불고기", "김장 문화", "비빔밥", "떡볶이"],
      answer: 1,
      explanation: "김장 문화는 2013년에 유네스코 인류무형문화유산으로 등재되었다.",
      source: { title: "위키백과, 「김장」", url: "https://ko.wikipedia.org/wiki/김장" }
    },
    {
      id: "ac-10",
      question: "조각 작품 「생각하는 사람」을 만든 조각가는?",
      choices: ["미켈란젤로", "도나텔로", "콘스탄틴 브랑쿠시", "오귀스트 로댕"],
      answer: 3,
      explanation: "「생각하는 사람」은 프랑스의 조각가 오귀스트 로댕의 작품이다.",
      source: { title: "위키백과, 「오귀스트 로댕」", url: "https://ko.wikipedia.org/wiki/오귀스트_로댕" }
    }
  ]
};
