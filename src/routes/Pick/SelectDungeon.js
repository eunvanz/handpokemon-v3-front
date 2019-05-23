import React, { memo, useMemo } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { DUNGEON } from '../../constants/rules';
import AttrTag from '../../components/AttrTag';
import ContentContainer from '../../components/ContentContainer';
import './SelectDungeon.less';

const SelectDungeon = ({ onSelectDungeon, user, codes }) => {
  const maxPickCredit = useMemo(() => Math.min(user.pickCredit, 6), [user]);

  return (
    <ContentContainer>
      <Row gutter={12}>
        {DUNGEON.map((item, idx) => (
          <Col
            span={24}
            md={idx === DUNGEON.length - 1 ? null : 12}
            key={item.name}
            className='dungeon-card-wrapper'
          >
            <Card className='dungeon-card' title={item.name}>
              <div className='attr-section'>
                {item.attrCds.map(attrCd => (
                  <AttrTag attrCd={attrCd} codes={codes} />
                ))}
              </div>
              <div>
                <Button
                  type='primary'
                  size='large'
                  onClick={() =>
                    onSelectDungeon({
                      type: idx,
                      repeatCnt: 1
                    })
                  }
                  style={{ marginRight: 12 }}
                >
                  채집 X 1
                </Button>
                <Button
                  type='primary'
                  size='large'
                  onClick={() =>
                    onSelectDungeon({
                      type: idx,
                      repeatCnt: maxPickCredit
                    })
                  }
                >
                  채집 X {maxPickCredit}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </ContentContainer>
  );
};

export default memo(SelectDungeon);
