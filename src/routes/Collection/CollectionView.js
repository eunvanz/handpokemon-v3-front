import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Card, Progress, Col } from 'antd';
import ContentContainer from '../../components/ContentContainer/index';
import {
  getDetailCdsInMasterCdGroup,
  getDetailCdNmByDetailCd
} from '../../libs/codeUtils';
import { MASTER_CD } from '../../constants/codes';
import { GRADE_STYLE } from '../../constants/styles';
import ConfirmModal from '../../components/ConfirmModal/index';
import SpinContainer from '../../components/SpinContainer';
import CollectionList from '../../components/CollectionList';

const CollectionView = ({
  collections,
  codes,
  mons,
  user,
  onMix,
  isMyCollection,
  mode,
  colToMix,
  onEvolute
}) => {
  const [list, setList] = useState(collections);
  const [selectable, setSelectable] = useState(mode === 'mix');
  const [selectedMons, setSelectedMons] = useState([]);
  const [selectOptions, setSelectOptions] = useState({
    onComplete: () => {},
    onCancel: () => {}
  });
  const [proceeding, setProceeding] = useState(false);

  useEffect(() => {
    if (mode === 'mix') {
      handleOnClickMix(
        user.collections.filter(item => item.monId === colToMix.monId)[0]
      );
    }
  }, []);

  const monCounts = useMemo(() => {
    const result = [];
    getDetailCdsInMasterCdGroup(MASTER_CD.MON_GRADE, codes).forEach(gradeCd => {
      const item = { total: 0, cnt: 0, key: gradeCd };
      item.cnt = collections.filter(
        item => item.mon.gradeCd === gradeCd
      ).length;
      item.total = mons.filter(item => item.gradeCd === gradeCd).length;
      result.push(item);
    });
    return result;
  }, [mons, collections, codes]);

  const handleOnClickMix = useCallback(
    col => {
      setSelectOptions({
        message: (
          <div>
            <span className='c-primary fw-700'>{col.mon.name}</span>와(과)
            교배할 포켓몬을 선택해주세요.
          </div>
        ),
        onSelect: targetCol => {
          ConfirmModal({
            title: (
              <div>
                <span className='c-primary fw-700'>{col.mon.name}</span>
                와(과){' '}
                <span className='c-primary fw-700'>{targetCol.mon.name}</span>
                을(를) 교배하시겠습니까?
              </div>
            ),
            content:
              '교배하는 포켓몬의 레벨이 1 하락하고, 레벨 1의 포켓몬의 경우 영원히 사라집니다.',
            onOk: () => {
              setProceeding(true);
              onMix([col, targetCol]);
            }
          });
        },
        onCancel: () => {
          setList(collections);
          setSelectable(false);
        }
      });
      setSelectable(true);
      setList(collections.filter(item => item.id !== col.id));
    },
    [collections]
  );

  return (
    <ContentContainer>
      {proceeding && <SpinContainer />}
      {!selectable && (
        <Card style={{ marginBottom: 12 }}>
          <Row gutter={6}>
            {getDetailCdsInMasterCdGroup(MASTER_CD.MON_GRADE, codes).map(
              gradeCd => (
                <Col
                  xs={8}
                  lg={4}
                  className='text-center'
                  style={{ margin: '6px 0' }}
                >
                  <Progress
                    type='circle'
                    percent={
                      (monCounts.filter(item => item.key === gradeCd)[0].cnt *
                        100) /
                      monCounts.filter(item => item.key === gradeCd)[0].total
                    }
                    format={() =>
                      `${
                        monCounts.filter(item => item.key === gradeCd)[0].cnt
                      } / ${
                        monCounts.filter(item => item.key === gradeCd)[0].total
                      }`
                    }
                    strokeColor={GRADE_STYLE[gradeCd].backgroundColor}
                    width={80}
                    strokeWidth={4}
                  />
                  <h3 style={{ marginBottom: 0 }}>
                    {getDetailCdNmByDetailCd(gradeCd, codes)}
                  </h3>
                </Col>
              )
            )}
          </Row>
        </Card>
      )}
      <CollectionList
        selectable={selectable}
        selectOptions={selectOptions}
        list={list}
        codes={codes}
        onClickMix={handleOnClickMix}
        mixable={isMyCollection}
        evolutable={isMyCollection}
        onClickEvolute={onEvolute}
      />
    </ContentContainer>
  );
};

export default memo(CollectionView);
