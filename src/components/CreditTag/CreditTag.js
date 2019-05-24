import React, { memo, useState, useCallback, useEffect } from 'react';
import { Tag, Icon } from 'antd';
import moment from 'moment';
import './CreditTag.less';
import { CREDIT } from '../../constants/rules';

const CreditTag = ({ credit, lastTime, type, refreshUser }) => {
  const [innerComponent, setInnerComponent] = useState(
    <Icon type='loading' style={{ marginRight: 0 }} />
  );

  useEffect(() => {
    getInnerComponent();
    const interval = setInterval(getInnerComponent, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [credit, lastTime, type]);

  const getInnerComponent = useCallback(() => {
    const now = moment();
    const diff = now.diff(Number(lastTime));
    const restMillisec = CREDIT[type].INTERVAL - (diff % CREDIT[type].INTERVAL);
    if (credit === 0) {
      setInnerComponent(moment(restMillisec).format('mm:ss'));
    } else {
      setInnerComponent(credit);
    }
    // 크레딧 갱신 시 유저정보 같이 갱신
    if (restMillisec < 1000 && credit < CREDIT[type].MAX)
      setTimeout(refreshUser, restMillisec);
  }, [credit, lastTime, type]);

  return <Tag className='credit-tag'>{innerComponent}</Tag>;
};

export default memo(CreditTag);
