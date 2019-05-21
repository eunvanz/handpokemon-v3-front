import React, { memo, useMemo, useCallback } from 'react';
import { Row, Col } from 'antd';
import { COLOR } from '../../constants/styles';

const StatItem = memo(({ label, base, added }) => {
  const getStatPercent = useCallback(value => {
    return (value * 100) / 300;
  }, []);

  return (
    <div className='stat-item'>
      <p>
        {label}: <span style={{ color: COLOR.LIGHT_GRAY }}>{base}</span>
        {added && <span style={{ color: COLOR.AMBER }}>+{added}</span>}
      </p>
      <div className='ant-progress ant-progress-line ant-progress-status-normal ant-progress-show-info ant-progress-default'>
        <div className='ant-progress-outer'>
          <div className='ant-progress-inner'>
            <div
              className='ant-progress-bg'
              style={{ width: `${getStatPercent(base)}%` }}
            />
            {added && (
              <div
                className='ant-progress-success-bg added'
                style={{
                  width: `${getStatPercent(added)}%`,
                  left: `${getStatPercent(base)}%`
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const MonStat = ({ mon }) => {
  const thisMon = useMemo(() => mon.mon || mon, [mon]);
  const col = useMemo(() => (mon.mon ? mon : null));

  return (
    <Row>
      <Col span={24}>
        <StatItem
          label='체력'
          base={col ? col.baseHp : thisMon.hp}
          added={col ? col.addedHp : null}
        />
        <StatItem
          label='공격'
          base={col ? col.basPower : thisMon.power}
          added={col ? col.addedPower : null}
        />
        <StatItem
          label='방어'
          base={col ? col.baseArmor : thisMon.armor}
          added={col ? col.addedArmor : null}
        />
        <StatItem
          label='특수공격'
          base={col ? col.baseSPower : thisMon.sPower}
          added={col ? col.addedSPower : null}
        />
        <StatItem
          label='특수방어'
          base={col ? col.baseSArmor : thisMon.sArmor}
          added={col ? col.addedSArmor : null}
        />
        <StatItem
          label='민첩'
          base={col ? col.baseDex : thisMon.dex}
          added={col ? col.addedDex : null}
        />
      </Col>
    </Row>
  );
};

export default memo(MonStat);
