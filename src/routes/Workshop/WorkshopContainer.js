import React, { PureComponent } from 'react';
import { compose } from 'redux';

import WorkshopView from './WorkshopView';
import withList from '../../hocs/withList';
import { getAllWorkshops, postWorkshop } from '../../api/requestWorkshop';
import { postLike, deleteLikeById } from '../../api/requestLike';
import withForm from '../../hocs/withForm';
import { postFile } from '../../api/requestFile';
import MessageModal from '../../components/MessageMoal';
import withUser from '../../hocs/withUser';

class WorkshopContainer extends PureComponent {
  state = {
    isSubmitting: false,
    loading: false
  };

  _handleOnClickLike = workshop => {
    const { user, history, listActions } = this.props;
    if (!user) return history.push('/sign-in');
    const userLike = workshop.likes.filter(like => like.userId === user.id)[0];
    if (!userLike) {
      const newLike = {
        userId: user.id,
        workshopId: workshop.id
      };
      return postLike(newLike).then(res => {
        const newWorkshop = Object.assign({}, workshop, {
          likes: workshop.likes.concat([res.data])
        });
        listActions.replaceItem({
          key: 'workshopList',
          conditionKey: 'id',
          value: workshop.id,
          item: newWorkshop
        });
        return Promise.resolve();
      });
    } else {
      return deleteLikeById(userLike.id).then(() => {
        const newWorkshop = Object.assign({}, workshop, {
          likes: workshop.likes.filter(item => item.id !== userLike.id)
        });
        listActions.replaceItem({
          key: 'workshopList',
          conditionKey: 'id',
          value: workshop.id,
          item: newWorkshop
        });
        return Promise.resolve();
      });
    }
  };

  _handleOnSubmitWork = () => {
    const { form, user, listActions } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isSubmitting: true });
        const imgFileObj = values.image[0].originFileObj;
        const formData = new FormData();
        formData.append('file', imgFileObj);
        postFile({ data: formData, path: 'workshop-images' })
          .then(res => {
            const { url } = res.data;
            const newWorkshop = {
              designer: values.designer,
              userId: user.id,
              monName: values.monName,
              image: url
            };
            return postWorkshop(newWorkshop);
          })
          .then(() => {
            return listActions.fetchAndAppendList({
              key: 'workshopList',
              request: () => getAllWorkshops({ curPage: 1, perPage: 24 }),
              reset: true
            });
          })
          .then(() => {
            MessageModal({
              type: 'success',
              title: '등록완료',
              content: '작품이 등록되었습니다.'
            });
            this.setState({ isSubmitting: false });
          });
      }
    });
  };

  _handleLoadNextPage = () => {
    const { listActions, workshopList } = this.props;
    this.setState({ loading: true });
    listActions.fetchAndAppendList({
      key: 'workshopList',
      request: () =>
        getAllWorkshops({
          curPage: workshopList.curPage + 1,
          perPage: workshopList.size
        }).then(() => {
          this.setState({ loading: false });
        })
    });
  };

  render() {
    return (
      <WorkshopView
        {...this.props}
        isSubmitting={this.state.isSubmitting}
        onClickLike={this._handleOnClickLike}
        loading={this.state.loading}
        loadNextPage={this._handleLoadNextPage}
        onSubmitWork={this._handleOnSubmitWork}
      />
    );
  }
}

const wrappedWorkshopView = compose(
  withList([
    {
      key: 'workshopList',
      request: () => getAllWorkshops({ curPage: 1, perPage: 24 }),
      required: true
    }
  ]),
  withForm,
  withUser({ required: false })
)(WorkshopContainer);

export default wrappedWorkshopView;
