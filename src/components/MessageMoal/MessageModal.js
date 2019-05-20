import { Modal } from 'antd';

export default ({ type, title, content, onOk, ...props }) => {
  return Modal[type]({
    title: type === 'error' && !title ? '피카피카!' : title,
    content: type === 'error' ? content.message || content : content,
    okText: '확인',
    onOk,
    ...props
  });
};
