import React, { memo, useState, useCallback, useEffect } from 'react';
import { Row, Button, Col, Tag } from 'antd';
import { Tween } from 'react-gsap';
import { Elastic } from 'gsap';
import ContentContainer from '../../components/ContentContainer/index';
import { COLOR } from '../../constants/styles';
import LevelUpTag from '../../components/LevelUpTag';
import PickAnimatedMonCard from '../../components/PickAimatedMonCard/PickAnimatedMonCard';
import './PickResult.less';

const PickResult = ({
  pickedMons,
  codes,
  user,
  onPick,
  history,
  onInit,
  prevUserCollections,
  prevPickOptions,
  onClickMix,
  onClickEvolute
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [picking, setPicking] = useState(false);
  const [pickCnt, setPickCnt] = useState(1);

  const handleOnClickPick = useCallback(
    (repeatCnt, pickingType) => {
      setPicking(pickingType);
      setPickCnt(pickCnt + 1);
      onPick({ repeatCnt }).then(() => setPicking(false));
    },
    [onPick]
  );

  const getUserCollectionByMonId = useCallback(
    monId => {
      return prevUserCollections.filter(col => col.monId === monId)[0];
    },
    [prevUserCollections]
  );

  return (
    <ContentContainer className='pick-result'>
      <h2 className='text-center' style={{ marginBottom: 24 }}>
        야호! 포켓몬을 발견했어!
        <br />
        과연 어떤 친구일까?
      </h2>
      <Row type='flex' justify='center' gutter={6}>
        {pickedMons.map((mon, idx) => (
          <Col
            xs={8}
            sm={6}
            xl={4}
            key={mon.monId * pickCnt * 10000}
            style={{ marginBottom: 6 }}
          >
            <PickAnimatedMonCard
              delay={idx * 0.2}
              mon={mon}
              id={mon.monId * pickCnt * 10000}
              codes={codes}
              prevMon={getUserCollectionByMonId(mon.monId)}
              mixable
              onClickMix={() => onClickMix(mon)}
              evolutable
              onClickEvolute={() => onClickEvolute(mon)}
              user={user}
            />
            <Tween
              duration={1}
              from={{ scale: 0, ease: Elastic.easeOut, delay: idx * 0.2 + 2 }}
            >
              <div>
                {getUserCollectionByMonId(mon.monId) && (
                  <LevelUpTag
                    prevLevel={getUserCollectionByMonId(mon.monId).level}
                    level={mon.level}
                  />
                )}
                {!getUserCollectionByMonId(mon.monId) && (
                  <div style={{ marginTop: 12, textAlign: 'center' }}>
                    <Tag color={COLOR.DEEP_ORANGE}>NEW</Tag>
                    <p>
                      콜렉션점수{' '}
                      <span className='c-primary fw-700'>+{mon.mon.point}</span>
                    </p>
                  </div>
                )}
              </div>
            </Tween>
          </Col>
        ))}
      </Row>
      <div className='text-center' style={{ marginTop: 24 }}>
        {prevPickOptions && user.pickCredit > 0 && (
          <>
            <Button
              type='primary'
              size='large'
              onClick={() => handleOnClickPick(1, 'single')}
              disabled={picking && picking !== 'single'}
              loading={picking && picking === 'single'}
            >
              다시채집 X 1
            </Button>
            {user.pickCredit > 1 && (
              <Button
                type='primary'
                size='large'
                style={{ marginLeft: 12 }}
                onClick={() =>
                  handleOnClickPick(Math.min(user.pickCredit, 6), 'multi')
                }
                disabled={picking && picking !== 'multi'}
                loading={picking && picking === 'multi'}
              >{`다시채집 X ${Math.min(user.pickCredit, 6)}`}</Button>
            )}
          </>
        )}
        {(!prevPickOptions || user.pickCredit < 1) && (
          <Button
            type='primary'
            size='large'
            icon='appstore'
            onClick={() => history.push('/collection/user')}
          >
            내 콜렉션
          </Button>
        )}
        <div className='text-center' style={{ marginTop: 16 }}>
          <Button size='large' onClick={onInit} icon='environment'>
            지역선택
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
};

export default memo(PickResult);
