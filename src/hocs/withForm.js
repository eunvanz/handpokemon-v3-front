import { Form } from 'antd/lib/index';

export default ComposedComponent => {
  return Form.create()(ComposedComponent);
};
