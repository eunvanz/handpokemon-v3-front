import React, { memo, useCallback } from 'react';
import ContentContainer from '../../components/ContentContainer/index';
import { Card, Progress, Tag, Row, Col, Button, Alert } from 'antd';
import orderBy from 'lodash/orderBy';
import TitleTag from '../../components/TitleTag';
import { ACHIEVEMENT_TYPE, MASTER_CD } from '../../constants/codes';
import { getMasterCdGroup } from '../../libs/codeUtils';
import { ATTR_COLOR } from '../../constants/styles';
import { getBurfFromUserAchievements } from '../../libs/hpUtils';

const AchievementView = ({ achievements, user, codes, onClickActivate }) => {
  const countUserCollectionByAttrCd = useCallback(
    attrCd => {
      return user.collections.filter(
        col => col.mainAttrCd === attrCd || col.subAttrCd === attrCd
      ).length;
    },
    [user]
  );

  const getInfos = useCallback(
    (typeCd, attrCd) => {
      const result = {
        lastTitle: null,
        nextStepCondition: null,
        max: null,
        percent: null
      };
      let filtered = achievements.filter(
        item => item.achievementTypeCd === typeCd
      );
      if (typeCd === ACHIEVEMENT_TYPE.COL) {
        let lastTitle = null;
        let nextStepCondition = null;
        let max = 0;
        let burf = null;
        filtered.forEach(item => {
          if (item.conditionValue > max) max = item.conditionValue;
          if (item.conditionValue <= user.colPoint) {
            lastTitle = item.name;
            burf = item.burf.split(',');
          } else if (!nextStepCondition)
            nextStepCondition = item.conditionValue;
        });
        result.lastTitle = lastTitle;
        result.max = max;
        result.percent = (user.colPoint * 100) / max;
        result.nextStepCondition = nextStepCondition;
        result.burf = burf;
      } else if (typeCd === ACHIEVEMENT_TYPE.ATTR) {
        filtered = filtered.filter(item => item.attrCd === attrCd);
        let lastTitle = null;
        let nextStepCondition = null;
        let max = 0;
        let burf = null;
        filtered.forEach(item => {
          if (item.conditionValue > max) max = item.conditionValue;
          if (item.conditionValue <= countUserCollectionByAttrCd(attrCd)) {
            lastTitle = item.name;
            burf = item.burf.split(',');
          } else if (!nextStepCondition)
            nextStepCondition = item.conditionValue;
        });
        result.lastTitle = lastTitle;
        result.max = max;
        result.percent = (countUserCollectionByAttrCd(attrCd) * 100) / max;
        result.nextStepCondition = nextStepCondition;
        result.burf = burf;
      }
      return result;
    },
    [achievements, user, countUserCollectionByAttrCd]
  );

  const isActivated = useCallback(
    (typeCd, attrCd) => {
      const { achievements } = user;
      const activatedAchievements = achievements.filter(item => item.activated);
      return (
        activatedAchievements.filter(
          item =>
            item.achievement.achievementTypeCd === typeCd &&
            (attrCd ? item.achievement.attrCd === attrCd : true)
        ).length > 0
      );
    },
    [user]
  );

  const renderTitleTag = useCallback(
    (typeCd, attrCd) => {
      const title = getInfos(typeCd, attrCd).lastTitle;
      if (title) {
        return (
          <>
            <TitleTag
              title={title}
              attrCd={attrCd}
              burf={getInfos(typeCd, attrCd).burf}
            />
            {isActivated(typeCd, attrCd) && (
              <span className='c-primary' style={{ marginLeft: 12 }}>
                활성화됨
              </span>
            )}
            {!isActivated(typeCd, attrCd) && (
              <Button
                style={{ marginLeft: 12 }}
                size='small'
                onClick={() => onClickActivate(attrCd)}
              >
                활성화하기
              </Button>
            )}
          </>
        );
      } else {
        return <div>획득한 칭호가 없습니다.</div>;
      }
    },
    [getInfos, isActivated, onClickActivate]
  );

  const countCollection = useCallback(
    attrCd => {
      return user.collections.filter(
        item => item.mainAttrCd === attrCd || item.subAttrCd === attrCd
      ).length;
    },
    [user]
  );

  const getBurf = useCallback(() => {
    return getBurfFromUserAchievements(user.achievements);
  }, [user]);

  const getBurfLabel = useCallback(idx => {
    if (idx === 0) return '체력';
    else if (idx === 1) return '공격';
    else if (idx === 2) return '방어';
    else if (idx === 3) return '특수공격';
    else if (idx === 4) return '특수방어';
    else if (idx === 5) return '민첩';
  }, []);

  return (
    <ContentContainer>
      <Row>
        <Col span={24}>
          <Card style={{ marginBottom: 12 }}>
            <h3>
              <span style={{ marginRight: 6 }}>현재 버프</span>
              {orderBy(
                user.achievements,
                item => item.achievement.achievementTypeCd,
                ['asc']
              )
                .filter(item => item.activated)
                .map(item => (
                  <TitleTag
                    title={item.achievement.name}
                    attrCd={item.achievement.attrCd}
                    burf={item.achievement.burf.split(',')}
                    style={{ margin: 3 }}
                  />
                ))}
            </h3>
            <Row gutter={24} style={{ marginBottom: 12 }}>
              {getBurf().map((value, idx) => (
                <Col span={12} md={8} lg={4} key={idx}>
                  <p style={{ marginBottom: 0 }}>
                    {getBurfLabel(idx)}
                    <span
                      className='c-primary fw-700'
                      style={{ marginLeft: 6 }}
                    >
                      {value === 0 ? 0 : `+${value}`}
                    </span>
                  </p>
                  <Progress percent={value} status='normal' showInfo={false} />
                </Col>
              ))}
            </Row>
            <Alert message='업적을 달성하고 칭호를 활성화해보세요. 각 칭호마다 고유의 버프가 적용됩니다!' />
          </Card>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col sm={12} lg={6}>
          <Card
            title={
              <div>
                콜렉션 점수
                <Tag className='credit-tag' style={{ marginLeft: 12 }}>
                  {Number(user.colPoint).toLocaleString()} /{' '}
                  {Number(getInfos(ACHIEVEMENT_TYPE.COL).max).toLocaleString()}
                </Tag>
              </div>
            }
            style={{ marginBottom: 12 }}
          >
            <div style={{ marginBottom: 12, minHeight: 30 }}>
              {renderTitleTag(ACHIEVEMENT_TYPE.COL)}
            </div>
            <Progress
              percent={getInfos(ACHIEVEMENT_TYPE.COL).percent}
              format={percent => `${Math.round(percent)}%`}
            />
            <div style={{ marginTop: 12 }}>
              다음단계:{' '}
              <span className='c-primary fw-700'>
                {Number(
                  getInfos(ACHIEVEMENT_TYPE.COL).nextStepCondition
                ).toLocaleString()}
              </span>
              점 달성
            </div>
          </Card>
        </Col>
        {getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => {
          return (
            <Col sm={12} lg={6}>
              <Card
                className='dark-header-card'
                title={
                  <div>
                    {`${item.detailCdNm} 속성`}
                    <Tag className='credit-tag' style={{ marginLeft: 12 }}>
                      {countCollection(item.detailCd)} /{' '}
                      {Number(
                        getInfos(ACHIEVEMENT_TYPE.ATTR, item.detailCd).max
                      ).toLocaleString()}
                    </Tag>
                  </div>
                }
                style={{ marginBottom: 12 }}
                headStyle={{ backgroundColor: ATTR_COLOR[item.detailCd] }}
              >
                <div style={{ marginBottom: 12, minHeight: 30 }}>
                  {renderTitleTag(ACHIEVEMENT_TYPE.ATTR, item.detailCd)}
                </div>
                <Progress
                  percent={
                    getInfos(ACHIEVEMENT_TYPE.ATTR, item.detailCd).percent
                  }
                  format={percent => `${Math.round(percent)}%`}
                />
                <div style={{ marginTop: 12 }}>
                  다음단계:{' '}
                  <span className='c-primary fw-700'>
                    {Number(
                      getInfos(ACHIEVEMENT_TYPE.ATTR, item.detailCd)
                        .nextStepCondition
                    ).toLocaleString()}
                  </span>
                  개 보유
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </ContentContainer>
  );
};

export default memo(AchievementView);
