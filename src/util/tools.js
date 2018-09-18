import { message } from 'antd';

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

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

export const formatJSONDate = (jsonDate) => {
  return new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
    .replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
};

export const getType = (param) => {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
};

export const capitalized = str => str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
