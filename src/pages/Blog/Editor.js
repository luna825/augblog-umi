import 'braft-editor/dist/index.css';
import React from 'react';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import HeaderId from 'braft-extensions/dist/header-id';
import { Form, Icon, message, Input } from 'antd';
import styles from './RichText.less';

BraftEditor.use(HeaderId());
const FormItem = Form.Item;

const controls = [
  'undo',
  'redo',
  'remove-styles',
  'separator',
  'headings',
  'font-size',
  'separator',
  'bold',
  'italic',
  'underline',
  'strike-through',
  'separator',
  'superscript',
  'subscript',
  'separator',
  'text-indent',
  'text-align',
  'separator',
  'list-ul',
  'list-ol',
  'blockquote',
  'code',
  'separator',
  'link',
  'separator',
  'hr',
  'separator',
  'separator',
];

@connect(({ blogView: { blog }, loading }) => ({
  blog,
  loading: loading.models.blogView,
}))
class Editor extends React.Component {
  componentDidMount() {
    const { location, dispatch } = this.props;
    if (location.query.post) {
      dispatch({
        type: 'blogView/queryBlog',
        payload: location.query.post,
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { form, dispatch, location } = this.props;
    form.validateFields((error, values) => {
      if (error) {
        message.error(`博客内容或标题不能为空!`);
      } else {
        const submitData = {
          title: values.title,
          body: values.content.toText(), // or values.content.toHTML()
          bodyHtml: values.content.toHTML(),
        };
        if (location.query.post) {
          dispatch({
            type: 'blogView/editBlog',
            payload: { submitData, id: location.query.post },
          });
        } else {
          dispatch({
            type: 'blogView/addBlog',
            payload: submitData,
          });
        }
      }
    });
  };

  renderTitle = (getFieldDecorator, title = '') => (
    <FormItem className={styles.editorTitle}>
      {getFieldDecorator('title', {
        validateTrigger: 'onBlur',
        initialValue: title,
        rules: [
          {
            required: true,
            validator: (_, value, callback) => {
              if (value === '') {
                callback(false);
              } else {
                callback();
              }
            },
          },
        ],
      })(<input placeholder="无标题" />)}
    </FormItem>
  );

  render() {
    const { form, location, blog, loading } = this.props;
    const { getFieldDecorator } = form;
    const content = location.query.post ? blog.body_html : null;
    const title = location.query.post ? blog.title : '';

    const extendControls = [
      'separator',
      {
        key: 'update-and-post', // 控件唯一标识，必传
        type: 'button',
        title: '更新发布', // 指定鼠标悬停提示文案
        className: 'post-button', // 指定按钮的样式名
        html: null, // 指定在按钮中渲染的html字符串
        text: (
          <span>
            <Icon type="sync" />
            {' 更新发布'}
          </span>
        ), // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
        onClick: event => this.handleSubmit(event),
      },
    ];

    return (
      <div className={styles.main}>
        {loading ? null : (
          <Form>
            <FormItem>
              {getFieldDecorator('content', {
                validateTrigger: 'onBlur',
                initialValue: BraftEditor.createEditorState(content),
                rules: [
                  {
                    required: true,
                    validator: (_, value, callback) => {
                      if (value.isEmpty()) {
                        callback(false);
                      } else {
                        callback();
                      }
                    },
                  },
                ],
              })(
                <BraftEditor
                  controlBarClassName={styles.editorControl}
                  className={styles.editor}
                  contentClassName={styles.editorContent}
                  controls={controls}
                  placeholder="请输入正文内容"
                  componentBelowControlBar={this.renderTitle(getFieldDecorator, title)}
                  extendControls={extendControls}
                />
              )}
            </FormItem>
          </Form>
        )}
      </div>
    );
  }
}

export default Form.create()(Editor);
