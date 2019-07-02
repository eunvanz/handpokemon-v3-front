import React, { memo, useCallback } from 'react';
import ContentContainer from '../../components/ContentContainer/index';
import { Card, Alert, Row, Col, Button } from 'antd';
import MonCard from '../../components/MonCard/index';
import BottomTotal from '../../components/BottomTotal/index';

const DefenseView = ({
  user,
  defenseMons,
  codes,
  onClickChangeMon,
  onClickAddMon
}) => {
  const renderCards = useCallback(() => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const defenseMon = defenseMons.filter(defense => defense.seq === i)[0];
      if (defenseMon) {
        result.push(
          <Col
            xs={8}
            sm={6}
            xl={4}
            key={defenseMon.id}
            style={{ marginBottom: 12 }}
          >
            <MonCard
              mon={defenseMon.col}
              codes={codes}
              user={user}
              bottomComponent={<BottomTotal col={defenseMon.col} user={user} />}
            />
            <div
              className='text-center'
              style={{ marginTop: 6, marginBottom: 6 }}
            >
              <Button icon='sync' onClick={() => onClickChangeMon(defenseMon)}>
                교체
              </Button>
            </div>
          </Col>
        );
      } else {
        result.push(
          <Col xs={8} sm={6} xl={4} key={i} style={{ marginBottom: 12 }}>
            <MonCard isMock />
            <div className='text-center' style={{ marginTop: 6 }}>
              <Button icon='plus' onClick={() => onClickAddMon(i)}>
                추가
              </Button>
            </div>
          </Col>
        );
      }
    }
    return result;
  }, [defenseMons, codes, user, onClickChangeMon, onClickAddMon]);
  return (
    <ContentContainer>
      <Card style={{ marginBottom: 12 }}>
        <Alert message='가장 강력한 포켓몬으로 수비 포켓몬을 배치해보세요.' />총
        전투력: 코스트:
      </Card>
      <Row gutter={6} type='flex' justify='center'>
        {renderCards()}
      </Row>
    </ContentContainer>
  );
};

export default memo(DefenseView);
