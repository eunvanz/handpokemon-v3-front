import React, { memo, useMemo, useCallback } from 'react';
import { Row, Col } from 'antd';
import { COLOR } from '../../constants/styles';
import './MonStat.less';
import 'antd/lib/progress/style/index.less';

const StatItem = memo(({ label, base, added = 0, newAdded = 0 }) => {
  const getStatPercent = useCallback(value => {
    return (value * 100) / 300;
  }, []);

  return (
    <div className='stat-item'>
      <p className='stat-label'>
        {label}: <span style={{ color: COLOR.GRAY }}>{base}</span>
        {added > 0 && <span style={{ color: COLOR.ORANGE }}>+{added}</span>}
        {newAdded > 0 && (
          <span style={{ color: COLOR.LIGHT_BLUE }}>+{newAdded}</span>
        )}
      </p>
      <div className='ant-progress ant-progress-line ant-progress-status-normal ant-progress-show-info ant-progress-default'>
        <div className='ant-progress-outer'>
          <div className='ant-progress-inner'>
            <div
              className='ant-progress-bg'
              style={{ width: `${getStatPercent(base)}%` }}
            />
            {added > 0 && (
              <div
                className='ant-progress-success-bg added'
                style={{
                  width: `${getStatPercent(added)}%`,
                  left: `${getStatPercent(base)}%`
                }}
              />
            )}
            {newAdded > 0 && (
              <div
                className='ant-progress-success-bg new-added'
                style={{
                  width: `${getStatPercent(newAdded)}%`,
                  left: `${getStatPercent(base) + getStatPercent(added)}%`
                }}
              />
            )}
          </div>
        </div>
        <span className='ant-progress-text'>{base + added + newAdded}</span>
      </div>
    </div>
  );
});

const MonStat = ({ mon, nextMon }) => {
  const thisMon = useMemo(() => mon.mon || mon, [mon]);
  const col = useMemo(() => (mon.mon ? mon : null));

  return (
    <Row>
      <Col span={24}>
        <StatItem
          label='체력'
          base={col ? col.baseHp : thisMon.hp}
          added={col ? col.addedHp : 0}
          newAdded={nextMon ? nextMon.addedHp - col.addedHp : 0}
        />
        <StatItem
          label='공격'
          base={col ? col.basePower : thisMon.power}
          added={col ? col.addedPower : 0}
          newAdded={nextMon ? nextMon.addedPower - col.addedPower : 0}
        />
        <StatItem
          label='방어'
          base={col ? col.baseArmor : thisMon.armor}
          added={col ? col.addedArmor : 0}
          newAdded={nextMon ? nextMon.addedArmor - col.addedArmor : 0}
        />
        <StatItem
          label='특수공격'
          base={col ? col.baseSPower : thisMon.sPower}
          added={col ? col.addedSPower : 0}
          newAdded={nextMon ? nextMon.addedSPower - col.addedSPower : 0}
        />
        <StatItem
          label='특수방어'
          base={col ? col.baseSArmor : thisMon.sArmor}
          added={col ? col.addedSArmor : 0}
          newAdded={nextMon ? nextMon.addedSArmor - col.addedSArmor : 0}
        />
        <StatItem
          label='민첩'
          base={col ? col.baseDex : thisMon.dex}
          added={col ? col.addedDex : 0}
          newAdded={nextMon ? nextMon.addedDex - col.addedDex : 0}
        />
      </Col>
    </Row>
  );
};

export default memo(MonStat);
