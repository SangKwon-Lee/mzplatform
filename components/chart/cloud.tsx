import theme from '../../commons/theme';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { signFormat } from '../../commons/utils';

const backgroudnColor = [
  theme.color.learn_random.turquoise,
  theme.color.learn_random.blue,
  theme.color.learn_random.green,
  theme.color.learn_random.indigo,
  theme.color.learn_random.pink,
  theme.color.learn_random.olive,
  theme.color.learn_random.orange,
  theme.color.learn_random.purple,
  theme.color.learn_random.red,
  theme.color.learn_random.brown,
];

interface topKeyword {
  topKeyword: {
    id: number;
    ratio: number;
    name: string;
    index?: number;
  };
}
interface Props {
  todayKeyword: any;
  handleKeyword: (data: string, index: number) => void;
}

export default function CloudChart(props: Props) {
  //* 키워드 정보를 받아옵니다.
  const { handleKeyword, todayKeyword } = props;
  const svg = useRef<SVGSVGElement>(null);
  function drawChart(svgRef: React.RefObject<SVGSVGElement>, todayKeyword: topKeyword[]) {
    //* 페이지 길이
    let width = 0;

    //* 페이지 길이를 구하는 곳
    if (document.getElementById('canvas')?.offsetWidth) {
      width = Number(document.getElementById('canvas')?.offsetWidth);
    }

    //* 키워드 데이터 객체에 index라는 key와 value를 추가
    //* index값을 추가해주어야 handleKeyword 함수에 클릭한 키워드 정보를 넘길 수 있습니다.
    const data = todayKeyword.map((data, index) => ({
      ...data,
      index: index,
    }));
    //* canvas가 2개 그려지는 것을 방지하는 코드
    d3.select('#canvas svg').remove();

    //* 차트를 그릴 수 있는 canvas를 만드는 곳
    var svg = d3
      .select('#canvas')
      .append('svg')
      .attr('width', width)
      .attr('height', 270)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + 270 / 2 + ')');

    //* 버블 하나당 최대 최소 크기를 지정
    const radiusScale = d3.scaleSqrt().domain([1, 300]).range([0, 100]);

    //* 버블들이 canvas에서 어떻게 위치할지 정하는 곳
    //* ex) 중앙배치, 혹은 수직, 수평 배치 등을 forceY, forceX에서 지정
    //* forceY, forceX에서 strength를 조정하면 됩니다.
    //* 수직, 수평 배치를 수정하려면 여기를 수정하여주세요.
    const simulation = d3
      .forceSimulation()
      .force('x', d3.forceX(0).strength(0.055))
      .force(
        'y',
        d3.forceY(0).strength((d: any) => {
          if (width < 400) {
            return 0.1;
          } else if (width < 500) {
            return 0.23;
          } else if (width < 550) {
            return 0.2;
          } else if (width < 610) {
            return 0.3;
          } else {
            return 0.1;
          }
        }),
      )
      // * 버블들끼리의 사이 간격을 조절.
      //* 버블들 사이의 간격을 좁히거나, 더 띄우려면 아래 d.forceCollide의 return값을 조절하여 주세요.
      .force(
        'collide',
        d3.forceCollide(function (d: any) {
          if (width < 400) {
            return handleCircleScale(radiusScale(d.ratio)) - 5;
          } else if (width < 500) {
            return handleCircleScale(radiusScale(d.ratio)) - 2;
          } else if (width < 550) {
            return handleCircleScale(radiusScale(d.ratio)) + 2;
          } else if (width < 610) {
            return handleCircleScale(radiusScale(d.ratio)) + 5;
          } else {
            return radiusScale(Math.abs(d.ratio));
          }
        }),
      );

    const handleCircleScale = (number: number) => {
      if (number <= 0) {
        return 35;
      }
      let newNum = Math.abs(Math.floor(number - 1));
      if (newNum > 0 && newNum < 5) {
        return 33;
      } else if (newNum >= 5 && newNum < 10) {
        return 37;
      } else if (newNum >= 10 && newNum < 15) {
        return 40;
      } else if (newNum >= 0 && newNum < 15) {
        return 42;
      } else if (newNum >= 15 && newNum < 20) {
        return 48;
      } else if (newNum >= 20 && newNum < 25) {
        return 60;
      } else if (newNum >= 25) {
        return 60;
      } else {
        return 35;
      }
    };

    const handleTextScale = (number: number) => {
      if (width < 400) {
        return number / 2;
      } else if (width < 500) {
        return number - 7;
      } else if (width < 550) {
        return number - 3;
      } else if (width < 610) {
        return number;
      } else {
        return;
      }
    };

    //* 버블을 그리는 곳. att('r') 이 부분이 버블들의 크기를 정합니다.
    //* 버블들의 크기를 변경하시려면 .attr('r')의 return값을 조절하여 주세요.
    const circle = svg
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'artist')
      .attr('r', function (d: any) {
        if (width < 400) {
          return handleCircleScale(radiusScale(d.ratio)) - 10;
        } else if (width < 500) {
          return handleCircleScale(radiusScale(d.ratio)) - 7;
        } else if (width < 550) {
          return handleCircleScale(radiusScale(d.ratio)) - 3;
        } else if (width < 610) {
          return handleCircleScale(radiusScale(d.ratio));
        } else {
          return handleCircleScale(radiusScale(d.ratio));
        }
      })
      .attr('fill', function (d) {
        return backgroudnColor[d.index];
      })
      .style('cursor', 'pointer')
      .on('click', function (d, c: any) {
        handleKeyword(c.name, c.index);
      });

    //* 버블에서 키워드 이름을 그리는 곳
    //* 버블 안의 텍스트 위치 및 폰트 사이즈를 변경하시려면 아래 style을 수정하여 주세요.
    const KeywordName = svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'svgText')
      .text(function (d: any) {
        return d.name;
      })
      .attr('dy', '0em')
      .style('font-weight', 700)
      .style('cursor', 'pointer')
      .style('font-family', 'Pretendard')
      .style('fill', 'white')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('font-size', function (d: any) {
        if (d.ratio <= 0) {
          return 8 + width / 200;
        }

        let newNum = Math.abs(Math.floor(d.ratio - 1));
        if (newNum > 0 && newNum < 5) {
          return 8 + width / 220;
        } else if (newNum >= 5 && newNum < 10) {
          return 9 + width / 220;
        } else if (newNum >= 10 && newNum < 15) {
          return 10 + width / 220;
        } else if (newNum >= 0 && newNum < 15) {
          return 10 + width / 220;
        } else if (newNum >= 15 && newNum < 20) {
          return 10 + width / 220;
        } else if (newNum >= 20 && newNum < 25) {
          return 12 + width / 220;
        } else if (newNum >= 25) {
          return 12 + width / 220;
        } else {
          return 10 + width / 220;
        }
      })
      .on('click', function (d, c: any) {
        handleKeyword(c.name, c.index);
      });

    //* 버블에서 키워드의 등락률을 그리는 곳
    //* 버블 안의 텍스트 위치 및 폰트 사이즈를 변경하시려면 아래 style을 수정하여 주세요.
    const RatioText = svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'svgText')
      .text(function (d: any) {
        return signFormat(d.ratio) + d.ratio.toFixed(2) + '%';
      })
      .attr('dy', '1.3em')
      .style('font-weight', 400)
      .style('cursor', 'pointer')
      .style('font-family', 'Pretendard')
      .style('fill', 'white')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('font-size', function (d: any) {
        if (d.ratio <= 0) {
          return 8 + width / 200;
        }
        let newNum = Math.abs(Math.floor(d.ratio - 1));
        if (newNum > 0 && newNum < 5) {
          return 8 + width / 200;
        } else if (newNum >= 5 && newNum < 10) {
          return 9 + width / 200;
        } else if (newNum >= 10 && newNum < 15) {
          return 10 + width / 200;
        } else if (newNum >= 0 && newNum < 15) {
          return 12 + width / 200;
        } else if (newNum >= 15 && newNum < 20) {
          return 12 + width / 200;
        } else if (newNum >= 20 && newNum < 25) {
          return 14 + width / 200;
        } else if (newNum >= 25) {
          return 14 + width / 200;
        } else {
          return 10 + width / 200;
        }
      })
      .on('click', function (d, c: any) {
        handleKeyword(c.name, c.index);
      });

    //* 버블 하나하나의 위치와 버블 안의 text 위치를 정하는 곳
    function ticked() {
      circle
        .attr('cx', function (d: any) {
          // text.attr('cx', d.x);
          return d.x;
        })
        .attr('cy', function (d: any) {
          // text.attr('cy', d.y);
          return d.y;
        });
      KeywordName.attr('x', function (d: any) {
        return d.x;
      });
      KeywordName.attr('y', function (d: any) {
        return d.y;
      });
      RatioText.attr('x', function (d: any) {
        return d.x;
      });
      RatioText.attr('y', function (d: any) {
        return d.y;
      });
    }
    simulation.nodes(data).on('tick', ticked);
  }

  useEffect(() => {
    if (todayKeyword && Array.isArray(todayKeyword) && todayKeyword.length > 0) {
      drawChart(svg, todayKeyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginLeft: '-16px', marginRight: '-16px' }}>
      <div id="canvas" style={{ width: '100%', height: '270px' }} />
    </div>
  );
}
