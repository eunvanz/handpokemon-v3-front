import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Card, Progress, Col } from 'antd';
import orderBy from 'lodash/orderBy';
import ContentContainer from '../../components/ContentContainer/index';
import {
  getDetailCdsInMasterCdGroup,
  getDetailCdNmByDetailCd,
  getMasterCdGroup
} from '../../libs/codeUtils';
import { MASTER_CD } from '../../constants/codes';
import { GRADE_STYLE } from '../../constants/styles';
import ConfirmModal from '../../components/ConfirmModal/index';
import SpinContainer from '../../components/SpinContainer';
import CollectionList from '../../components/CollectionList';
import FloatingFilterDrawer from '../../components/FloatingFilterDrawer';
import MessageModal from '../../components/MessageMoal/index';

const CollectionView = ({
  collections,
  codes,
  mons,
  user,
  onMix,
  isMyCollection,
  mode,
  colToMix,
  onEvolute,
  filter,
  filterActions,
  defaultSelectOptions,
  monCardProps,
  history
}) => {
  const [list, setList] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [selectable, setSelectable] = useState(
    mode === 'mix' || mode === 'book' || mode === 'defense'
  );
  const [selectedMons, setSelectedMons] = useState([]);
  const [selectOptions, setSelectOptions] = useState(
    // { message, onSelect, onCancel }
    ['book', 'defense'].includes(mode) ? defaultSelectOptions : null
  );
  const [proceeding, setProceeding] = useState(false);

  const getInitialList = useCallback(() => {
    const list = mons.map(item => {
      const collection = collections.filter(col => col.monId === item.id)[0];
      if (collection) {
        return collection;
      } else {
        return item;
      }
    });
    if (selectedMons.length > 0) {
      // selectedMons에 존재하는 콜렉션을 앞쪽에 정렬
      return orderBy(list, item =>
        selectedMons.filter(selectedMon => selectedMon.id !== item.id)
      );
    } else {
      return list;
    }
  }, [collections, mons, selectedMons]);

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
          const proceed = () => {
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
          };
          const colBook = user.books.filter(
            item => item.colId === targetCol.id
          )[0];
          if (colBook) {
            if (targetCol.level === 1) {
              MessageModal({
                type: 'error',
                title: '교배 불가',
                content:
                  '도감에 등록되어있는 포켓몬입니다. 도감에서 제외하거나 다음 레벨에서 교배해주세요!'
              });
            } else {
              ConfirmModal({
                title: '도감에 등록된 포켓몬',
                content:
                  '도감에 등록되어있는 포켓몬입니다. 교배하게 되면 도감보너스가 하락합니다. 그래도 교배하시겠습니까?',
                onOk: () => {
                  proceed();
                }
              });
            }
          } else {
            proceed();
          }
        },
        onCancel: () => {
          setInitialList(getInitialList());
          setSelectable(false);
        }
      });
      setSelectable(true);
      setInitialList(collections.filter(item => item.id !== col.id));
    },
    [collections, getInitialList, onMix, user.books]
  );

  useEffect(() => {
    // 모드별 initialList 세팅
    if (mode === 'mix') {
      setInitialList(collections);
      handleOnClickMix(
        user.collections.filter(item => item.monId === colToMix.monId)[0]
      );
    } else if (mode === 'book') {
      setInitialList(
        collections.filter(
          item => user.books.map(book => book.colId).indexOf(item.id) < 0
        )
      );
    } else {
      const initialList = getInitialList();
      setInitialList(initialList);
      setList(initialList);
    }
  }, [mode, collections, user, colToMix, getInitialList, handleOnClickMix]);

  const getFilteredList = useCallback(
    sourceList => {
      const filteredList = sourceList.filter(item => {
        const isCol = !!item.mon;
        const thisMon = item.mon || item;
        const isMatchHasCondition = () => {
          if (filter.has.indexOf('Y') > -1 && isCol) return true;
          if (filter.has.indexOf('N') > -1 && !isCol) return true;
          return false;
        };
        const isMatchEvolutableCondition = () => {
          const nextMon = item.nextMons ? item.nextMons[0] : null;
          if (
            filter.evolutable.indexOf('Y') > -1 &&
            nextMon &&
            item.level >= nextMon.requiredLv
          ) {
            return true;
          }

          if (
            filter.evolutable.indexOf('N') > -1 &&
            ((nextMon && item.level < nextMon.requiredLv) || !nextMon)
          ) {
            return true;
          }
          return false;
        };
        const isMatchDefenseCondition = () => {
          if (filter.defense.indexOf('Y') > -1 && item.defense === 1) {
            return true;
          }

          if (filter.defense.indexOf('N') > -1 && item.defense === 0) {
            return true;
          }
          return false;
        };
        const isMatchingSubAttrCd = () => {
          if (filter.subAttrCd.indexOf('') > -1 && !item.subAttrCd) return true;
          return filter.subAttrCd.indexOf(item.subAttrCd) > -1;
        };
        const isMatchingRankCd = () => {
          if (filter.rankCd.indexOf('') > -1 && !item.rankCd) return true;
          return filter.rankCd.indexOf(item.rankCd) > -1;
        };
        return (
          filter.gradeCd.indexOf(thisMon.gradeCd) > -1 &&
          (filter.mainAttrCd.indexOf(item.mainAttrCd) > -1 ||
            isMatchingSubAttrCd()) &&
          filter.cost.indexOf(thisMon.cost) > -1 &&
          filter.generation.indexOf(thisMon.generation) > -1 &&
          isMatchingRankCd() &&
          isMatchHasCondition() &&
          isMatchEvolutableCondition() &&
          isMatchDefenseCondition()
        );
      });
      return filteredList;
    },
    [filter]
  );

  useEffect(() => {
    const filteredList = getFilteredList(initialList);
    setList(filteredList);
  }, [filter, initialList, getFilteredList]);

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

  const onChangeFilter = useCallback(
    (type, checkedList) => {
      filterActions.updateFilter(type, checkedList);
    },
    [filterActions]
  );

  const filterOptionLists = useMemo(() => {
    return {
      has: [{ label: '보유', value: 'Y' }, { label: '미보유', value: 'N' }],
      gradeCd: getMasterCdGroup(MASTER_CD.MON_GRADE, codes).map(item => ({
        label: item.detailCdNm,
        value: item.detailCd
      })),
      mainAttrCd: getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => ({
        label: item.detailCdNm,
        value: item.detailCd
      })),
      subAttrCd: [{ label: '없음', value: '' }].concat(
        getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => ({
          label: item.detailCdNm,
          value: item.detailCd
        }))
      ),
      cost: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(item => ({
        label: item,
        value: Number(item)
      })),
      rankCd: [{ label: '없음', value: '' }].concat(
        getMasterCdGroup(MASTER_CD.MON_RANK, codes).map(item => ({
          label: item.detailCdNm,
          value: item.detailCd
        }))
      ),
      generation: ['1', '2', '3', '4', '5', '6', '7', '8'].map(item => ({
        label: item,
        value: Number(item)
      })),
      evolutable: [
        { label: '가능', value: 'Y' },
        { label: '불가능', value: 'N' }
      ],
      defense: [
        { label: '배치됨', value: 'Y' },
        { label: '배치안됨', value: 'N' }
      ]
    };
  }, [codes]);

  const getFilterActiveInfo = useMemo(() => {
    const filterKeys = Object.keys(filter);
    const activeKeys = [];
    let active = false;
    filterKeys.forEach(key => {
      if (
        filterOptionLists[key] &&
        filter[key].length !== filterOptionLists[key].length
      ) {
        activeKeys.push(key);
        active = true;
      }
    });
    if (activeKeys.length === 0) {
      activeKeys.push('has');
      activeKeys.push('gradeCd');
    }
    return {
      activeKeys,
      active
    };
  }, [filter, filterOptionLists]);

  return (
    <ContentContainer>
      {(proceeding || !list) && <SpinContainer />}
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
                  key={gradeCd}
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
      {list && (selectable ? selectOptions : true) && (
        <CollectionList
          selectable={selectable}
          selectOptions={selectOptions}
          list={list}
          codes={codes}
          onClickMix={handleOnClickMix}
          mixable={isMyCollection && mode !== 'defense'}
          evolutable={isMyCollection && mode !== 'defense'}
          onClickEvolute={onEvolute}
          user={user}
          monCardProps={monCardProps}
          selectedMons={selectedMons}
        />
      )}
      <FloatingFilterDrawer
        defaultActiveKey={getFilterActiveInfo.activeKeys}
        onChange={onChangeFilter}
        filter={filter}
        optionLists={filterOptionLists}
        filterActive={getFilterActiveInfo.active}
      />
    </ContentContainer>
  );
};

export default memo(CollectionView);
