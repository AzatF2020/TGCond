import 'parsleyjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import IMask from "imask";

dayjs.extend(customParseFormat);

window.Parsley.addValidator('requiredIfChecked', {
  requirementType: 'string',
  validateString: function (value, requirement) {
    const checkbox = document.querySelector(requirement);

    if (!checkbox) {
      return false;
    }

    if (checkbox.checked && !value.trim()) {
      return false;
    }

    return true;
  },
  messages: {
    en: 'Required field',
    ru: 'Обязательное поле',
  },
  priority: 33,
});

window.Parsley.addValidator('phone', {
  requirementType: 'string',
  validateString: function (value) {
    if (value.trim() === '') return true;
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
  },
  messages: {
    en: 'This value should be a mobile number',
    ru: 'Введите правильный номер мобильного телефона',
  },
});

Parsley.addMessages('ru', {
  defaultMessage: 'Некорректное значение',
  type: {
    email: 'В данном поле может быть только E-mail',
    url: 'Адрес сайта введен неверно',
    number: 'Введите число',
    integer: 'Введите целое число',
    digits: 'Введите только цифры',
    alphanum: 'Введите буквенно-цифровое значение',
  },
  notblank: 'Это поле должно быть заполнено',
  required: 'Обязательное поле',
  pattern: 'Это значение некорректно',
  min: 'Это значение должно быть не менее чем %s',
  max: 'Это значение должно быть не более чем %s',
  range: 'Это значение должно быть от %s до %s',
  minlength: 'Это значение должно содержать не менее %s символов',
  maxlength: 'Это значение должно содержать не более %s символов',
  length: 'Это значение должно содержать от %s до %s символов',
  mincheck: 'Выберите не менее %s значений',
  maxcheck: 'Выберите не более %s значений',
  check: 'Выберите от %s до %s значений',
  equalto: 'Это значение должно совпадать',
});

const phoneMasks = document.querySelectorAll(".js-phone-input")

phoneMasks?.forEach((input) => {
  const maskedPhone = IMask(input, { mask: '+{7} (000) 000-00-00', lazy: true, })

  input.addEventListener('focus', () => {
    maskedPhone.updateOptions({ lazy: false });
  }, true);
  
  input.addEventListener('blur', () => {
    maskedPhone.updateOptions({ lazy: true });
  }, true);
})

const localeLang = document.getElementsByTagName('html')[0].getAttribute('lang').toLowerCase() || 'ru'
  Parsley.setLocale(localeLang);

  const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));

  formsToValidate.forEach((form) => {
    $(form).parsley({
      focus: 'none',
      errorClass: 'error',
      successClass: 'success',
      classHandler: (field) => {
        return field.$element.closest('.js-validation-wrapper');
      }
    })
  });
