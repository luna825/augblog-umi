import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Icon } from 'antd';
import styles from './RichText.less';

const FormItem = Form.Item;

class Editor extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toRAW(), // or values.content.toHTML()
        };
        // eslint-disable-next-line no-console
        console.log(submitData);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

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

    const renderTitle = () => (
      <FormItem>
        {getFieldDecorator('title', {
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
        })(
          <div className={styles.editorTitle}>
            <input placeholder="无标题" />
          </div>
        )}
      </FormItem>
    );

    return (
      <div className={styles.main}>
        <Form>
          <FormItem>
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              initialValue: BraftEditor.createEditorState(null),
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
                componentBelowControlBar={renderTitle()}
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
