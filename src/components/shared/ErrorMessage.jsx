import {message} from 'antd';

//Component displaying error message
export default function ErrorMessage(text) {
  message.error(text);
}