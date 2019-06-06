import React, { memo, useCallback } from 'react';
import { Card, Row, Col, Alert, Button, Tag, Icon } from 'antd';
import { getMasterCdGroup } from '../../libs/codeUtils';
import { MASTER_CD } from '../../constants/codes';
import MonCard from '../../components/MonCard';
import ContentContainer from '../../components/ContentContainer';
import { ATTR_COLOR } from '../../constants/styles';
import { BOOK_RULE } from '../../constants/rules';
import { getBonusPctByAttrCdFromBook } from '../../libs/hpUtils';
import BottomTotal from '../../components/BottomTotal';
import AttrTag from '../../components/AttrTag';
import SweetScroll from 'sweet-scroll';

const scroller = new SweetScroll({
  offset: -100
});

const BookView = ({
  codes,
  onClickAddMon,
  user,
  onClickChangeMon,
  onClickUnlockBook,
  unlockedBooks
}) => {
  const { books } = user;
  const renderBookCards = useCallback(
    attrCd => {
      const attrBooks = books.filter(book => book.attrCd === attrCd);
      const result = [];
      for (let i = 0; i < 6; i++) {
        const seqAttrBook = attrBooks.filter(book => book.seq === i)[0];
        if (seqAttrBook) {
          result.push(
            <Col
              xs={8}
              sm={6}
              xl={4}
              key={seqAttrBook.id}
              style={{ marginBottom: 12 }}
            >
              <MonCard
                mon={seqAttrBook.col}
                codes={codes}
                user={user}
                bottomComponent={
                  <BottomTotal col={seqAttrBook.col} user={user} />
                }
              />
              <div
                className='text-center'
                style={{ marginTop: 6, marginBottom: 6 }}
              >
                <Button
                  icon='sync'
                  onClick={() => onClickChangeMon(attrCd, seqAttrBook)}
                >
                  교체
                </Button>
              </div>
            </Col>
          );
        } else {
          if (
            i > 2 &&
            !unlockedBooks.filter(
              item => item.attrCd === attrCd && item.seq === i
            )[0]
          ) {
            result.push(
              <Col xs={8} sm={6} xl={4} key={i} style={{ marginBottom: 12 }}>
                <MonCard
                  isMock
                  bottomComponent={
                    <div
                      className='text-center'
                      style={{ marginBottom: 9, marginTop: 6 }}
                    >
                      <Icon type='shopping-cart' />{' '}
                      <span className='c-primary fw-700'>
                        {Number(BOOK_RULE[i]).toLocaleString()}P
                      </span>
                    </div>
                  }
                />
                <div
                  className='text-center'
                  style={{ marginTop: 6, marginBottom: 6 }}
                >
                  <Button
                    icon='unlock'
                    onClick={() => onClickUnlockBook(attrCd, i)}
                    disabled={user.pokemoney < BOOK_RULE[i]}
                  >
                    해제
                  </Button>
                </div>
              </Col>
            );
          } else {
            result.push(
              <Col xs={8} sm={6} xl={4} key={i} style={{ marginBottom: 12 }}>
                <MonCard isMock />
                <div className='text-center' style={{ marginTop: 6 }}>
                  <Button icon='plus' onClick={() => onClickAddMon(attrCd, i)}>
                    추가
                  </Button>
                </div>
              </Col>
            );
          }
        }
      }
      return result;
    },
    [user, codes, onClickAddMon, unlockedBooks]
  );

  return (
    <ContentContainer>
      <Card>
        <Alert message='속성별로 가장 강력한 포켓몬을 도감에 등록해보세요. 해당되는 메인속성에 보너스 스탯이 적용됩니다!' />
        <Row gutter={6} style={{ marginTop: 12 }}>
          {getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => {
            return (
              <Col
                span={3}
                xs={8}
                sm={6}
                md={4}
                lg={3}
                style={{ marginTop: 6 }}
              >
                <AttrTag
                  attrCd={item.detailCd}
                  codes={codes}
                  style={{ cursor: 'pointer' }}
                  onClick={() => scroller.to(`#${item.detailCdNm}-card`)}
                />{' '}
                +{getBonusPctByAttrCdFromBook(item.detailCd, user.books)}%
              </Col>
            );
          })}
          <Col span={2} />
        </Row>
      </Card>
      {getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => {
        return (
          <Card
            id={`${item.detailCdNm}-card`}
            className='dark-header-card'
            title={
              <div>
                {`${item.detailCdNm} 속성`}
                {getBonusPctByAttrCdFromBook(item.detailCd, user.books) !==
                  0 && (
                  <Tag className='credit-tag' style={{ marginLeft: 12 }}>
                    +{getBonusPctByAttrCdFromBook(item.detailCd, user.books)}%
                  </Tag>
                )}
              </div>
            }
            style={{ marginTop: 12 }}
            bodyStyle={{ padding: 12 }}
            headStyle={{ backgroundColor: ATTR_COLOR[item.detailCd] }}
          >
            <Row gutter={6} type='flex' justify='center'>
              {renderBookCards(item.detailCd)}
            </Row>
          </Card>
        );
      })}
    </ContentContainer>
  );
};

export default memo(BookView);
