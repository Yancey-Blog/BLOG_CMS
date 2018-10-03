import { message } from 'antd';
import { uploadApi } from '../http/index';

export const beforeUpload = (file) => {
  const isImageFormat = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isImageFormat) {
    message.error('You can only upload JPG or PNG image!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isImageFormat && isLt2M;
};

export const musicBeforeUpload = (file) => {
  const isMusicFormat = file.type === 'audio/mpeg' || file.type === 'audio/x-m4a';
  if (!isMusicFormat) {
    message.error('You can only upload MP3 or M4A music!');
  }
  const isLt15M = file.size / 1024 / 1024 < 15;
  if (!isLt15M) {
    message.error('Music File must smaller than 15MB!');
  }
  return isMusicFormat && isLt15M;
};

export const formatJSONDate = jsonDate => new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
  .replace(/T/g, ' ')
  .replace(/\.[\d]{3}Z/, '');

export const getType = param => Object.prototype.toString.call(param)
  .slice(8, -1)
  .toLowerCase();

export const capitalized = str => str.toLowerCase()
  .replace(/( |^)[a-z]/g, L => L.toUpperCase());


export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const formatTimestampDate = (date) => {
  const timestampDate = new Date(date);
  const Y = `${timestampDate.getFullYear()}-`;
  const M = `${timestampDate.getMonth() + 1 < 10 ? `0${timestampDate.getMonth() + 1}` : timestampDate.getMonth() + 1}-`;
  const D = `${timestampDate.getDate() < 10 ? `0${timestampDate.getDate()}` : timestampDate.getDate()} `;
  const h = `${timestampDate.getHours() < 10 ? `0${timestampDate.getHours()}` : timestampDate.getHours()}:`;
  const m = `${timestampDate.getMinutes() < 10 ? `0${timestampDate.getMinutes()}` : timestampDate.getMinutes()}:`;
  const s = (timestampDate.getSeconds() < 10 ? `0${timestampDate.getSeconds()}` : timestampDate.getSeconds());
  return Y + M + D + h + m + s;
};

export function checkWebp() {
  return (document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0);
}

export const webp = '?x-oss-process=image/format,webp';

export const upload = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    action: uploadApi,
  };
};
