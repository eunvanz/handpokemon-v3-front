import React, { memo, useMemo, useCallback, useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { DUNGEON } from '../../constants/rules';
import AttrTag from '../../components/AttrTag';
import ContentContainer from '../../components/ContentContainer';
import './SelectDungeon.less';
import { COLOR } from '../../constants/styles';
import { GRADE } from '../../constants/codes';

const SelectDungeon = ({ onPick, user, codes }) => {
  const [picking, setPicking] = useState(false);

  const maxPickCredit = useMemo(() => Math.min(user.pickCredit, 6), [user]);

  const handleOnClickPick = useCallback(
    (options, e) => {
      setPicking(e.target.id);
      onPick({
        gradeCds: [GRADE.BASIC],
        attrCds: DUNGEON[options.type].ATTR_CDS,
        repeatCnt: options.repeatCnt
      }).finally(() => {
        setPicking(false);
      });
    },
    [onPick]
  );

  return (
    <ContentContainer>
      <Row gutter={12}>
        {DUNGEON.map((ITEM, idx) => (
          <Col
            key={idx}
            span={24}
            md={idx === DUNGEON.length - 1 ? null : 12}
            className='dungeon-card-wrapper'
          >
            <Card
              className='dungeon-card'
              title={ITEM.NAME}
              headStyle={{ backgroundColor: ITEM.COLOR }}
            >
              <div className='attr-section'>
                {ITEM.ATTR_CDS.map(attrCd => (
                  <AttrTag key={attrCd} attrCd={attrCd} codes={codes} />
                ))}
              </div>
              {user.pickCredit > 0 && (
                <div>
                  <Button
                    type='primary'
                    id={`pick-btn-single-${idx}`}
                    size='large'
                    onClick={e =>
                      handleOnClickPick(
                        {
                          type: idx,
                          repeatCnt: 1
                        },
                        e
                      )
                    }
                    disabled={picking && picking !== `pick-btn-single-${idx}`}
                    loading={picking && picking === `pick-btn-single-${idx}`}
                  >
                    채집 X 1
                  </Button>
                  {user.pickCredit > 1 && (
                    <Button
                      type='primary'
                      id={`pick-btn-multi-${idx}`}
                      size='large'
                      onClick={e =>
                        handleOnClickPick(
                          {
                            type: idx,
                            repeatCnt: maxPickCredit
                          },
                          e
                        )
                      }
                      style={{ marginLeft: 12 }}
                      disabled={picking && picking !== `pick-btn-multi-${idx}`}
                      loading={picking && picking === `pick-btn-multi-${idx}`}
                    >
                      {`채집 X ${maxPickCredit}`}
                    </Button>
                  )}
                </div>
              )}
              {user.pickCredit <= 0 && (
                <div style={{ color: COLOR.GRAY, marginTop: 24 }}>
                  채집 크레딧이 부족합니다.
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </ContentContainer>
  );
};

export default memo(SelectDungeon);
