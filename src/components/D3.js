import React, { useEffect } from "react";
import * as d3 from "d3";
const dayPomo = [1, 3, 5, 6, 8, 12, 8];

const D3 = () => {
  useEffect(() => {
    //막대 그래프
    const width = 400;
    const height = 400;
    // svg 테두리 내부의 여백을 위한 margin
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    // 지정해둔 크기에 따라 캔버스를 그린다.
    const svg = d3
      .select("div") // div 요소 선택
      .append("svg") // 'svg'태그를 가진 요소 선택
      .attr("width", width) // 차트의 너비
      .attr("height", height); // 차트의 높이
    // input data
    const data = [
      {
        day: "5일전",
        value: dayPomo.length > 5 ? dayPomo[0] : 0,
        color: "black",
      },
      {
        day: "4일전",
        value: dayPomo.length > 4 ? dayPomo[1] : 0,
        color: "gray",
      },
      {
        day: "3일전",
        value: dayPomo.length > 3 ? dayPomo[2] : 0,
        color: "purple",
      },
      {
        day: "2일전",
        value: dayPomo.length > 2 ? dayPomo[3] : 0,
        color: "yellow",
      },
      {
        day: "어제",
        value: dayPomo.length > 1 ? dayPomo[4] : 0,
        color: "orange",
      },
      {
        day: "오늘",
        value: dayPomo.length > 0 ? dayPomo[5] : 0,
        color: "tomato",
      },
    ];

    const x = d3
      .scaleBand() // 값이 문자열이라면 scaleBand, 숫자라면 scaleLinear
      .domain(data.map((object) => object.day)) // x축의 값 , ['5일전', '4일전', '3일전', '2일전', '어제', '오늘']
      .range([margin.left, width]); // 출력되는 범위, 캔버스내의 좌,우 여백을 제외한 값 [40,400]

    const y = d3
      .scaleLinear() // y축 value 값은 숫자, scaleLinear
      .domain([0, d3.max(data, (d) => d.value)]) // input 데이터 범위 즉, 최소, 최대값 배열 [0,12]
      .range([height - margin.bottom, margin.top]); // range는 출력되는 범위, 캔버스 상, 하 여백을 제외한 값 [400-40,40]

    const xAxis = (g) => {
      return (
        g // 각 축의 문서요소들, 이후 g container를 통해 설정한 값들이 적용.
          // transform 속성을 통해 원하는 만큼 x축을 이동, 즉 가로 축을 설정한 바닥 여백 만큼 띄워 준다.
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          // 바닥에 axisBottom 함수를 통해 x축을 생성, tickSizeOuter는 각 축에 튀어나오는 tick의 길이를 의미.
          .call(d3.axisBottom(x).tickSizeOuter(0))
      );
    };

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`) // 동일하게 원하는 만큼 여백을 이동
        // axisLeft를 통해 좌측에 y축 생성, tickValues 함수를 통해 원하는 높이에 틱 생성가능, tickSize를 width만큼 그려 그리드 생성.
        .call(
          d3
            .axisLeft(y)
            .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
            .tickSize(-width)
        )
        .call((g) => g.select(".domain").remove()) // 축을 깔끔하게 지울수도 있다.
        .attr("class", "grid"); // 이런식으로 직접 class를 부여해서 css로도 속성 부여 가능(색깔, 길이 등)

    // g 컨테이너를 통해 설정해둔 x축, y축을 부른다.
    svg.append("g").call(xAxis); // x축 인덱스 추가
    svg.append("g").call(yAxis); // y축 인덱스 추가
    svg
      .selectAll("rect") // 막대그래프
      .data(data) // 막대그래프로 표현할 데이터
      .enter() // 데이터를 순회
      .append("rect")
      // x좌표의 위치를 척도에 따라 계산, 도형의 width/2 값을 빼줌으로써 도형이 가운데에 위치
      .attr("x", (data) => x(data.day) + x.bandwidth() / 2 - 20) // 40의 반절 20을 뺌으로서 x축의 달이 막대의 중앙에 위치한다.
      .attr("y", (data) => y(data.value)) // y좌표 척도 계산
      .attr("width", 40) // bar 도형 width 설정
      .attr("height", (data) => y(0) - y(data.value))
      .attr("class", "bar-chart") // 클래스를 부여하여 css, scss등으로 넓이나 색깔 등을 직접 부여 가능
      .attr("fill", (data) => data.color); // input data에 미리 color를 넣어 둔다면 이렇게도 색깔 지정 가능.
  }, [dayPomo]);

  return (
    <div>
      <svg />
    </div>
  );
};

export default D3;
