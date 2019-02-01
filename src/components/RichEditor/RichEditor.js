import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import HeaderId from 'braft-extensions/dist/header-id';
import { Form, Icon, message } from 'antd';
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

class Editor extends React.Component {

  static defaultProps = {
    article: {},
    onSubmit: () => {}
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((error, values) => {
      if (error) {
        message.error(`博客内容或标题不能为空!`);
        return;
      }
      const submitData = {
        title: values.title,
        body: values.content.toRAW(), // or values.content.toHTML()
        bodyHtml: values.content.toHTML(),
      };
      onSubmit(submitData)
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
    const { form, article } = this.props;
    const { getFieldDecorator } = form;

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
        <Form>
          <FormItem>
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              initialValue: BraftEditor.createEditorState(article.bodyHtml),
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
                componentBelowControlBar={this.renderTitle(getFieldDecorator, article.title)}
                extendControls={extendControls}
              />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Editor);
