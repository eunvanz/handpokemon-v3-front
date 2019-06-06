import React, { PureComponent } from 'react';
import { compose } from 'redux';

import BookView from './BookView';
import withView from '../../hocs/withView';
import { postBook, deleteBook } from '../../api/requestBook';
import withUser from '../../hocs/withUser';
import withFilter from '../../hocs/withFilter';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';
import SpinContainer from '../../components/SpinContainer';
import ConfirmModal from '../../components/ConfirmModal';
import {
  getUnlockedBooksWithToken,
  postUnlockedBook
} from '../../api/requestUnlockedBook';
import MessageModal from '../../components/MessageMoal/index';

class BookContainer extends PureComponent {
  state = {
    loading: false,
    partialLoading: false
  };

  componentDidMount() {
    const { returnOptions, viewActions } = this.props;
    if (returnOptions)
      setTimeout(() => window.scrollTo(0, returnOptions.scrollY), 0);
    this._postBook().then(() => {
      viewActions.clearView('returnOptions');
    });
  }

  _postBook = () => {
    const {
      colToPostBook,
      bookToDelete,
      user,
      returnOptions,
      userActions,
      viewActions
    } = this.props;
    if (colToPostBook) {
      this.setState({ partialLoading: true });
      const deleteRequest = bookToDelete
        ? () => deleteBook(bookToDelete.id)
        : () => Promise.resolve();
      return deleteRequest()
        .then(() => {
          viewActions.clearView('bookToDelete');
          return postBook({
            userId: user.id,
            colId: colToPostBook.id,
            attrCd: returnOptions.attrCd,
            seq: returnOptions.seq
          });
        })
        .then(() => {
          return userActions.fetchUserBooksWithToken();
        })
        .then(() => {
          this.setState({ partialLoading: false });
          return Promise.resolve();
        });
    } else {
      return userActions.fetchUserBooksWithToken().then(() => {
        return Promise.resolve();
      });
    }
  };

  _handleOnClickCommon = (attrCd, seq) => {
    const {
      filterActions,
      viewActions,
      codes,
      resetFilter,
      history
    } = this.props;
    filterActions.updateFilter('disabled', ['mainAttrCd', 'subAttrCd', 'has']);
    filterActions.updateFilter('mainAttrCd', [attrCd]);
    filterActions.updateFilter('subAttrCd', [attrCd]);
    viewActions.receiveView('returnOptions', {
      scrollY: window.scrollY,
      attrCd,
      seq
    });
    viewActions.receiveView('defaultSelectOptions', {
      message: (
        <div>
          <span className='c-primary'>
            {getDetailCdNmByDetailCd(attrCd, codes)}
          </span>{' '}
          속성 도감에 등록할 포켓몬을 선택해주세요.
        </div>
      ),
      onSelect: targetCol => {
        viewActions.receiveView('colToPostBook', targetCol);
        resetFilter();
        history.push('/book');
      },
      onCancel: () => {
        resetFilter();
        history.push('/book');
      }
    });
  };

  _handleOnClickAddMon = (attrCd, seq) => {
    const { history } = this.props;
    this._handleOnClickCommon(attrCd, seq);
    history.push('/collection/user?mode=book');
  };

  _handleOnClickChangeMon = (attrCd, book) => {
    const { history, viewActions } = this.props;
    this._handleOnClickCommon(attrCd, book.seq);
    viewActions.receiveView('bookToDelete', book);
    history.push('/collection/user?mode=book');
  };

  _handleOnClickUnlockBook = (attrCd, seq) => {
    const { viewActions, userActions } = this.props;
    ConfirmModal({
      title: '도감 해제',
      content: '정말 도감을 해제하시겠습니까?',
      onOk: () => {
        this.setState({ partialLoading: true });
        postUnlockedBook({
          attrCd,
          seq
        })
          .then(() => {
            return getUnlockedBooksWithToken();
          })
          .then(res => {
            viewActions.receiveView('unlockedBooks', res.data);
            userActions.signInUserWithToken();
            MessageModal({
              type: 'success',
              title: '도감 해제',
              content: '도감이 해제되었습니다.'
            });
            this.setState({ partialLoading: false });
          });
      }
    });
  };

  render() {
    if (this.state.loading) return <SpinContainer />;
    return (
      <div>
        {this.state.partialLoading && <SpinContainer />}
        <BookView
          {...this.props}
          onClickAddMon={this._handleOnClickAddMon}
          onClickChangeMon={this._handleOnClickChangeMon}
          onClickUnlockBook={this._handleOnClickUnlockBook}
        />
      </div>
    );
  }
}

const wrappedBookView = compose(
  withUser({ required: true }),
  withView([
    {
      key: 'colToPostBook'
    },
    {
      key: 'bookToDelete',
      persistent: true
    },
    {
      key: 'returnOptions',
      persistent: true
    },
    {
      key: 'unlockedBooks',
      persistent: true,
      request: getUnlockedBooksWithToken,
      required: true
    }
  ]),
  withFilter()
)(BookContainer);

export default wrappedBookView;
