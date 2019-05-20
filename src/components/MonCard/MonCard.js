import React, { memo, useCallback, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { Card, Icon } from 'antd';
import { getMonImageUrl } from '../../libs/hpUtils';
import { COLOR } from '../../constants/styles';
import { repeat } from '../../libs/commonUtils';

const MonCard = ({ mon, col, hideInfo }) => {
  const [isActiveVisibilitySensor, setIsActiveVisibilitySensor] = useState(
    false
  );

  const onChangeVisibility = useCallback(isVisible => {
    if (isVisible) setIsActiveVisibilitySensor(false);
  }, []);

  const renderCover = useCallback(() => {
    if (!hideInfo) {
      return (
        <div style={{ position: 'relative' }}>
          <VisibilitySensor
            active={isActiveVisibilitySensor}
            onChange={onChangeVisibility}
            partialVisibility
          >
            {({ isVisible }) => {
              return (
                <img
                  src={
                    isVisible
                      ? getMonImageUrl(mon || col)
                      : 'https://dummyimage.com/250x250/fff/aaa'
                  }
                  alt='손켓몬 이미지'
                  style={{ width: '100%' }}
                />
              );
            }}
          </VisibilitySensor>
        </div>
      );
    } else {
      // TODO
    }
  }, [mon, col, hideInfo]);

  const renderCost = useCallback(() => {
    const mon = mon || col.mon;
    const { cost } = mon;
    let result = [];
    if (!hideInfo) {
      const rest = cost % 5;
      let filledColor;
      let emptyColor;
      if (cost > 5) {
        filledColor = COLOR.GOLD;
        emptyColor = COLOR.DARK_GRAY;
      } else {
        filledColor = COLOR.DARK_GRAY;
        emptyColor = COLOR.LIGHT_GRAY;
      }
      let key = 1;
      repeat(() => {
        const color = rest - key >= 0 ? filledColor : emptyColor;
        result.push(
          <Icon key={key++} type='star' theme='filled' style={{ color }} />
        );
      }, 5);
    } else {
      let key = 1;
      repeat(() => {
        result.push(
          <Icon
            key={key++}
            type='star'
            theme='filled'
            style={{ color: COLOR.LIGHT_GRAY }}
          />
        );
      }, 5);
    }
    return result;
  }, [mon, col, hideInfo]);

  const renderAttr = useCallback(() => {
    const mon = mon || col.mon;
    const { gradeCd, mainAttrCd, subAttrCd } = mon;
  }, [mon, col, hideInfo]);

  return (
    <Card hoverable cover={renderCover()}>
      <p className='text-center' style={{ marginBottom: 0 }}>
        {renderCost()}
      </p>
      <p className='text-center' stype={{ marginBottom: 0 }}>
        {renderAttr()}
      </p>
    </Card>
  );
};

export default memo(MonCard);
