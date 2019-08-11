import { message } from 'antd';

export default function ErrorMessage (text) {
  message.error(text);
}